<template>
    <div>
        <div v-if="item">
            <h2>{{ item[0].prodName }}</h2>
            <p>{{ item[0].prodDescription }}</p>
            <p>Price: {{ item[0].prodPrice }}</p>
            <button @click="addToCart(item[0].prodID)">Add to Cart</button>
        </div>
        <div v-else>
            <p>No product found.</p>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        item() {
            return this.$store.state.item;
        }
    },
    created() {
        let prodID = +this.$route.params.id;
        this.$store.dispatch('fetchItem', prodID);
    },
    methods: {
        addToCart(prodID) {
            this.$store.dispatch('addToCart', prodID)
                .then(() => {
                    console.log('Item added to cart successfully');
                })
                .catch(error => {
                    console.error('Failed to add item to cart:', error);
                });
        }
    }
}
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
