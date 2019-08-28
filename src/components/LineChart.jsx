import React from 'react';
import { DatePicker, Select } from 'antd';
import { connect } from 'dva';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import moment from 'moment';
import axios from 'axios';

import styles from './Main.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

class LineChart extends React.Component {
  state = {
    absoluteData: [],
    relativeData: [],
    isAbsolute: false,
  };

  // 时间戳按秒记
  startTime = (new Date() - 1000 * 60 * 60 * 24) / 1000;

  endTime = new Date() / 1000;

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
      .get(`/frontend/zj300?poles_id=${polesId}&start_time=${startTime}&end_time=${endTime}`)
      // .get('/frontend/zj300')
      .then(data => {
        const absoluteData = [];
        const relativeData = [];
        const list = data.data.data;

        // 使角度数据按时间顺序排列
        list.sort((a, b) => b.timestamp - a.timestamp);
        for (let i = 0; i < list.length; i += 1) {
          absoluteData.push({
            ...list[i],
            // 分组需要从 dva 中获取
            group: this.props.pole.name,
            date: moment(list[i].timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
          });
        }

        for (let i = 0; i < absoluteData.length; i += 1) {
          relativeData.push({
            ...absoluteData[i],
            angle: absoluteData[i + 1] ? absoluteData[i + 1].angle - absoluteData[i].angle : 0,
          });
        }

        this.setState({ absoluteData, relativeData });
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
        range: [0, 1],
      },
    };
    return (
      <div className={styles.chartContainer}>
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
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="line" position="date*angle" size={2} color={'group'} shape={'smooth'} />
          <Geom
            type="point"
            position="date*angle"
            size={4}
            shape={'circle'}
            color={'group'}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
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
  };
}

export default connect(mapStateToProps)(LineChart);
