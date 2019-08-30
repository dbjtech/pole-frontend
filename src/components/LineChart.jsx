import React from 'react';
import { DatePicker, Select, Spin } from 'antd';
import { connect } from 'dva';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import moment from 'moment';
import axios from 'axios';
import io from 'socket.io-client';

import styles from './Main.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

class LineChart extends React.Component {
  state = {
    absoluteData: [],
    relativeData: [],
    isAbsolute: false,
    loading: true,
    isUsingSocket: true,
  };

  // 时间戳按秒记
  startTime = (new Date() - 1000 * 60 * 60 * 1) / 1000;

  // 注意取得的时间，可能这段时间内没有数据
  endTime = (new Date() - 1000 * 60 * 60 * 0) / 1000;

  socket = io(this.props.url);

  componentDidMount() {
    const that = this;

    this.fetchData();

    this.socket.on('event', data => {
      console.log('LineChart socket data: ', data);
      if (!that.state.isUsingSocket) {
        return;
      }

      if (data.type === 'zj300') {
        const absoluteData = that.state.absoluteData;
        const relativeData = that.state.relativeData;

        absoluteData.push({
          ...data,
          group: that.props.pole.name,
          date: moment(data.timestamp * 1000).format('YYYY-MM-DD_HH:mm:ss'),
        });
        relativeData.push({
          ...data,
          angle:
            absoluteData.length > 1
              ? absoluteData[absoluteData.length - 1].angle -
                absoluteData[absoluteData.length - 2].angle
              : 0,
        });

        that.setState({ absoluteData, relativeData });
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
        `${this.props.url}/frontend/zj300?poles_id=${polesId}&start_time=${startTime}&end_time=${endTime}`,
      )
      .then(data => {
        const absoluteData = [];
        const relativeData = [];
        const list = data.data.data;

        // 使角度数据按时间升序排列，最新在后
        list.sort((a, b) => a.timestamp - b.timestamp);
        for (let i = 0; i < list.length; i += 1) {
          absoluteData.push({
            ...list[i],
            // 分组需要从 dva 中获取
            group: this.props.pole.name,
            date: moment(list[i].timestamp * 1000).format('YYYY-MM-DD_HH:mm:ss'),
          });
        }

        for (let i = 0; i < absoluteData.length; i += 1) {
          relativeData.push({
            ...absoluteData[i],
            angle: absoluteData[i + 1] ? absoluteData[i + 1].angle - absoluteData[i].angle : 0,
          });
        }

        this.setState({ absoluteData, relativeData, loading: false });
      })
      .catch(err => console.log(err));
  };

  onSelectChange = value => {
    const isAbsolute = value === 'absolute' ? true : false;
    this.setState({ isAbsolute });
  };

  onOk = momentArr => {
    // 这里请求后端数据，取得的数据不需要保存到 dva 中，因为只有折线图用到
    this.fetchData(this.state.polesId, momentArr[0].unix(), momentArr[1].unix());
  };

  disabledDate = current => current > moment();

  render() {
    const cols = {
      date: {
        nice: true,
        tickCount: 6,
      },
    };
    return (
      <div className={styles.chartContainer}>
        <Spin spinning={this.state.loading}>
          <div>
            时间：
            <RangePicker
              defaultValue={[moment(this.startTime * 1000), moment(this.endTime * 1000)]}
              disabledDate={this.disabledDate}
              format="YYYY-MM-DD HH:mm:ss"
              ranges={{
                最近一小时: [moment().subtract(1, 'h'), moment()],
                最近一天: [moment().subtract(1, 'd'), moment()],
                最近一周: [moment().subtract(1, 'w'), moment()],
              }}
              showTime={{ format: 'HH:mm:ss' }}
              placeholder={['起始时间', '结束时间']}
              style={{ marginRight: 16 }}
              onOk={this.onOk}
            />
          </div>
          <div style={{ marginTop: 8 }}>
            展示类型：
            <Select
              defaultValue="relative"
              onChange={this.onSelectChange}
              style={{ width: 120, marginBottom: 10 }}
            >
              <Option value="relative">相对变化</Option>
              <Option value="absolute">绝对变化</Option>
            </Select>
          </div>

          <Chart
            height={400}
            data={this.state.isAbsolute ? this.state.absoluteData : this.state.relativeData}
            scale={cols}
            forceFit
          >
            <Legend />
            <Axis name="date" />
            <Axis
              name="angle"
              label={{
                formatter: val => `${val}°`,
              }}
            />
            <Tooltip title="date" />
            <Geom type="line" position="date*angle" size={2} color={'group'} shape={'smooth'} />
          </Chart>
        </Spin>
      </div>
    );
  }
}

// const data = [
//   {
//     angle: Number(),
//     timestamp: Date(),
//   },
// ];

function mapStateToProps(state) {
  return {
    pole: state.global.pole,
    url: state.global.url,
  };
}

export default connect(mapStateToProps)(LineChart);
