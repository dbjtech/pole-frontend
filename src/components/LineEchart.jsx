import React from 'react';
import { DatePicker, Select, Spin } from 'antd';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import axios from 'axios';

import styles from './Main.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

class LineEchart extends React.Component {
  state = {
    absoluteData: [],
    relativeData: [],
    isAbsolute: false,
    loading: true,
  };

  // 时间戳按秒记
  startTime = (new Date() - 1000 * 60 * 60 * 12) / 1000;

  // 注意取得的时间，可能这段时间内没有数据
  endTime = (new Date() - 1000 * 60 * 60 * 11) / 1000;

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
      .get(
        `${
          this.props.env.isDev ? '' : this.props.env.url
        }/frontend/zj300?poles_id=${polesId}&start_time=${startTime}&end_time=${endTime}`,
      )
      .then(data => {
        const absoluteData = [];
        const relativeData = [];
        const list = data.data.data;

        // 使角度数据按时间升序排列
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

  getOption = () => ({
    // title: {
    //   text: this.props.title,
    // },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'category',
      boundaryGap: [0, '100%'],
    },
    dataZoom: [
      {
        type: 'inside',
        // start: 0,
        // end: 100,
      },
      {
        // start: 0,
        // end: 100,
        handleIcon:
          'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        filterMode: 'empty',
      },
    ],
    tooltip: {
      trigger: 'axis',
      // position: function(pt) {
      //   return [pt[0], '10%'];
      // },
    },
    toolbox: {
      feature: {
        // dataZoom: {
        // 	yAxisIndex: 'none',
        // },
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        type: 'line',
        name: '角度变化历史',
        smooth: true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          color: '#40a9ff',
        },
        lineStyle: {
          // 重新渲染的是线的样式
          width: 1,
        },
        areaStyle: {
          color: '#40a9ff',
        },
        data: this.state.isAbsolute ? this.state.absoluteData : this.state.relativeData,
      },
    ],
  });

  render() {
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

          <ReactEcharts
            option={this.getOption()}
            style={{ width: '100%' }}
            ref={e => {
              this.echarts_react = e;
            }}
          />
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
    env: state.global.env,
  };
}

export default connect(mapStateToProps)(LineEchart);
