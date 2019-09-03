import React, { Component } from 'react';
import { Map, Marker } from 'react-amap';
import { connect } from 'dva';

import { amap } from '../config';
import styles from './Main.css';

class MapComponent extends Component {
  render() {
    return (
      <div className={styles.amap}>
        <Map
          amapkey={amap.amapkey}
          version={amap.version}
          plugins={amap.plugins}
          center={amap.mapCenter}
          zoom={amap.zoom}
        >
          <div className={styles.promptContainer}>
            <span className={styles.normalDevice}>正常设备数：{this.props.imeiFilter.length}</span>
            <br />
            <span className={styles.abnormalDevice}>异常设备数：0</span>
          </div>
          <Marker position={amap.mapCenter} />
        </Map>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    imeiFilter: state.global.imeiFilter,
  };
}

export default connect(mapStateToProps)(MapComponent);
