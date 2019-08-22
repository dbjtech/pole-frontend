import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { Select } from 'antd';

import styles from './TableList.css';

const { Option } = Select;

export default class TableList extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  constructor(props) {
    super(props);

    this.state = { value: 'hour' };
  }

  onChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <div className={styles.container}>
        时间：
        <Select defaultValue="hour" onChange={this.onChange} style={{ width: 120 }}>
          <Option value="hour">最近一小时</Option>
          <Option value="day">最近一天</Option>
          <Option value="week">最近一周</Option>
          <Option value="other">其它时间</Option>
        </Select>
      </div>
    );
  }
}
