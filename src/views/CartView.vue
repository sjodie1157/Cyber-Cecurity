<template>
    <div class="container-fluid">
    </div>
    <h1>Cart</h1>
    <div class="container">
        <div v-if="cart && cart.length > 0">
            <div class="container" style="height: 400px; overflow-y: auto;">
                <div class="table-responsive">
                    <table class="table table-borderless">
                        <thead class="visually-hidden">
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Total Price</th>
                                <th>Total Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cart" :key="item.prodID">
                                <td class="align-middle"><img :src="item.prodImg" alt="prodImg"
                                        style="max-width: 100px;"></td>
                                <td class="align-middle">{{ item.prodName }}</td>
                                <td class="align-middle">{{ item.totalPrice }}</td>
                                <td class="align-middle">{{ item.totalQuantity }}</td>
                                <td class="align-middle"><button @click="removeFromCart(item.prodID)"
                                        class="btn btn-danger">Remove</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="total">
                <h5>Total Price: R {{ totalPrice }}</h5>
                <button class="p-2" @click="clearCart">Purchase</button>
            </div>
        </div>
        <div v-else class="d-flex justify-content-center">
            <h3>Your cart is empty.</h3>
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
        },
        totalPrice() {
            const total = this.cart.reduce((total, item) => total + (item.totalPrice * item.totalQuantity), 0);
            return total.toFixed(2);
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
    min-height: 10vh;
    background-color: rgb(53, 53, 53);
    padding: 7px auto;
}

img[alt="prodImg"] {
    width: 200px;
    aspect-ratio: 1/.8;
}

.container {
    min-height: 56vh;
}


.table tbody tr {
    border-top: none;
}

button {
    background-color: black;
    color: white;
    border: 1px solid white;
    border-radius: 0;
    transition: all .3s;
}

button:hover {
    background-color: white;
    color: black;
    border: 1px solid white;
    border-radius: 0;
}
</style>
