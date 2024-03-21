<template>
    <div class="container-fluid">
        <h1>Checkout Page</h1>
    </div>
    <div v-if="cart && cart.length > 0">
        <div v-for="item in cart" :key="item.prodID">
            {{ item.prodName }}
            {{ item.prodID }}
            {{ item.totalQuantity }}
            <button @click="removeFromCart(item.prodID)">Delete Item</button>
        </div>
        <button @click="clearCart">Clear Cart</button>
    </div>
    <div v-else>
        <p>Your cart is empty.</p>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {};
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        }
    },
    methods: {
        async removeFromCart(prodID) {
            try {
                await this.$store.dispatch('removeFromCart', prodID);
                Swal.fire('Success', 'Item has been removed from cart', 'success');
            } catch (error) {
                console.error('Error removing item from cart', error);
                Swal.fire('Error', 'Failed to remove item from cart', 'error');
            }
        },
        async clearCart() {
            try {
                await this.$store.dispatch('clearCart');
                await Swal.fire('Success', 'Thanks For your purchase', 'success');
                location.reload()
            } catch (error) {
                console.error('Error clearing cart', error);
                Swal.fire('Error', 'Failed to clear cart', 'error');
            }
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
.container-fluid {
    min-height: 80vh;
    background-color: rgb(53, 53, 53);
    padding: 7px auto;
}
</style>
