export default {
  namespace: 'global',
  state: { currentTower: '', count: 0 },
  reducers: {
    setTower(state, action) {
      state.currentTower = action.payload;
    },
    add(state, action) {
      state.count += action.payload;
    },
  },
};
