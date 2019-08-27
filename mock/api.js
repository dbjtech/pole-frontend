import mockjs from 'mockjs';

export default {
  'GET /frontend/np100': mockjs.mock({
    'list|100': [
      {
        'imei|10000-100000': 1,
        'status|1': true,
        'timestamp|10000000000-1000000000000': 1,
      },
    ],
  }),
};
