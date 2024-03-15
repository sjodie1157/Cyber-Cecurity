<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addprodmodal"
            data-bs-whatever="@mdo">Add Item</button>

        <!-- Modal -->
        <div class="modal fade" id="addprodmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Add an Item</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="addProduct">
                            <div class="mb-3">
                                <label for="prodName" class="col-form-label">Item Name:</label>
                                <input type="text" class="form-control" id="prodName" v-model="newProduct.prodName">
                            </div>
                            <div class="mb-3">
                                <label for="quantity" class="col-form-label">Quantity:</label>
                                <input type="text" class="form-control" id="quantity" v-model="newProduct.prodQuantity">
                            </div>
                            <div class="mb-3">
                                <label for="price" class="col-form-label">Price:</label>
                                <input type="number" class="form-control" id="price" v-model="newProduct.prodPrice">
                            </div>
                            <div class="mb-3">
                                <label for="category" class="col-form-label">Category:</label>
                                <input type="text" class="form-control" id="category" v-model="newProduct.prodCategory">
                            </div>
                            <div class="mb-3">
                                <label for="prodDesc" class="col-form-label">Product Description:</label>
                                <textarea class="form-control" id="prodDesc"
                                    v-model="newProduct.prodDescription"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="imgUrl" class="col-form-label">Image URL:</label>
                                <input type="text" class="form-control" id="imgUrl" v-model="newProduct.prodImg">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                    @click="closeModal">Close</button>
                                <button type="submit" class="btn btn-primary" @click="addItem">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newProduct: {
                prodName: '',
                prodQuantity: '',
                prodPrice: '',
                prodCategory: '',
                prodDescription: '',
                prodImg: ''
            }
        };
    },
    methods: {
        async addItem() {
            try {
                const timestamp = Date.now();
                this.newProduct.prodID = timestamp;
                await this.$store.dispatch('addItem', this.newProduct);
                this.clearInputFields();
                this.closeModal();
            } catch (error) {
                console.error("Error adding product:", error);
            }
        },
        clearInputFields() {
            for (const key in this.newProduct) {
                this.newProduct[key] = '';
            }
        },
        closeModal() {
            setTimeout(() => {
                // location.reload();
            }, 1000);
        }
    }
}
</script>

<style scoped>

</style>