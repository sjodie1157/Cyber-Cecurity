import { createStore } from 'vuex';
import Swal from 'sweetalert2';

const renderLink = 'https://cyber-cecurity-1.onrender.com/';

export default createStore({
  state: {
    users: null,
    items: null,
    cart: null,
    signedUser: '',
    isLoggedIn: false
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
      try {
        let res = await fetch(`${renderLink}Users`);
        context.commit('setUsers', await res.json());
      } catch (error) {
        console.error('Error fetching users:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch users. Please try again later.'
        });
      }
    },
    async fetchItems(context) {
      try {
        let res = await fetch(`${renderLink}Items`);
        context.commit('setItems', await res.json());
      } catch (error) {
        console.error('Error fetching items:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch items. Please try again later.'
        });
      }
    },
    async addProduct(context, newProduct) {
      try {
        const res = await fetch(`${renderLink}Items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProduct)
        });
        if (!res.ok) {
          throw new Error('Failed to add product');
        }
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product has been added successfully!'
        });
      } catch (error) {
        console.error('Error adding product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add product. Please try again later.'
        });
        throw error;
      }
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

        if (token !== undefined) {
          document.cookie = `webtoken=${token};`;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Incorrect Login Details'
          });
          return;
        }

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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error signing in. Please try again later.'
        });
        throw error;
      }
    },
    async fetchCart(context) {
      try {
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
        Swal.fire({
          icon: 'error',
          title: 'Please Log in',
          text: 'Error fetching cart. Please try again later.'
        });
      }
    },
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
          await fetch(`${renderLink}cart/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
        } catch (error) {
          console.error('Error adding product to cart:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error adding product to cart. Please try again later.'
          });
        }
      } else {
        console.error('User ID not found. Unable to add product to cart.');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User ID not found. Unable to add product to cart.'
        });
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
            await fetch(`${renderLink}cart/${userId}`, {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            location.reload();
          } catch (error) {
            console.error('Unable to delete item from cart:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Unable to delete item from cart. Please try again later.'
            });
          }
          break;
        }
      }
    },
    async signOut({ commit }) {
      try {
        commit('setSignedUser', null);
        commit('setIsLoggedIn', false);

        document.cookie = 'webtoken=; expires=Fri, 06 Jul 2001 00:00:00 UTC; path=/;';
        document.cookie = 'user=; expires=Fri, 06 Jul 2001 00:00:00 UTC; path=/;';

        location.href = 'http://localhost:8080'; // Change this URL if needed
      } catch (error) {
        console.error('Error signing out:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error signing out. Please try again later.'
        });
      }
    }
  },
  modules: {
  }
});
