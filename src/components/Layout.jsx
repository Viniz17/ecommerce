import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;

const ADLayout = ({ children }) => {
  // const menu = [{nome: 'Teste', rota: '/teste'}]

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ "min-height": "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} />
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Trabalho Final de React - Vamo com TUDO!!!
      </Footer>
    </Layout>
  );
};
export default ADLayout;
