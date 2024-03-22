import { createStore } from 'vuex';
import Swal from 'sweetalert2';
import ApplyToken from '@/middleware/ApplyToken.js';
const renderLink = 'https://cyber-cecurity-1.onrender.com/';

export default createStore({
  state: {
    users: null,
    items: null,
    item: null,
    cart: null,
    signedUser: '',
    isLoggedIn: false,
    token: ''
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
    setItem(state, value) {
      state.item = value;
    },
    setCart(state, value) {
      state.cart = value;
    },
    setSignedUser(state, user) {
      state.signedUser = user;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    // User Config
    // Fetch all users
    async fetchUsers({ commit, state }) {
      try {
        const token = document.cookie.split(';').find(cookie => cookie.startsWith('webtoken='))?.split('=')[1]
        if (!token) {
          throw new Error('Token not found');
        }

        const res = await fetch(`${renderLink}User`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include'
        });

        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }

        const usersData = await res.json();
        commit('setUsers', usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch users',
        });
      }
    },
    async fetchSingleUsers({ commit, state }) {
      try {
        const token = document.cookie.split(';').find(cookie => cookie.startsWith('webtoken='))?.split('=')[1]
        if (!token) {
          throw new Error('Token not found');
        }

        const res = await fetch(`${renderLink}User/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include'
        });

        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }

        const usersData = await res.json();
        commit('setUsers', usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch users',
        });
      }
    },
    // Sign the user in
    async signIn({ commit }, { userEmail, userPass }) {
      try {
        // Show loading spinner while the request is being processed
        Swal.fire({
          title: 'Logging in...',
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          }
        });

        let res = await fetch(`${renderLink}login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ userEmail, userPass })
        });

        if (!res.ok) {
          // If the response status is not okay, handle the error
          throw new Error('Incorrect Username or Password');
        }

        let { token, user } = await res.json();

        if (token !== undefined) {
          // Set the token in the appropriate place
          ApplyToken.applyToken(token);
          // Store token in local storage or cookies as needed
          document.cookie = `webtoken=${token};`;
        } else {
          // Hide loading spinner and show login failed alert
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Incorrect login details',
          });
          return;
        }

        if (user !== undefined) {
          // Store user details in local storage or cookies as needed
          const userCookie = {
            userID: user.userID,
            userFirstName: user.userFirstName,
            userRole: user.userRole,
            userImg: user.userImg
          };
          document.cookie = `user=${JSON.stringify(userCookie)};`;
        }

        // Hide loading spinner and update UI after successful login
        Swal.close();
        commit('setSignedUser', user);
        commit('setIsLoggedIn', true);
        location.reload();
      } catch (error) {
        // Hide loading spinner and show error alert
        Swal.close();
        console.error('Error signing in:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to login. Please try again later.',
        });
      }
    },
    async fetchItem({ commit }, prodID) {
      try {
        const token = document.cookie.split(';').find(cookie => cookie.startsWith('webtoken='))?.split('=')[1];
        if (!token) {
          throw new Error('Token not found');
        }

        const res = await fetch(`${renderLink}Items/${prodID}`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include'
        });

        if (!res.ok) {
          throw new Error('Failed to fetch item details');
        }

        const itemData = await res.json();
        commit('setItem', itemData);
      } catch (error) {
        console.error('Error fetching item:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch item details',
        });
      }
    },

    // Item Config
    // Fetch all items
    async fetchItems({ commit }) {
      try {
        const token = document.cookie.split(';').find(cookie => cookie.startsWith('webtoken='))?.split('=')[1]

        let res = await fetch(`${renderLink}Items`, {

          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include'
        });
        if (!res.ok) {
          throw new Error('Failed to fetch items');
        } else {
          commit('setItems', await res.json());
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch items',
        });
      }
    },

    // Edit an item
    async editItems({ commit }, { prodID, newInfo }) {
      try {
        const token = document.cookie.split(';').find(cookie => cookie.startsWith('webtoken='))?.split('=')[1]
        const res = await fetch(`${renderLink}items/${prodID}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newInfo)
        });
        setTimeout(() => {
          location.reload()
        }, 1000);
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
    }
    ,
    // Add an item
    async addItem(context, newItemData) {
      try {
        const token = document.cookie.split(';').find(cookie => cookie.startsWith('webtoken='))?.split('=')[1]
        const response = await fetch(`${renderLink}items`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
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



    // Cart config
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
        let res = await fetch(`${renderLink}Cart/${userId}`, {
          credentials: 'include',
        });
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
        const token = document.cookie.split(';').find(cookie => cookie.startsWith('webtoken='))?.split('=')[1]
        const response = await fetch(`${renderLink}register`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        setTimeout(() => {
          location.reload()
        }, 1000);
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
    async editUser(context, { userID, newUserInfo }) {
      try {
        const token = document.cookie.split(';').find(cookie => cookie.startsWith('webtoken='))?.split('=')[1]
        await fetch(`https://cyber-cecurity-1.onrender.com/user/${userID}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUserInfo)
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
    async editUserLoggedIn(context, { newUserInfo }) {
      try {
        const token = document.cookie.split(';').find(cookie => cookie.startsWith('webtoken='))?.split('=')[1]
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

        await fetch(`https://cyber-cecurity-1.onrender.com/user/${userId}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUserInfo)
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
          text: 'Failed to edit Your',
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
          const token = document.cookie.split(';').find(cookie => cookie.startsWith('webtoken='))?.split('=')[1]
          const res = await fetch(`${renderLink}cart/${userId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              Authorization: `Bearer ${token}`,
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
    async clearCart(context, params) {
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
            const token = document.cookie.split(';').find(cookie => cookie.startsWith('webtoken='))?.split('=')[1]
            const res = await fetch(`${renderLink}cart/Clear/${userId}`, {
              method: "DELETE",
              credentials: 'include',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Thanks for your purchase',
            });
          } catch (error) {
            console.error('Unable to clear cart:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Unable to clear cart',
            });
          }
          break;
        }
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
            const token = document.cookie.split(';').find(cookie => cookie.startsWith('webtoken='))?.split('=')[1]
            const res = await fetch(`${renderLink}cart/${userId}`, {
              method: "DELETE",
              credentials: 'include',
              headers: {
                Authorization: `Bearer ${token}`,
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
        location.href = 'https://cyber-security-d812a.web.app';
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
