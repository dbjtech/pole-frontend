import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd';
import { Map } from 'react-amap';
import TableList from './TableList';
import LineChart from './LineChart';

import config, { amap } from '../config';
import styles from './Main.css';

export default class Main extends Component {
  // static propTypes = {
  // prop: PropTypes
  // }

  render() {
    return (
      <div>
        <Row>
          <Col span={24} className={styles.card}>
            <div className={styles.amap}>
              <Map
                amapkey={amap.amapkey}
                version={amap.version}
                plugins={amap.plugins}
                center={amap.mapCenter}
              />
            </div>
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
              <LineChart />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
