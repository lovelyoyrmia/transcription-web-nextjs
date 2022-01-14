import React, { useEffect, useState } from "react";
import DonePage from "./DonePage";
import UploadPage from "./UploadPage";
import ProcessPage from "./ProcessPage";
import {
  UploadOutlined,
  LoadingOutlined,
  SmileOutlined,
  DeliveredProcedureOutlined,
} from "@ant-design/icons";
import { Steps, message, Progress } from "antd";
import axios from "axios";

const { Step } = Steps;

export default function Transcription() {
  const [percent, setPercent] = useState(0);
  const [current, setCurrent] = useState(0);
  let infos = {};
  let durationList = [];
  let totalSize;

  const initialSteps = [
    {
      title: "Upload",
      content: <UploadPage handleUpload={(values) => upload(values)} />,
      status: "process",
      icon: <UploadOutlined />,
    },
    {
      title: "Process",
      content: <ProcessPage />,
      status: "wait",
      icon: <DeliveredProcedureOutlined />,
    },
    {
      title: "Done",
      content: <DonePage handleAgain={() => setCurrent(0)} />,
      status: "wait",
      icon: <SmileOutlined />,
    },
  ];
  const [steps, setSteps] = useState(initialSteps);

  const verify = (status, res) => {
    if (status === 200) {
      let old_text = localStorage.getItem("data");
      localStorage.setItem("data", `${old_text} ${res.text}`);
      durationList.shift();
      setPercent(((durationList.length - totalSize) / totalSize) * -100);
      durationList.length > 1
        ? process(infos, durationList[0], durationList[1])
        : setCurrent(2);
    } else {
      setCurrent(0);
      message.error("Error : Try again");
    }
  };
  const upload = (values) => {
    localStorage.setItem("data", "");
    infos = values;
    axios
      .post("http://localhost:8000/divide", { divider: infos.divider })
      .then((res) => {
        durationList = res.data;
        totalSize = durationList.length;
        setCurrent(1);
        process(values, durationList[0], durationList[1]);
      });
  };
  const process = (values, offset, duration) => {
    axios
      .post("http://localhost:8000/process", {
        offset: offset | 0,
        duration: (duration - offset) | 0,
        filename: values.file.file.name,
        language: values.language,
      })
      .then((res) => verify(res.status, res.data));
  };

  useEffect(() => {
    setPercent(0);
    if (current === 1) {
      setSteps(
        steps.map((step) => {
          if (step.title == "Upload") {
            step.status = "Finish";
          } else if (step.title == "Process") {
            step.status = "process";
            step.icon = <LoadingOutlined />;
          }
          return step;
        })
      );
    } else if (current === 2) {
      message.success("Finished");
      setSteps(
        steps.map((step) => {
          if (step.title == "Process") {
            step.status = "Finish";
            step.icon = <DeliveredProcedureOutlined />;
          } else if (step.title == "Done") {
            step.status = "Finish";
          }
          return step;
        })
      );
      axios.post("http://localhost:8000/delete");
    } else {
      setSteps([...initialSteps]);
    }
  }, [current]);

  return (
    <div>
      <Steps current={current} style={{ marginTop: "20px" }}>
        {steps.map((step) => (
          <Step
            key={step.title}
            title={step.title}
            icon={step.icon}
            status={step.status}
          />
        ))}
      </Steps>
      {current === 1 ? <Progress percent={percent | 0} /> : ""}
      <div className="steps-content">{steps[current].content}</div>
    </div>
  );
}
