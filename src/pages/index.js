import { Layout } from 'antd';
import Main from '../components/Main';
import SideNav from '../components/SideNav';

import config from '../config';
// import styles from './index.css';

const { Header, Content, Footer, Sider } = Layout;

export default function() {
  return (
    <Layout style={{ height: '100%' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <SideNav />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', fontSize: 20 }}>{config.name}</Header>
        <Content style={{ margin: 24 }}>
          <Main />
        </Content>
        <Footer>{config.copyright}</Footer>
      </Layout>
    </Layout>
  );
}
