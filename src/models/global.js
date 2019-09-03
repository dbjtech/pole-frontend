const isDev = 0;

export default {
  namespace: 'global',
  state: {
    pole: {
      id: '',
      name: '',
    },
    url: isDev ? 'http://172.16.2.33:3000' : 'https://poles.dbjtech.com',
    imeiFilter: [],
  },
  reducers: {
    setPole(state, action) {
      state.pole = action.payload;
    },
    setImeiFilter(state, action) {
      state.imeiFilter = action.payload;
    },
  },
};
