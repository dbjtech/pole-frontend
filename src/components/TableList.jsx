import React, { Component } from 'react';
import { DatePicker, Table, Spin } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import axios from 'axios';
import io from 'socket.io-client';

import styles from './Main.css';

const { RangePicker } = DatePicker;

class TableList extends Component {
  state = {
    dataSource: [],
    loading: true,
    isUsingSocket: true,
  };

  // 时间戳按秒记
  startTime = (new Date() - 1000 * 60 * 60 * 24) / 1000;

  endTime = new Date() / 1000;

  // 初始化 socket
  socket = io(this.props.url);

  componentDidMount() {
    const that = this;

    this.fetchData();

    // this.socket.on('connect', () => {
    //   console.log('socket connected');
    // });

    this.socket.on('event', data => {
      console.log('TableList socket data: ', data);
      if (!that.state.isUsingSocket) {
        return;
      }

      if (data.type === 'np100') {
        const dataSource = that.state.dataSource;

        dataSource.unshift({
          ...data,
          key: dataSource.length + 1,
          group: that.props.pole.name,
          status: data.status ? '有车' : '无车',
          date: moment(data.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
        });

        that.setState({ dataSource });
      }
    });
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

    // 结束时间少于一分钟则取 socket 的数据
    if (Math.abs(moment().unix() - endTime) < 60) {
      this.setState({ isUsingSocket: true });
    } else {
      this.setState({ isUsingSocket: false });
    }

    axios
      .get(
        `${this.props.url}/frontend/np100?poles_id=${polesId}&start_time=${startTime}&end_time=${endTime}`,
      )
      .then(data => {
        const list = data.data.data;
        const dataSource = [];

        // 使车辆数据按时间降序排列，最新在前
        list.sort((a, b) => b.timestamp - a.timestamp);
        for (let i = 0; i < list.length; i += 1) {
          dataSource.push({
            ...list[i],
            key: list.length - i,
            group: this.props.pole.name,
            status: list[i].status ? '有车' : '无车',
            date: moment(list[i].timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
          });
        }

        this.setState({ dataSource, loading: false });
      })
      .catch(err => console.log(err));
  };

  disabledDate = current => current > moment();

  onOk = momentArr => {
    // 这里请求后端数据，取得的数据不需要保存到 dva 中，因为只有表格图用到
    this.fetchData(this.props.pole.id, momentArr[0].unix(), momentArr[1].unix());
  };

  render() {
    // sn 是 zj300 定位器的标识，不用显示在表格中；imei 是车检器的标识
    const colums = [
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

    return (
      <div className={styles.listContainer}>
        <Spin spinning={this.state.loading}>
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
            columns={colums}
            dataSource={this.state.dataSource.filter(value => value.status === '有车')}
            scroll={{ x: true }}
            pagination={{ pageSize: 5, showQuickJumper: true }}
          />
        </Spin>
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
    url: state.global.url,
  };
}

export default connect(mapStateToProps)(TableList);
