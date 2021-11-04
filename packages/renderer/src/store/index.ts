import { createStore } from 'vuex';

const store = createStore({
  state: () => ({
    socketConnected: false,
    settings: {
      cameraIndex: '',
      adminPassword: '',
      sleepTime: '',
    },
    image: '',
  }),
  getters: {
    socketConnected: state => state.socketConnected,
    settings: state => state.settings,
    image: state => state.image,
  },
  mutations: {
    setSocketConnected: (state, { value }) => { state.socketConnected = value; },
    setSettings: (state, settings) => { state.settings = settings; },
    setImage: (state, { value }) => { state.image = value; },
  },
});

export default store;
