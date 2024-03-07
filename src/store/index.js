import { createStore } from 'vuex';
const renderLink = 'https://cyber-cecurity-1.onrender.com/';

export default createStore({
  state: {
    users: null,
    cart: null,
    signedUser: '',
    isLoggedIn: false
  },
  getters: {
  },
  mutations: {
    setUsers(state, value) {
      state.users = value;
    },
    setCart(state, value) {
      state.cart = value;
    },
    setSignedUser(state, user) {
      state.signedUser = user;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
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
    },
    async signIn({ commit }, { userEmail, userPass }) {
      try {
        let res = await fetch(`${renderLink}signIn`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ userEmail, userPass })
        });

        let { token, user } = await res.json();
        document.cookie = `webtoken=${token};`;
        commit('setSignedUser', user);
        commit('setIsLoggedIn', true);
        localStorage.setItem('username', JSON.stringify(user.userFirstName))
        localStorage.setItem('userRole', JSON.stringify(user.userRole))
        location.reload()
      } catch (error) {
        console.error('Error signing in:', error);
        throw error;
      }
    },
    async signOut({ commit }) {
      try {
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        commit('setSignedUser', null);
        commit('setIsLoggedIn', false);
        location.href = 'http://localhost:8080'
        $cookies.remove('webtoken')
      } catch (error) {
        console.error('Error signing out:', error);
        throw error;
      }
    }
  },
  modules: {
  }
});


