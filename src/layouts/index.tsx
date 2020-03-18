import React from 'react';
import styles from './index.less';
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;
import Container from '@/components/container/index';

export default (props: any) => {
  console.log(props);
  return (
    <>
      <div id="components-layout-demo-fixed">
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            {/*<div className="logo" />*/}
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">Blog</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: "0 350px", marginTop: 64 }}>
            {/*<Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>*/}
            <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
              {props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </div>
     {/* <Container className={styles.container}>{props.children}</Container>*/}
    </>
  );
};
