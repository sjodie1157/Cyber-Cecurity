import { createStore } from 'vuex'
const renderLink = 'https://cyber-cecurity.onrender.com/'

export default createStore({
  state: {
    users: null
  },
  getters: {
  },
  mutations: {
    setUsers(state, value) {
      state.users = value;
    }
  },
  actions: {
    async fetchUsers(context) {
      let res = await fetch(`${renderLink}Users`);
      context.commit('setUsers', await res.json());
    }
  },
  modules: {
  }
})
