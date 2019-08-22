import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { Row, Col } from 'antd';
import { Map } from 'react-amap';
import TableList from './TableList';
import LineChart from './LineChart';

import { amap } from '../config';
import styles from './Main.css';

export default class Main extends Component {
  // static propTypes = {
  // prop: PropTypes
  // }

  render() {
    return (
      <div>
        <div className={styles.amap}>
          <Map
            amapkey={amap.amapkey}
            version={amap.version}
            plugins={amap.plugins}
            center={amap.mapCenter}
          />
        </div>
        <Row gutter={24}>
          <Col sm={24} lg={12}>
            <TableList />
          </Col>
          <Col sm={24} lg={12}>
            <LineChart />
          </Col>
        </Row>
      </div>
    );
  }
}
