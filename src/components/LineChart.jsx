import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import axios from 'axios';

import styles from './Main.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default class LineChart extends React.Component {
  state = { dataArr: [] };

  componentDidMount() {
    axios.get('/frontend/zj300').then(data => {
      const dataArr = [];
      const list = data.data.list;

      list.sort((a, b) => b.timestamp - a.timestamp);
      for (let i = 0; i < list.length; i += 1) {
        dataArr.push({
          ...list[i],
          date: moment(list[i].timestamp).format('YYYY-MM-DD HH:mm:ss'),
        });
      }
      this.setState({ dataArr });
    });
  }

  onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  onOk = value => {
    // 这里请求后端数据，取得的数据不需要保存到 dva 中，因为只有折线图用到
    console.log('onOk: ', value);
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
            style={{ marginRight: 16 }}
            onChange={this.onChange}
            onOk={this.onOk}
          />
          展示类型：
          <Select
            defaultValue="hour"
            onChange={this.onChange}
            style={{ width: 120, marginBottom: 10 }}
          >
            <Option value="hour">相对变化</Option>
            <Option value="day">绝对变化</Option>
          </Select>
        </div>

        <Chart height={400} data={this.state.dataArr} scale={cols} forceFit>
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
          <Geom type="line" position="date*angle" size={2} color={'city'} shape={'smooth'} />
          <Geom
            type="point"
            position="date*angle"
            size={4}
            shape={'circle'}
            color={'city'}
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
