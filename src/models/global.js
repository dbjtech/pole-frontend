export default {
  namespace: 'global',
  state: {
    pole: {
      id: '',
      name: '',
    },
  },
  reducers: {
    setPole(state, action) {
      state.pole = action.payload;
      // console.log(state.pole);
    },
  },
};
