export default {
  namespace: 'global',
  state: {
    pole: {
      id: '',
      name: '',
    },
    env: {
      isDev: false,
      url: 'https://poles.dbjtech.com',
    },
  },
  reducers: {
    setPole(state, action) {
      state.pole = action.payload;
    },
  },
};
