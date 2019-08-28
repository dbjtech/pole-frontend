import React, { Component } from 'react';
import { Menu, Select } from 'antd';
import { connect } from 'dva';
import axios from 'axios';

import logo from '../assets/logo-01.png';
import styles from './Main.css';

const { Option } = Select;

class SideNav extends Component {
  state = {
    polesList: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get(`${this.props.env.isDev ? '' : this.props.env.url}/frontend/poles`)
      .then(data => {
        const polesList = data.data.data;
        // setPole 需要异步设置，否则 Select 会报错
        this.setState({ polesList }, () => this.setPole(polesList[0].id));
      })
      .catch(err => console.log(err));
  };

  setPole = id => {
    const filteredPoleList = this.state.polesList.filter(value => value.id === id);

    this.props.dispatch({
      type: 'global/setPole',
      payload: filteredPoleList[0],
    });
  };

  onChange = id => {
    // 通过 Select 选中电线杆
    this.setPole(id);
  };

  onSelect = ({ key }) => {
    // 通过 Menu 选中电线杆，由于 Menu 中要求 key 是字符串，故要转成数字
    this.setPole(+key);
  };

  render() {
    return (
      <nav>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <h1>领翌科技</h1>
        </div>
        <Select
          placeholder="搜索框"
          showSearch
          value={this.props.pole.id}
          style={{ width: 120, marginBottom: 5, marginTop: 10 }}
          onChange={this.onChange}
        >
          {this.state.polesList.map(item => (
            <Option value={item.id} key={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Menu
          mode="inline"
          // selectedKeys 要求 string[]
          selectedKeys={[`${this.props.pole.id}`]}
          theme="dark"
          onSelect={this.onSelect}
        >
          {this.state.polesList.map(item => (
            <Menu.Item key={item.id}>{item.name}</Menu.Item>
          ))}
        </Menu>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    pole: state.global.pole,
    env: state.global.env,
  };
}

export default connect(mapStateToProps)(SideNav);
