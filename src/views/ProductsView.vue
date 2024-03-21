<template>
    <div class="container-fluid">
        <h1>Items</h1>
        <input type="search" placeholder="Search for an Item" id="SearchBar">
        <div class="row">
            <div class="col-md-3 col-sm-12 mb-4">
                <h3>Filter By</h3>
                <div class="col d-lg-flex flex-lg-column">
                    <button class="btn btn-primary m-2">Category</button>
                    <button class="btn btn-primary m-2">Price</button>
                    <button class="btn btn-primary m-2">Name</button>
                </div>
            </div>
            <div class="col-md-9 col-sm-12">
                <CardComp :items="items" />
            </div>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2';
import CardComp from '../components/CardComp.vue'

export default {
    components: {
        CardComp
    },
    data() {
        return {};
    },
    computed: {
        items() {
            return this.$store.state.items;
        }
    },
    methods: {
        async mounted() {
            try {
                await this.$store.dispatch('fetchItems');
            } catch (error) {
                console.error('Error fetching items', error);
            }
        }
    }
}
</script>

<style scoped>
h1,
h3 {
    color: white;
    padding: 2em 0 0 0;
}

.container-fluid {
    background-color: rgb(53, 53, 53);
    padding: 7px auto;
}
</style>
