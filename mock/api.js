import mockjs from 'mockjs';

export default {
  'GET /frontend/poles': mockjs.mock({
    'data|3': [{ 'id|1-100': 1, 'name|1': '@string' }],
  }),

  'GET /frontend/np100': mockjs.mock({
    'data|100': [
      {
        'imei|10000-100000': 1,
        'status|1': true,
        'timestamp|10000000000-1000000000000': 1,
      },
    ],
  }),

  'GET /frontend/zj300': mockjs.mock({
    'data|100': [
      {
        'angle|120.0-10': 1,
        'timestamp|100000000-1000000000': 1,
      },
    ],
  }),
};
