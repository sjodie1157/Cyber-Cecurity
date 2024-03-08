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
  <div v-if="$cookies.isKey('webtoken') && $cookies.isKey('user') ">
    <div class="col">
      <button @click="signOut">Sign Out</button>
    </div>
  </div>

</template>

<script>
export default {
  computed: {
  },
  methods: {
    async signOut() {
      try {
        await this.$store.dispatch('signOut');
      } catch (error) {
        alert('Error signing out:', error);
      }
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
