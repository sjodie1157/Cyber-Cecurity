<template>
  <div class="home" v-if="users">
    {{ users }}
  </div>
  <div v-else>
    <h1>
      Try again
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    users() {
      return this.$store.state.users
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch('fetchUsers');
    } catch (error) {
      console.error('Error fetching home data', error);
    }
  }
};
</script>
