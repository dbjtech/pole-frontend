import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { DatePicker, Table } from 'antd';
import moment from 'moment';
// import axios from 'axios';

import styles from './Main.css';

const { RangePicker } = DatePicker;

export default class TableList extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  constructor(props) {
    super(props);

    this.state = { value: 'hour', dataArr: [] };

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

    // for (let i = 1; i < 100; i += 1) {
    //   this.data.push({
    //     key: i,
    //     group: '塔1',
    //     imei: '123456789012',
    //     status: '有车',
    //     date: moment().format('YYYY-MM-DD HH:mm:ss'),
    //   });
    // }
  }

  onChange = value => {
    this.setState({ value });
  };

  disabledDate = current => current > moment();

  componentDidMount() {
    // axios.get('/frontend/np100').then(data => {
    //   const dataArr = [];
    //   const list = data.data.list;
    //   list.sort((a, b) => b.timestamp - a.timestamp);
    //   for (let i = 0; i < list.length; i += 1) {
    //     dataArr.push({
    //       ...list[i],
    //       key: i + 1,
    //       group: '塔1',
    //       status: list[i].status ? '有车' : '无车',
    //       date: moment(list[i].timestamp).format('YYYY-MM-DD HH:mm:ss'),
    //     });
    //   }
    //   this.setState({ dataArr });
    // });
  }

  render() {
    return (
      <div className={styles.listContainer}>
        时间：
        <RangePicker
          defaultValue={[moment().subtract(1, 'h'), moment()]}
          disabledDate={this.disabledDate}
          format="YYYY-MM-DD HH:mm:ss"
          ranges={{
            最近一小时: [moment().subtract(1, 'h'), moment()],
            最近一天: [moment().subtract(1, 'd'), moment()],
            最近一周: [moment().subtract(1, 'w'), moment()],
          }}
          showTime={{ format: 'HH:mm:ss' }}
          placeholder={['起始时间', '结束时间']}
          onChange={this.onChange}
          onOk={this.onOk}
        />
        <Table
          columns={this.colums}
          dataSource={this.state.dataArr}
          scroll={{ x: true }}
          pagination={{ pageSize: 5, showQuickJumper: true }}
        />
      </div>
    );
  }
}

// const data = [
//   {
//     imei: Number(),
//     status: Boolean(),
//     timestamp: Date(),
//   },
// ];
