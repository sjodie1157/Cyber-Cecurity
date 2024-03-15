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
    // Fetch all users
    async fetchUsers(context) {
      let res = await fetch(`${renderLink}Users`);
      context.commit('setUsers', await res.json());
    },
    // Fetch all items
    async fetchItems(context) {
      let res = await fetch(`${renderLink}Items`);
      context.commit('setItems', await res.json());
    },
    async editItems(context, { prodID, newInfo }) {
      try {
        const res = await fetch(`${renderLink}items/${prodID}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newInfo)
        });
        if (!res.ok) {
          throw new Error('Failed to edit item');
        }
        // Optionally, you can commit mutations or handle response as required
      } catch (error) {
        console.error('Error editing item:', error);
        throw error;
      }
    },

    // Sign the user in
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
        // Create a cookie for the user with a webtoken if the cookie isn't undefined
        let { token, user } = await res.json();

        if (token !== undefined) {
          document.cookie = `webtoken=${token};`;
        } else {
          alert('Incorrect Login Details');
          return;
        }
        // Create a cookie for the user with values of the users id and role to be used later
        if (user !== undefined) {
          const userCookie = {
            userID: user.userID,
            userFirstName: user.userFirstName,
            userRole: user.userRole,
            userImg: user.userImg
          };
          document.cookie = `user=${JSON.stringify(userCookie)};`;
        }

        if (user !== undefined) {
          commit('setSignedUser', user);
          commit('setIsLoggedIn', true);
          location.reload();
        }
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
        let res = await fetch(`${renderLink}Cart/${userId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch cart data');
        }
        context.commit('setCart', await res.json());
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    },
    // Add to Cart function
    async addToCart(context, params) {
      const cookies = document.cookie.split(';').map(cookie => cookie.trim());
      let userId;

      for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'user') {
          const user = JSON.parse(decodeURIComponent(value));
          userId = user.userID;
          break;
        }
      }
      const data = {
        prodID: params
      };

      if (userId) {
        try {
          const res = await fetch(`${renderLink}cart/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
        } catch (error) {
          console.error('Error adding product to cart:', error);
        }
      } else {
        console.error('User ID not found. Unable to add product to cart.');
      }
    },
    async removeFromCart(context, params) {
      const cookies = document.cookie.split(';').map(cookie => cookie.trim());
      let userId;

      for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'user') {
          const user = JSON.parse(decodeURIComponent(value));
          userId = user.userID;
          const data = {
            prodID: params
          };

          try {
            const res = await fetch(`${renderLink}cart/${userId}`, {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            location.reload()
          } catch (error) {
            console.error('Unable to delete item from cart');
          }
          break;
        }
      }
    },
    async signOut({ commit }) {
      try {
        // Delete the cookies when signed out by using a backdating method
        commit('setSignedUser', null);
        commit('setIsLoggedIn', false);

        document.cookie = 'webtoken=; expires=Fri, 06 Jul 2001 00:00:00 UTC; path=/;';
        document.cookie = 'user=; expires=Fri, 06 Jul 2001 00:00:00 UTC; path=/;';

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


