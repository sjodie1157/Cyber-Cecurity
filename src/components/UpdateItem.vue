<template>
    <div>
        <button type="button" class="btn my-2" data-bs-toggle="modal" :data-bs-target="'#editprodmodal' + item.prodID">
            Edit
        </button>

        <div class="modal fade" :id="'editprodmodal' + item.prodID" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Edit Item</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitEdit">
                            <div class="mb-3">
                                <label for="prodName" class="col-form-label">Item Name:</label>
                                <input type="text" class="form-control" id="prodName" v-model="editInfo.prodName">
                            </div>
                            <div class="mb-3">
                                <label for="prodPrice" class="col-form-label">Item Price:</label>
                                <input type="number" class="form-control" id="prodPrice" v-model="editInfo.prodPrice">
                            </div>
                            <div class="mb-3">
                                <label for="prodDescription" class="col-form-label">Item Description:</label>
                                <textarea type="text" class="form-control" id="prodDescription"
                                    v-model="editInfo.prodDescription"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="prodImg" class="col-form-label">Item Image:</label>
                                <input type="text" class="form-control" id="prodImg" v-model="editInfo.prodImg">
                            </div>
                            <div class="mb-3">
                                <label for="prodCategory" class="col-form-label">Item Category:</label>
                                <input type="text" class="form-control" id="prodCategory"
                                    v-model="editInfo.prodCategory">
                            </div>
                            <div class="mb-3">
                                <label for="prodQuantity" class="col-form-label">Item Quantity:</label>
                                <input type="number" class="form-control" id="prodQuantity"
                                    v-model="editInfo.prodQuantity">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Submit</button>
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
    props: {
        item: Object
    },
    data() {
        return {
            editInfo: {
                prodName: this.item.prodName,
                prodPrice: this.item.prodPrice,
                prodDescription: this.item.prodDescription,
                prodImg: this.item.prodImg,
                prodCategory: this.item.prodCategory,
                prodQuantity: this.item.prodQuantity
            }
        };
    },
    methods: {
        async submitEdit() {
            try {
                await this.$store.dispatch('editItems', { prodID: this.item.prodID, newInfo: this.editInfo });
                location.reload()
            } catch (error) {
                console.error('Error editing item:', error);
            }
        }
    }
};
</script>

<style scoped></style>
