<template>
  <div>
    {{ cart }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      // You can initialize any data properties here if needed
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch('fetchCart');
    } catch (error) {
      console.error('Error fetching cart data', error);
    }
  }
};
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
