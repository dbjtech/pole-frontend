import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { Map, Marker } from 'react-amap';

import { amap } from '../config';
import styles from './Main.css';

export default class MapComponent extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    return (
      <div className={styles.amap}>
        <Map
          amapkey={amap.amapkey}
          version={amap.version}
          plugins={amap.plugins}
          center={amap.mapCenter}
        >
          <div className={styles.promptContainer}>
            <span className={styles.normalDevice}>正常设备数：</span>
            <br />
            <span className={styles.abnormalDevice}>异常设备数：</span>
          </div>
          <Marker position={amap.mapCenter} />
        </Map>
      </div>
    );
  }
}
