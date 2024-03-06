<template>
    <div>
        {{ cart }}
    </div>
</template>

<script>
    export default {
    data() {
        return {
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
    }
</script>

<style scoped>

</style>