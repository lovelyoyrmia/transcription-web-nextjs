import { Upload, message, Button, Form, Select, InputNumber } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Languages } from "../utils/Languages";

const { Dragger } = Upload;

function UploadPage({ handleUpload }) {
  const [form] = Form.useForm();
  const props = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: ".mp3",
    action: "http://localhost:8000/upload",
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed`);
      }
    },
    onDrop(e) {
      message.error("Dropped File", e.dataTransfer.files);
    },
  };
  const handleFinish = (values) => {
    let complete = true;
    Object.values(values).map((value) => {
      if (
        value === undefined ||
        value === null ||
        value.length === 0 ||
        value?.file?.status === "removed"
      )
        complete = false;
    });
    complete
      ? handleUpload(values)
      : message.warning("Please complete all the form");
  };

  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        onFinish={handleFinish}
        size="medium"
      >
        <Form.Item
          name="file"
          style={{
            alignItems: "center",
            display: "block",
            margin: "20px auto 20px auto",
            width: "50%",
          }}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. Strictly .mp3 files
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item name="language" label="Language">
          <Select placeholder="Select the language" style={{ width: "20vw" }}>
            {Object.entries(Languages).map(([key, value]) => (
              <Select.Option value={value}>{key}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="divider" label="Select time divider">
          <InputNumber
            placeholder="Choose a number between 5 and 60"
            min={5}
            max={60}
            style={{ width: "20vw" }}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="Button"
          style={{ width: "50%" }}
        >
          Confirm
        </Button>
      </Form>
    </div>
  );
}

export default UploadPage;
