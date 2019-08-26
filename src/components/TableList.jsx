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

    // sn 是 zj300 定位器的标识，不用显示在表格中；imei 是车检器的标识
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
    this.data = [];

    for (let i = 1; i < 100; i += 1) {
      this.data.push({
        key: i,
        group: '塔1',
        imei: '123456789012',
        status: '有车',
        date: '2019-8-20 15:39',
      });
    }
  }

  onChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <div className={styles.listContainer}>
        时间：
        <Select
          defaultValue="hour"
          onChange={this.onChange}
          style={{ width: 120, marginBottom: 10 }}
        >
          <Option value="hour">最近一小时</Option>
          <Option value="day">最近一天</Option>
          <Option value="week">最近一周</Option>
          <Option value="other">其它时间</Option>
        </Select>
        <Table
          columns={this.colums}
          dataSource={this.data}
          scroll={{ x: true }}
          pagination={{ pageSize: 5, showQuickJumper: true }}
        />
      </div>
    );
  }
}
