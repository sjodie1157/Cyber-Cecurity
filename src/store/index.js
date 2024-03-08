import { createStore } from 'vuex';
const renderLink = 'https://cyber-cecurity-1.onrender.com/';

export default createStore({
  state: {
    users: null,
    items: null,
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
    setItems(state, value) {
      state.items = value;
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
    async fetchItems(context) {
      let res = await fetch(`${renderLink}Items`);
      context.commit('setItems', await res.json());
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
        // store data in cookies instead of local storage
        document.cookie = `webtoken=${token};`;
        document.cookie = `user=${JSON.stringify(user)};`;

        commit('setSignedUser', user);
        commit('setIsLoggedIn', true);
        location.reload()
      } catch (error) {
        console.error('Error signing in:', error);
        throw error;
      }
    },
    async fetchCart(context) {
      try {
        // Retrieve user ID from the cookie
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        let userId;
        for (const cookie of cookies) {
          const [name, value] = cookie.split('=');
          if (name === 'user') {
            const user = JSON.parse(decodeURIComponent(value));
            userId = user.userID;
            break;
          }
        }

        if (!userId) {
          throw new Error('User ID not found in cookie');
        }

        // Fetch cart data using the user ID
        let res = await fetch(`${renderLink}Cart/${userId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch cart data');
        }

        // Set the cart in the store
        context.commit('setCart', await res.json());
      } catch (error) {
        console.error('Error fetching cart:', error);
        // Handle the error, maybe show a message to the user
      }
    },
    async addToCart(context, params) {
      // Splitting cookies and trimming each one
      const cookies = document.cookie.split(';').map(cookie => cookie.trim());
      let userId;

      // Looping through cookies to find the 'user' cookie
      for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'user') {
          const user = JSON.parse(decodeURIComponent(value));
          userId = user.userID;
          break; // Exit the loop once userId is found
        }
      }

      // If userId is not found, you might want to handle this scenario

      // Creating data object with product ID
      const data = {
        prodID: params
      };

      // Adding the product to the user's cart if userId is found
      if (userId) {
        try {
          const res = await fetch(`${renderLink}cart/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          // Handle response if needed
        } catch (error) {
          console.error('Error adding product to cart:', error);
          // Handle error
        }
      } else {
        console.error('User ID not found. Unable to add product to cart.');
        // Handle scenario where user ID is not found
      }
    },
    async signOut({ commit }) {
      try {
        commit('setSignedUser', null);
        commit('setIsLoggedIn', false);
        
        document.cookie = 'webtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        // change directory when firebase deploy to home
        location.href = 'http://localhost:8080'
      } catch (error) {
        console.error('Error signing out:', error);
        throw error;
      }
    }
  },
  modules: {
  }
});


