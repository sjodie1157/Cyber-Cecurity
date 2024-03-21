<template>
    <div class="card-container">
        <div class="card m-3" v-for="item in items" :key="item.prodID">
            <div class="row g-0">
                <div class="col-md-4 d-flex">
                    <img :src="item.prodImg" class="img-fluid rounded-start" alt="prodImg">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.prodName }}</h5>
                        <p class="card-text">{{ item.prodDescription }}
                        </p>
                        <div class="col d-flex align-items-end">
                            <button @click="addToCart(item.prodID)">Add</button>
                            <router-link :to="'/product/' + item.prodID">
                                <button type="button" class="btn btn-secondary">Details</button>
                            </router-link>
                        </div>
                    </div>
                </div>
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
        },
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

<style scoped>
.card-container {
    max-height: 75%;
    overflow-y: auto;
}

img[alt="prodImg"] {
    width: 250px;
}
</style>
