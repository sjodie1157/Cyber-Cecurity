<template>
    <h1>
        Cart Page
    </h1>
    <h4>
        Still need to finish design
    </h4>
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

<style scoped></style>
