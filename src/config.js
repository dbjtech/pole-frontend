export default {
  name: '电力传输塔杆姿态检测系统',
  copyright: '电力传输塔杆姿态检测系统 ©2019 领翌科技',
  tableName: '车辆监测事件表',
  chartName: '倾斜角度历史变化',
};

export const amap = {
  // amapkey 由公司提供
  amapkey: '479c8ecf73ca9afc4d7b7d4ff4551ccb',
  // 当前最新版本为 1.4.14
  version: '1.4.14',
  // 初始中心的经纬度
  mapCenter: { longitude: 113.5418, latitude: 22.13 },
  // 显示卫星地图
  plugins: [
    // 'Scale',
    // 'ControlBar',
    {
      name: 'MapType',
      options: {
        defaultType: 1,
      },
    },
  ],
  // 放缩范围在 3~20
  zoom: 16,
};
