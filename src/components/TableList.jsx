import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { Select, Table } from 'antd';

import styles from './Main.css';

const { Option } = Select;

export default class TableList extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  constructor(props) {
    super(props);

    this.state = { value: 'hour' };

    this.colums = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: '分组',
        dataIndex: 'group',
        key: 'group',
      },
      {
        title: 'SN',
        dataIndex: 'sn',
        key: 'sn',
      },
      {
        title: 'IMEI',
        dataIndex: 'imei',
        key: 'imei',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '时间',
        dataIndex: 'date',
        key: 'date',
      },
    ];
    this.data = [
      {
        key: '1',
        group: '塔1',
        sn: '234567ACCC',
        imei: '123456789012',
        status: '有车',
        date: '2019-8-20 15:39',
      },
    ];
  }

  onChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <div className={styles.listContainer}>
        时间：
        <Select defaultValue="hour" onChange={this.onChange} style={{ width: 120 }}>
          <Option value="hour">最近一小时</Option>
          <Option value="day">最近一天</Option>
          <Option value="week">最近一周</Option>
          <Option value="other">其它时间</Option>
        </Select>
        <Table columns={this.colums} dataSource={this.data} scroll={{ x: true }} />
      </div>
    );
  }
}
