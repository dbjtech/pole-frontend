import { version, Button } from 'antd';

import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.
        </li>
        <div>Current antd version: {version}</div>
        <div style={{ marginTop: '16px' }}>
          <Button type="primary">Example button</Button>
        </div>
      </ul>
    </div>
  );
}
