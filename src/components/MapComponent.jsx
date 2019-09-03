import React, { Component } from 'react';
import { Map, Marker, InfoWindow } from 'react-amap';
import { connect } from 'dva';

import styles from './Main.css';

class MapComponent extends Component {
  state = {
    infoWindowVisible: false,
    mapCenter: { longitude: 113.5418, latitude: 22.13 },
    altitude: 0,
  };

  amap = {
    // amapkey 由公司提供
    amapkey: '479c8ecf73ca9afc4d7b7d4ff4551ccb',
    // 当前最新版本为 1.4.14
    version: '1.4.14',
    // 初始中心的经纬度
    // mapCenter: { longitude: 113.5418, latitude: 22.13 },
    // 显示卫星地图
    plugins: [
      // 'Scale',
      // 'ControlBar',
      {
        name: 'MapType',
        options: {
          defaultType: 1,
        },
      },
    ],
    // 放缩范围在 3~20
    zoom: 16,
  };

  markerEvents = {
    click: e => {
      this.setState({
        infoWindowVisible: !this.state.infoWindowVisible,
        // mapCenter: { longitude: 113.541, latitude: 22.13 },
      });
    },
  };

  windowEvents = {
    open: () => {
      console.log('InfoWindow opened');
    },
    close: () => {
      console.log('InfoWindow closed');

      this.setState({
        infoWindowVisible: false,
      });
    },
  };

  render() {
    return (
      <div className={styles.amap}>
        <Map
          amapkey={this.amap.amapkey}
          version={this.amap.version}
          plugins={this.amap.plugins}
          center={this.state.mapCenter}
          zoom={this.amap.zoom}
        >
          <div className={styles.promptContainer}>
            <span className={styles.normalDevice}>正常设备数：{this.props.imeiFilter.length}</span>
            <br />
            <span className={styles.abnormalDevice}>异常设备数：0</span>
          </div>
          <Marker position={this.state.mapCenter} events={this.markerEvents} />
          <InfoWindow
            position={this.state.mapCenter}
            size={{ width: 200, height: 150 }}
            visible={this.state.infoWindowVisible}
            events={this.windowEvents}
          >
            <h3>{this.props.pole.name}</h3>
            <p>经度：{this.state.mapCenter.longitude}</p>
            <p>纬度：{this.state.mapCenter.latitude}</p>
            <p>海拔：{this.state.altitude}</p>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pole: state.global.pole,
    imeiFilter: state.global.imeiFilter,
  };
}

export default connect(mapStateToProps)(MapComponent);
