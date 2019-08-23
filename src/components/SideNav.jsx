import React, { Component } from 'react';
import { Menu } from 'antd';
// import PropTypes from 'prop-types'

import logo from '../assets/logo-01.png';
import styles from './Main.css';

export default class SideNav extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    return (
      <nav>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <h1>领翌科技</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <span className="nav-text">nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span className="nav-text">nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <span className="nav-text">nav 3</span>
          </Menu.Item>
          <Menu.Item key="4">
            <span className="nav-text">nav 4</span>
          </Menu.Item>
        </Menu>
      </nav>
    );
  }
}
