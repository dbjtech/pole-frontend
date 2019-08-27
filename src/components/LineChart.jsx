import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { DatePicker, Select } from 'antd';
import moment from 'moment';

import styles from './Main.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default class LineChart extends React.Component {
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
    const data = [
      {
        timestamp: 'Jan',
        city: 'Tokyo',
        angle: 7,
      },
      {
        timestamp: 'Jan',
        city: 'London',
        angle: 3.9,
      },
      {
        timestamp: 'Feb',
        city: 'Tokyo',
        angle: 6.9,
      },
      {
        timestamp: 'Feb',
        city: 'London',
        angle: 4.2,
      },
      {
        timestamp: 'Mar',
        city: 'Tokyo',
        angle: 9.5,
      },
      {
        timestamp: 'Mar',
        city: 'London',
        angle: 5.7,
      },
      {
        timestamp: 'Apr',
        city: 'Tokyo',
        angle: 14.5,
      },
      {
        timestamp: 'Apr',
        city: 'London',
        angle: 8.5,
      },
      {
        timestamp: 'May',
        city: 'Tokyo',
        angle: 18.4,
      },
      {
        timestamp: 'May',
        city: 'London',
        angle: 11.9,
      },
      {
        timestamp: 'Jun',
        city: 'Tokyo',
        angle: 21.5,
      },
      {
        timestamp: 'Jun',
        city: 'London',
        angle: 15.2,
      },
      {
        timestamp: 'Jul',
        city: 'Tokyo',
        angle: 25.2,
      },
      {
        timestamp: 'Jul',
        city: 'London',
        angle: 17,
      },
      {
        timestamp: 'Aug',
        city: 'Tokyo',
        angle: 26.5,
      },
      {
        timestamp: 'Aug',
        city: 'London',
        angle: 16.6,
      },
      {
        timestamp: 'Sep',
        city: 'Tokyo',
        angle: 23.3,
      },
      {
        timestamp: 'Sep',
        city: 'London',
        angle: 14.2,
      },
      {
        timestamp: 'Oct',
        city: 'Tokyo',
        angle: 18.3,
      },
      {
        timestamp: 'Oct',
        city: 'London',
        angle: 10.3,
      },
      {
        timestamp: 'Nov',
        city: 'Tokyo',
        angle: 13.9,
      },
      {
        timestamp: 'Nov',
        city: 'London',
        angle: 6.6,
      },
      {
        timestamp: 'Dec',
        city: 'Tokyo',
        angle: 9.6,
      },
      {
        timestamp: 'Dec',
        city: 'London',
        angle: 4.8,
      },
    ];
    // const data = [];
    // for (let i = 0; i < 50; i += 1) {
    //   data.push({
    //     timestamp: i,
    //     city: 'London',
    //     angle: 3,
    //   });
    // }
    const cols = {
      timestamp: {
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

        <Chart height={400} data={data} scale={cols} forceFit>
          <Legend />
          <Axis name="timestamp" />
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
          <Geom type="line" position="timestamp*angle" size={2} color={'city'} shape={'smooth'} />
          <Geom
            type="point"
            position="timestamp*angle"
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
