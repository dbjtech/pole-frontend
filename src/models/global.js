export default {
  namespace: 'global',
  state: { currentTower: '', count: 0 },
  reducers: {
    setTower(state, action) {
      return { ...state, currentTower: action.payload };
    },
    add(state) {
      state.count += 1;
    },
  },
};
