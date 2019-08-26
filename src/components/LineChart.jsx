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

  disabledDate = current => current > moment().endOf('day');

  render() {
    const data = [
      {
        month: 'Jan',
        city: 'Tokyo',
        temperature: 7,
      },
      {
        month: 'Jan',
        city: 'London',
        temperature: 3.9,
      },
      {
        month: 'Feb',
        city: 'Tokyo',
        temperature: 6.9,
      },
      {
        month: 'Feb',
        city: 'London',
        temperature: 4.2,
      },
      {
        month: 'Mar',
        city: 'Tokyo',
        temperature: 9.5,
      },
      {
        month: 'Mar',
        city: 'London',
        temperature: 5.7,
      },
      {
        month: 'Apr',
        city: 'Tokyo',
        temperature: 14.5,
      },
      {
        month: 'Apr',
        city: 'London',
        temperature: 8.5,
      },
      {
        month: 'May',
        city: 'Tokyo',
        temperature: 18.4,
      },
      {
        month: 'May',
        city: 'London',
        temperature: 11.9,
      },
      {
        month: 'Jun',
        city: 'Tokyo',
        temperature: 21.5,
      },
      {
        month: 'Jun',
        city: 'London',
        temperature: 15.2,
      },
      {
        month: 'Jul',
        city: 'Tokyo',
        temperature: 25.2,
      },
      {
        month: 'Jul',
        city: 'London',
        temperature: 17,
      },
      {
        month: 'Aug',
        city: 'Tokyo',
        temperature: 26.5,
      },
      {
        month: 'Aug',
        city: 'London',
        temperature: 16.6,
      },
      {
        month: 'Sep',
        city: 'Tokyo',
        temperature: 23.3,
      },
      {
        month: 'Sep',
        city: 'London',
        temperature: 14.2,
      },
      {
        month: 'Oct',
        city: 'Tokyo',
        temperature: 18.3,
      },
      {
        month: 'Oct',
        city: 'London',
        temperature: 10.3,
      },
      {
        month: 'Nov',
        city: 'Tokyo',
        temperature: 13.9,
      },
      {
        month: 'Nov',
        city: 'London',
        temperature: 6.6,
      },
      {
        month: 'Dec',
        city: 'Tokyo',
        temperature: 9.6,
      },
      {
        month: 'Dec',
        city: 'London',
        temperature: 4.8,
      },
    ];
    const cols = {
      month: {
        range: [0, 1],
      },
    };
    return (
      <div className={styles.chartContainer}>
        <div>
          时间：
          <RangePicker
            disabledDate={this.disabledDate}
            showTime={{ format: 'HH:mm:ss' }}
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={['起始时间', '结束时间']}
            onChange={this.onChange}
            onOk={this.onOk}
            style={{ marginRight: 16 }}
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
          <Axis name="month" />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}°C`,
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="line" position="month*temperature" size={2} color={'city'} shape={'smooth'} />
          <Geom
            type="point"
            position="month*temperature"
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
