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
        addToCart(prodID) {
            this.$store.dispatch('addToCart', prodID);
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
