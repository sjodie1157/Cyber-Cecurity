<template>
    <div class="card mb-3" v-for="item in filteredItems" :key="item.prodID">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="item.prodImg" class="img-fluid rounded-start" alt="prodImg" loading="eager">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">
                        <slot name="itemName" :item="item">{{ item.prodName }}</slot>
                    </h5>
                    <p class="card-text">
                        <slot name="itemDescription" :item="item">{{ item.prodDescription }}</slot>
                    </p>
                    <p class="card-text">
                        <slot name="itemPrice" :item="item">R {{ item.prodPrice }}</slot>
                    </p>
                    <div class="d-flex justify-content-end">
                        <button @click="addToCart(item.prodID)" class="btn mx-2">Add</button>
                        <router-link :to="'/product/' + item.prodID">
                            <button type="button" class="btn mx-2">Details</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    props: {
        filteredItems: Array
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
    }
}
</script>

<style scoped>
img[alt="prodImg"] {
    width: 180px;
}

.card-body {
    background: black;
    color: white;
    border-bottom-left-radius: .3pc ;
    border-bottom-right-radius: .3pc ;
    border-top-right-radius: .3pc ;
    border-top-left-radius: .3pc ;
}

.card {
     border: 2px solid rgb(0, 173, 239);
}

.btn {
    background-color: black;
    color: white;
    border: 1px solid white;
    border-radius: 0;
    transition: all .3s;
}

.btn:hover {
    background-color:white;
    color: black;
    border: 1px solid white;
    border-radius: 0;
}
</style>
