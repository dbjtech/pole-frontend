import React, { Component } from 'react';
import { Map, Marker, InfoWindow } from 'react-amap';
import { Icon } from 'antd';
import { connect } from 'dva';
import axios from 'axios';
import io from 'socket.io-client';
import { wgs84togcj02 } from 'coordtransform';

import config from '../config';
import styles from './Main.css';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: config.iconCdn,
});

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

  socket = io(this.props.url);

  componentDidMount() {
    const that = this;

    this.socket.on('event', data => {
      // console.log('MapComponent socket data: ', data);
      if (!that.state.isUsingSocket || data.poles_id !== this.props.pole.id) {
        return;
      }

      if (data.type === 'gps') {
        const gcj02Location = wgs84togcj02(data.lng, data.lat);

        this.setState({
          mapCenter: { longitude: gcj02Location[0], latitude: gcj02Location[1] },
          altitude: data.alt,
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // 典型用法（不要忘记比较 props）：
    if (this.props.pole.id !== prevProps.pole.id) {
      this.fetchData(this.props.pole.id);
    }
  }

  fetchData = (polesId = this.props.pole.id) => {
    if (!polesId) {
      return;
    }

    axios
      .get(`${this.props.url}/frontend/gps?poles_id=${polesId}`)
      .then(data => {
        const list = data.data.data;
        const wgs84Location = list[0];
        const gcj02Location = wgs84togcj02(wgs84Location.lng, wgs84Location.lat);

        if (
          wgs84Location.lng !== null &&
          wgs84Location.lat !== null &&
          wgs84Location.alt !== null
        ) {
          this.setState({
            // mapCenter: { longitude: wgs84Location.lng, latitude: wgs84Location.lat },
            mapCenter: { longitude: gcj02Location[0], latitude: gcj02Location[1] },
            altitude: wgs84Location.alt,
          });
        }
      })
      .catch(err => console.log(err));
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
    close: () => {
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
          <Marker
            position={this.state.mapCenter}
            events={this.markerEvents}
            // render={<Icon type="arrow-up" />}
            render={<IconFont type="icon-dianxiangan2" style={{ fontSize: 40 }} />}
          />
          <InfoWindow
            position={this.state.mapCenter}
            size={{ width: 200, height: 150 }}
            offset={[0, -20]}
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
    url: state.global.url,
    imeiFilter: state.global.imeiFilter,
  };
}

export default connect(mapStateToProps)(MapComponent);
