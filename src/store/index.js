import { createStore } from 'vuex';
const renderLink = 'https://cyber-cecurity.onrender.com/';

export default createStore({
  state: {
    users: null,
    cart: null
  },
  getters: {
  },
  mutations: {
    setUsers(state, value) {
      state.users = value;
    },
    setCart(state, value) {
      state.cart = value;
    }
  },
  actions: {
    async fetchUsers(context) {
      let res = await fetch(`${renderLink}Users`);
      context.commit('setUsers', await res.json());
    },
    async fetchCart(context) {
      let res = await fetch(`${renderLink}Cart/1`);
      context.commit('setCart', await res.json());
    }
  },
  modules: {
  }
});
