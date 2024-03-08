<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/products">Products</router-link> |
    <router-link to="/product">single product</router-link> |
    <router-link to="/inventory">Inventory</router-link> |
    <router-link to="/admin">admin</router-link> |
    <router-link to="/cart">Cart</router-link>
  </nav>
  <router-view />
  <div v-if="$cookies.get('webtoken') !== undefined && $cookies.get('user') !== undefined">
    <div class="col">
      <button @click="signOut">Sign Out</button>
    </div>
  </div>
  <div v-else>
  </div>
</template>

<script>
export default {
  computed: {
    cookieValidation() {
      if ($cookies.isKey('webtoken') === undefined || $cookies.isKey('user') === undefined) {
        this.signOut();
      }
    }
  },
  methods: {
    async signOut() {
      try {
        await this.$store.dispatch('signOut');
      } catch (error) {
        alert('Error signing out:', error);
      }
    },
    deleteCookies() {
      this.$cookies.remove('webtoken');
      this.$cookies.remove('user');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
