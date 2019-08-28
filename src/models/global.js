export default {
  namespace: 'global',
  state: {
    pole: {
      id: '',
      name: '',
    },
    count: 0,
  },
  reducers: {
    setPole(state, action) {
      state.pole = action.payload;
      // console.log(state.pole);
    },
    add(state, action) {
      state.count += action.payload;
    },
  },
};
