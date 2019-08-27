import mockjs from 'mockjs';

export default {
  // 使用 mockjs 等三方库
  '/frontend/np100': (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // const data = mockjs.mock({
    //   'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
    // });
    res.json([123]);
  },
  // 'GET /frontend/np100':
  // mockjs.mock({
  //   'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  // }),
};
