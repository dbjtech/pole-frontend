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
  'GET /frontend/zj300': (req, res) => {
    const data = mockjs.mock({
      'list|100': [
        {
          'angle|120.0-10': 1,
          'timestamp|10000000000-1000000000000': 1,
        },
      ],
    });

    res.send(data);
  },
};
