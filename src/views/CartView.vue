<template>
    <div v-if="cart">
        <div v-for="item in cart" :key="item.prodID">
            {{ item.prodName }}
            {{ item.prodID }}
            {{ item.totalQuantity }}
            <button @click="removeFromCart(item.prodID)">delete item</button>
        </div>
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
    methods: {
        removeFromCart(prodID) {
            this.$store.dispatch('removeFromCart', prodID);
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