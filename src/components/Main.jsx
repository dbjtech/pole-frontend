import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import TableList from './TableList';
import LineChart from './LineChart';
import LineEchart from './LineEchart';
import MapComponent from './MapComponent';

import config from '../config';
import styles from './Main.css';

// Main.jsx 和 index.js 类似，负责结构不负责逻辑
export default class Main extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={24} className={styles.card}>
            <MapComponent />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col sm={24} lg={12} className={styles.card}>
            <Card title={config.tableName}>
              <TableList />
            </Card>
          </Col>
          <Col sm={24} lg={12} className={styles.card}>
            <Card title={config.chartName}>
              {/* <LineChart /> */}
              <LineEchart />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
