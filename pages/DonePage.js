import { useState } from "react";
import { Button, Typography, Input, message } from "antd";
import {
  DownloadOutlined,
  FileTextOutlined,
  RetweetOutlined,
} from "@ant-design/icons";

const { Paragraph } = Typography;

function DonePage({ handleAgain }) {
  const [text, setText] = useState(localStorage.getItem("data"));
  const [output, setOutput] = useState("");

  const handleDownload = () => {
    if (output.length > 0) {
      const element = document.createElement("a");
      const file = new Blob([text], {
        type: "application/vnd.openxmlformats-officedocument.wordprocesssignml.document",
      });
      element.href = URL.createObjectURL(file);
      element.download = `${output}.word`;
      document.body.appendChild(element);
      element.click();
      setOutput("");
    } else {
      message.warning("Please type a file name");
    }
  };

  return (
    <div>
      <Paragraph
        strong
        className="Paragraph"
        copyable
        editable={{ onChange: setText }}
      >
        {text}
      </Paragraph>
      <Input
        value={output}
        onChange={(e) => setOutput(e.target.value)}
        placeholder="Add a name for your output file"
        style={{
          alignSelf: "center",
          display: "block",
          margin: " 20px auto 20px auto",
          width: "60%",
        }}
      />
      <Button
        onClick={handleDownload}
        type="primary"
        shape="round"
        className="Button"
        icon={[<DownloadOutlined />, <FileTextOutlined />]}
        style={{ background: "green", borderColor: "green" }}
      >
        Download
      </Button>
      <Button
        onClick={() => handleAgain()}
        type="primary"
        shape="round"
        className="Button"
        icon={[<RetweetOutlined />]}
      >
        Transcript again
      </Button>
    </div>
  );
}

export default DonePage;
