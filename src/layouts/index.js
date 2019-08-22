import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import styles from './index.css';

function BasicLayout(props) {
  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.normal}>{props.children}</div>
    </ConfigProvider>
  );
}

export default BasicLayout;
