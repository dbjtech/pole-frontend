const isDev = 1;

export default {
  namespace: 'global',
  state: {
    pole: {
      id: '',
      name: '',
    },
    // env: {
    url: isDev ? 'http://172.16.2.33:3000' : 'https://poles.dbjtech.com',
    // },
  },
  reducers: {
    setPole(state, action) {
      state.pole = action.payload;
    },
  },
};
