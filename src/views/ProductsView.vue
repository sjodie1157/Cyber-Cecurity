<template>
    <div>
        <div class="container-fluid">
            <h1>Items</h1>
            <div v-if="items">
                <div class="row">
                    <div class="col-lg-2 order-lg-1">
                        <div class="d-lg-flex flex-lg-column justify-content-lg-start justify-content-sm-center">
                            <div class="mx-2">
                                <button class="m-2" @click="sortByName">Sort By Name</button>
                                <button class="m-2" @click="sortByPrice">Sort By Price</button>
                                <button class="m-2" @click="filterByCategory(null)">All Categories</button>
                                <form class="m-2" role="search">
                                    <input class="form-control me-2" placeholder="Search" type="search" name="search"
                                        aria-label="search" v-model="searchQ" @keyup="search">
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-10 order-lg-2">
                        <CardComp :filteredItems="filteredItems">
                            <template #itemName="{ item }">
                                {{ item.prodName }}
                            </template>
                            <template #itemDescription="{ item }">
                                {{ item.prodDescription }}
                            </template>
                            <template #itemPrice="{ item }">
                                R {{ item.prodPrice }}
                            </template>
                        </CardComp>
                        <div v-if="filteredItems.length === 0">
                            <h1 class="NoItems">No Items Found</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <SpinerComp/>
            </div>
        </div>
    </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';
import SpinerComp from '../components/SpinnerComp'

export default {
    components: {
        CardComp,
        SpinerComp
    },
    computed: {
        items() {
            return this.$store.state.items;
        },
        sortedItems() {
            if (this.items) {
                return this.items.slice().sort((a, b) => {
                    if (this.sortBy === 'name') {
                        return this.sortDirection === 'asc' ? a.prodName.localeCompare(b.prodName) : b.prodName.localeCompare(a.prodName);
                    }
                    if (this.sortBy === 'price') {
                        return this.sortDirection === 'asc' ? a.prodPrice - b.prodPrice : b.prodPrice - a.prodPrice;
                    }
                    return 0;
                });
            } else {
                return [];
            }
        },
        filteredItems() {
            if (!this.searchQ && !this.currentCategory) {
                return this.sortedItems;
            } else {
                const lowerCaseQ = this.searchQ.toLowerCase();
                return this.sortedItems.filter(product => {
                    const matchesSearch = !this.searchQ || product.prodName.toLowerCase().includes(lowerCaseQ);
                    const matchesCategory = !this.currentCategory || product.category === this.currentCategory;
                    return matchesSearch && matchesCategory;
                });
            }
        }
    },
    data() {
        return {
            sortBy: null,
            sortDirection: 'asc',
            searchQ: '',
            currentCategory: null,
            categories: [] 
        };
    },
    methods: {
        sortByName() {
            this.sortBy = 'name';
            this.toggleSortDirection();
        },
        sortByPrice() {
            this.sortBy = 'price';
            this.toggleSortDirection();
        },
        toggleSortDirection() {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        },
        filterByCategory(category) {
            this.currentCategory = category;
        },
        getUniqueCategories() {
            if (this.items) {
                const categories = new Set();
                this.items.forEach(item => {
                    categories.add(item.category);
                });
                this.categories = Array.from(categories);
            }
        },
        search() {

        }
    },
    mounted() {
        try {
            setTimeout(() => {
                this.$store.dispatch('fetchItems').then(() => {
                    this.getUniqueCategories(); 
                }).catch(error => {
                    console.error('Error fetching items:', error);
                });
            }, 800);
        } catch (error) {
            console.error('No connection available');
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

button {
    background-color: rgb(0, 173, 239);
    color: white;
    border-radius: .4pc;
    padding: 2px;
    border: 2px solid rgb(0, 173, 239);
}

.NoItems {
    margin: 3.5em 0 ;
}
</style>
