import React, { Component } from 'react';
import { DatePicker, Table } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import axios from 'axios';

import styles from './Main.css';

const { RangePicker } = DatePicker;

class TableList extends Component {
  state = {
    dataSource: [],
  };

  // 时间戳按秒记
  startTime = (new Date() - 1000 * 60 * 60 * 24) / 1000;

  endTime = new Date() / 1000;

  // sn 是 zj300 定位器的标识，不用显示在表格中；imei 是车检器的标识
  colums = [
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

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // 典型用法（不要忘记比较 props）：
    if (this.props.pole.id !== prevProps.pole.id) {
      this.fetchData(this.props.pole.id);
    }
  }

  fetchData = (
    polesId = this.props.pole.id,
    startTime = this.startTime,
    endTime = this.endTime,
  ) => {
    if (!polesId) {
      return;
    }

    axios
      .get(`/frontend/np100?poles_id=${polesId}&start_time=${startTime}&end_time=${endTime}`)
      // .get('/frontend/zj300')
      .then(data => {
        const list = data.data.data;
        const dataSource = [];

        // 使车辆数据按时间顺序排列
        list.sort((a, b) => b.timestamp - a.timestamp);
        for (let i = 0; i < list.length; i += 1) {
          dataSource.push({
            ...list[i],
            key: i + 1,
            group: this.props.pole.name,
            status: list[i].status ? '有车' : '无车',
            date: moment(list[i].timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
          });
        }

        this.setState({ dataSource });
      })
      .catch(err => console.log(err));
  };

  disabledDate = current => current > moment();

  onOk = momentArr => {
    // 这里请求后端数据，取得的数据不需要保存到 dva 中，因为只有表格图用到
    this.fetchData(this.props.pole.id, momentArr[0].unix(), momentArr[1].unix());
  };

  render() {
    return (
      <div className={styles.listContainer}>
        时间：
        <RangePicker
          defaultValue={[moment(this.startTime * 1000), moment(this.endTime * 1000)]}
          // defaultValue={[moment().subtract(1, 'h'), moment()]}
          disabledDate={this.disabledDate}
          format="YYYY-MM-DD HH:mm:ss"
          ranges={{
            最近一小时: [moment().subtract(1, 'h'), moment()],
            最近一天: [moment().subtract(1, 'd'), moment()],
            最近一周: [moment().subtract(1, 'w'), moment()],
          }}
          showTime={{ format: 'HH:mm:ss' }}
          placeholder={['起始时间', '结束时间']}
          onOk={this.onOk}
        />
        <Table
          columns={this.colums}
          dataSource={this.state.dataSource}
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

function mapStateToProps(state) {
  return {
    pole: state.global.pole,
  };
}

export default connect(mapStateToProps)(TableList);
