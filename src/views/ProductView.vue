<template>
    <div class="container-fluid" v-if="item">
        <div>
            <div class="col d-flex justify-content-lg-between" id="banner">
                <div class="row justify-content-center w-100">
                    <div class="col-lg-6">
                        <img :src="item[0].prodImg" alt="prodimg" class="img-fluid">
                    </div>
                    <div class="col-lg-6">
                        <h2 class="text-white my-2 d-lg-flex">{{ item[0].prodName }}</h2>
                        <h3 class="text-white d-lg-flex">{{ item[0].prodPrice }}</h3>
                        <button @click="addToCart(item[0].prodID)" class="btn btn-dark mt-4 d-lg-flex">Add to
                            Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="container-fluid">
            <SpinnerComp />
        </div>
    </div>
    <div class="container-fluid d-lg-flex ">
        <div class="col" v-if="item">
            <div id="carouselExampleIndicators" class="carousel slide">
                <div class="carousel-indicators d-flex flex-column">
                    <img type="button" data-bs-target="#carouselExampleIndicators" :src="item[0].prodImg"
                        data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1" alt="sub">
                    </img>
                    <img type="button" data-bs-target="#carouselExampleIndicators"
                        src="https://i.postimg.cc/ZRkyK5Lb/landscape-placeholder.png" data-bs-slide-to="0"
                        class="active" aria-current="true" aria-label="Slide 2" alt="sub">
                    </img>
                    <img type="button" data-bs-target="#carouselExampleIndicators"
                        src="https://i.postimg.cc/ZRkyK5Lb/landscape-placeholder.png" data-bs-slide-to="0"
                        class="active" aria-current="true" aria-label="Slide 3" alt="sub">
                    </img>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img :src="item[0].prodImg" alt="main">
                    </div>
                </div>
            </div>
        </div>
        <div class="col py-4 d-flex flex-column justify-content-between">
            <h3 class="text-white d-lg-flex">{{ item[0].prodName }}</h3>
            <h5 class="text-white d-lg-flex">{{ item[0].prodDescription }}</h5>
            <div class="input d-flex justify-content-lg-start justify-content-sm-center">
                <h5 class="text-white d-lg-flex me-3">Quantity</h5>
                <input type="number" id="quantity">
            </div>
        </div>
    </div>
</template>

<script>
import SpinnerComp from '../components/SpinnerComp.vue'
export default {
    components: {
        SpinnerComp
    },
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
.container-fluid {
    background-color: black;
    padding: 7px auto;
}

#quantity {
    width: 25px;
    height: 25px;
}

#banner {
    height: auto;
    padding: 5em;
}

img[alt="prodimg"] {
    width: 250px;
}

.btn {
    background-color: black;
    color: white;
    border: 1px solid white;
    border-radius: 0;
    transition: all .3s;
}

.btn:hover {
    background-color: white;
    color: black;
    border: 1px solid white;
    border-radius: 0;
}

.container-fluid:nth-child(1) {
    padding: 4em 0;
    background-color: rgb(53, 53, 53);
}

.container-fluid:nth-child(3) {
    background-color: rgb(53, 53, 53);
}

img[alt="main"] {
    width: 400px;
}

img[alt="sub"] {
    width: 65px;
    height: 65px;
}
</style>
