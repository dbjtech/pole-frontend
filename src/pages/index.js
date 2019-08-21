import { Layout, Menu, Icon } from 'antd';
import Main from '../components/Main';

import config from '../config';
// import styles from './index.css';

const { Header, Content, Footer, Sider } = Layout;

export default function() {
  return (
    <Layout style={{ height: '100%' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">nav 3</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="user" />
            <span className="nav-text">nav 4</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>{config.name}</Header>
        <Content style={{ margin: 24 }}>
          <Main />
        </Content>
        <Footer>{config.copyright}</Footer>
      </Layout>
    </Layout>
  );
}
