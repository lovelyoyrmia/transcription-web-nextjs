import { Layout, Menu } from "antd";
import { useState } from "react";
import Transcription from "./Transcription";

export default function Home() {
  const { Header, Content, Footer } = Layout;
  const [item, setItem] = useState("");

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[item]}
          onSelect={(e) => setItem(e.key)}
        >
          <Menu.Item key="1">Transcription</Menu.Item>
          <Menu.Item key="2">More</Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 5px", marginTop: "50px" }}
      >
        <div
          className="site-layout-background"
          style={{ padding: "50px", minHeight: "90vh" }}
        >
          {item === "1" ? <Transcription /> : "Coming soon"}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Lovelyo Yeremia</Footer>
    </Layout>
  );
}
