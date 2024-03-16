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
    async fetchUsers({ commit }) {
      try {
        let res = await fetch(`${renderLink}Users`);
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        commit('setUsers', await res.json());
      } catch (error) {
        console.error('Error fetching users:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch users',
        });
      }
    },
    // Fetch all items
    async fetchItems({ commit }) {
      try {
        let res = await fetch(`${renderLink}Items`);
        if (!res.ok) {
          throw new Error('Failed to fetch items');
        }
        commit('setItems', await res.json());
      } catch (error) {
        console.error('Error fetching items:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch items',
        });
      }
    },
    async editItems({ commit }, { prodID, newInfo }) {
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
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Item has been updated',
        });
      } catch (error) {
        console.error('Error editing item:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to edit item',
        });
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
    async addItem(context, newItemData) {
      try {
        const response = await fetch(`${renderLink}items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newItemData)
        });

        if (response.ok) {
          await context.dispatch('fetchItems');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Item has been added',
          });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add item');
        }
      } catch (error) {
        console.error('Error adding item', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add item',
        });
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch cart',
        });
      }
    },
    // Add a user
    async addUser(context, userData) {
      try {
        const response = await fetch(`${renderLink}Users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User has been added successfully',
          });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add user');
        }
      } catch (error) {
        console.error('Error adding user', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add user',
        });
      }
    },
    // Edit User
    async editUser(context, { userID, newInfo }) {
      try {
        await fetch(`https://cyber-cecurity-1.onrender.com/users/${userID}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newInfo)
        });
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User information has been updated',
        });
      } catch (error) {
        console.error('Error editing user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to edit user',
        });
        throw new Error('Failed to edit user');
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
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Item has been added to cart',
          });
        } catch (error) {
          console.error('Error adding product to cart:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to add item to cart',
          });
        }
      } else {
        console.error('User ID not found. Unable to add product to cart.');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User ID not found. Unable to add product to cart.',
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
            const res = await fetch(`${renderLink}cart/${userId}`, {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            location.reload();
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Item has been removed from cart',
            });
          } catch (error) {
            console.error('Unable to delete item from cart:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Unable to delete item from cart',
            });
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
        location.href = 'http://localhost:8080';
      } catch (error) {
        console.error('Error signing out:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error signing out',
        });
        throw error;
      }
    }
  },
  modules: {
  }
});
