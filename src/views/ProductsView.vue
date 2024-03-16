<template>
    <div>
        <h2>Product Page</h2>

        <div v-if="items">
            <div v-for="item in items" :key="item.prodID">
                {{ item.prodName }}
                {{ item.prodPrice }}
                {{ item.prodDescription }}
                <button @click="addToCart(item.prodID)">Add to cart</button>
            </div>
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
        items() {
            return this.$store.state.items;
        }
    },
    methods: {
        async addToCart(prodID) {
            try {
                await this.$store.dispatch('addToCart', prodID);
                Swal.fire('Success', 'Item has been added to cart', 'success');
            } catch (error) {
                console.error('Error adding item to cart', error);
                Swal.fire('Error', 'Failed to add item to cart', 'error');
            }
        }
    },
    async mounted() {
        try {
            await this.$store.dispatch('fetchItems');
        } catch (error) {
            console.error('Error fetching items', error);
        }
    }
}
</script>

<style scoped></style>
