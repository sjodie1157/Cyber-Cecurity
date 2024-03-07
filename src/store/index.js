// import { createStore } from 'vuex';
// const renderLink = 'https://cyber-cecurity.onrender.com/';

// export default createStore({
//   state: {
//     users: null,
//     cart: null
//   },
//   getters: {
//   },
//   mutations: {
//     setUsers(state, value) {
//       state.users = value;
//     },
//     setCart(state, value) {
//       state.cart = value;
//     }
//   },
//   actions: {
//     async fetchUsers(context) {
//       let res = await fetch(`${renderLink}Users`);
//       context.commit('setUsers', await res.json());
//     },
//     async fetchCart(context) {
//       let res = await fetch(`${renderLink}Cart/1`);
//       context.commit('setCart', await res.json());
//     }
//   },
//   modules: {
//   }
// });


import { createStore } from 'vuex';

const serverUrl = 'https://cyber-cecurity.onrender.com';
/* eslint-disable */
export default createStore({
  state: {
    users: [],
    signedUser: '',
    isLoggedIn: false
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
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
    async deleteUser({ dispatch }, userID) {
      try {
        await fetch(`${serverUrl}/removeUser/${userID}`, {
          method: 'DELETE'
        });
        dispatch('fetchUsers');
        alert('User has been removed');
      } catch (error) {
        console.error('Error deleting user', error);
      }
    },
    async signIn({ commit }, { userEmail, userPass }) {
      try {
        let res = await fetch(`${serverUrl}/signIn`, {
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
        // location.href = 'http://localhost:8080'
        $cookies.remove('webtoken')
      } catch (error) {
        console.error('Error signing out:', error);
        throw error;
      }
    }
  },
  getters: {
    currentUser(state) {
      return state.signedUser;
    }
  }
});