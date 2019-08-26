import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { Menu, Select } from 'antd';
import { connect } from 'dva';

import logo from '../assets/logo-01.png';
import styles from './Main.css';

const { Option } = Select;

class SideNav extends Component {
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
        <Select
          defaultValue="hour"
          // onChange={this.onChange}
          showSearch
          style={{ width: 120, marginBottom: 5, marginTop: 10 }}
        >
          <Option value="hour">分组1</Option>
          <Option value="day">分组2</Option>
          <Option value="week">分组3</Option>
          <Option value="other">分组4</Option>
        </Select>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <span className="nav-text">塔1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span className="nav-text">塔2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <span className="nav-text">塔3</span>
          </Menu.Item>
          <Menu.Item key="4">
            <span className="nav-text">塔4</span>
          </Menu.Item>
          {/* dva-immer */}
          <Menu.Item
            onClick={() => {
              this.props.dispatch({
                type: 'global/add',
                payload: 2,
              });
            }}
          >
            {this.props.count}
          </Menu.Item>
        </Menu>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.global.count,
  };
}

export default connect(mapStateToProps)(SideNav);
