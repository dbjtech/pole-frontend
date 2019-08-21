import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { Map } from 'react-amap';

import { amap } from '../config';

export default class Main extends Component {
  // static propTypes = {
  // prop: PropTypes
  // }

  render() {
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 500, width: '100%', height: 500 }}>
        <Map
          amapkey={amap.amapkey}
          version={amap.version}
          plugins={amap.plugins}
          center={amap.mapCenter}
        />
      </div>
    );
  }
}
