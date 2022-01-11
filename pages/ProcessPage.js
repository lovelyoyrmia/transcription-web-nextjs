import { useState, useEffect } from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;

function ProcessPage() {
  const [text, setText] = useState("");

  const loadData = () => {
    setText(localStorage.getItem("data"));
    setTimeout(loadData, 1000);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (text) => {
    setText(text);
    localStorage.setItem("data", text);
  };

  return (
    <Paragraph
      strong
      className="Paragraph"
      copyable
      editable={{ onChange: handleChange }}
    >
      {text}
    </Paragraph>
  );
}

export default ProcessPage;
