import { Layout } from 'antd';
import Main from '../components/Main';
import SideNav from '../components/SideNav';

import config from '../config';
import bannerImg from '../assets/国家电网.png';
// import styles from './index.css';

const { Header, Content, Footer, Sider } = Layout;

// index.js 只负责页面结构，不处理逻辑
export default function() {
  return (
    <Layout style={{ height: '100%' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <SideNav />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            fontSize: 24,
            color: 'rgb(0,111,105)',
            fontWeight: 'bolder',
          }}
        >
          <img src={bannerImg} alt="国家电网" style={{ height: 48, marginRight: 16 }} />
          {config.name}
        </Header>
        <Content style={{ margin: 24 }}>
          <Main />
        </Content>
        <Footer>{config.copyright}</Footer>
      </Layout>
    </Layout>
  );
}
