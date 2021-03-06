// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          immer: true,
        },
        dynamicImport: false,
        title: '电力传输塔杆姿态检测系统',
        dll: false,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
  // 代理的是服务，不是请求地址。代理只是将请求服务做了中转，设置proxy不会修改请求地址
  // mock 比 proxy 优先级高
  proxy: {
    '/frontend': {
      target: 'http://poles.dbjtech.com/',
      // target: 'http://172.16.2.33:3000',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },

  // 指定 react-router 的 base，部署到非根目录时需要配置
  base: '/pole-frontend',

  // 指定 webpack 的 publicPath，指向静态资源文件所在的路径。
  publicPath: '/pole-frontend/',

  // 指定输出路径
  outputPath: '/docs',
};
