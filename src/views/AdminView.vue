<template>
    <div class="container-fluid">
        <!-- Users Table -->
        <h1>Users</h1>
        <AddUserComp />
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.userID">
                        <td>{{ user.userID }}</td>
                        <td>{{ user.userFirstName }}</td>
                        <td>{{ user.userLastName }}</td>
                        <td>{{ user.userEmail }}</td>
                        <td>{{ user.userGender }}</td>
                        <td>{{ user.userAge }}</td>
                        <td>{{ user.userRole }}</td>
                        <td><button class="btn btn-danger" @click="deleteUser(user.userID)">Delete</button></td>
                        <td>
                            <EditUser :user="user" @editUser="editUser" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Items Table -->
        <h1>Items</h1>
        <!-- Add Item Form -->
        <div class="mb-3">
            <AddItemComp @addItem="addItem" />
        </div>
        <!-- Items table content -->
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.prodID">
                        <td>{{ item.prodID }}</td>
                        <td>{{ item.prodName }}</td>
                        <td>{{ item.prodPrice }}</td>
                        <td>{{ item.prodDescription }}</td>
                        <td>{{ item.prodCategory }}</td>
                        <td>{{ item.prodQuantity }}</td>
                        <td><button class="btn btn-danger" @click="deleteItem(item.prodID)">Delete</button></td>
                        <td>
                            <EditItem :item="item" @editItem="editItem" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import EditItem from "../components/UpdateItem.vue";
import EditUser from "../components/UserUpdate";
import AddItemComp from "@/components/AddItemComp.vue";
import AddUserComp from "@/components/AddUserComp.vue";
import Swal from 'sweetalert2';

export default {
    components: {
        EditItem,
        AddItemComp,
        AddUserComp,
        EditUser
    },
    data() {
        return {};
    },
    computed: {
        users() {
            return this.$store.state.users
        },
        items() {
            return this.$store.state.items
        }
    },
    methods: {
        async deleteUser(userID) {
            try {
                await fetch(`https://cyber-cecurity-1.onrender.com/users/${userID}`, {
                    method: 'DELETE',
                });
                this.$store.dispatch('fetchUsers');
                Swal.fire('Success', 'User has been removed', 'success');
            } catch (error) {
                console.error('Error deleting user', error);
                Swal.fire('Error', 'Failed to delete user', 'error');
            }
        },
        async editItem(updatedItem) {
            try {
                await this.$store.dispatch('editItems', { prodID: updatedItem.prodID, newInfo: updatedItem });
                Swal.fire('Success', 'Item has been updated', 'success');
            } catch (error) {
                console.error('Error editing item', error);
                Swal.fire('Error', 'Failed to update item', 'error');
            }
        },
        async editUser(updatedUser) {
            try {
                await this.$store.dispatch('editUser', { userID: updatedUser.userID, newInfo: updatedUser });
                Swal.fire('Success', 'User has been updated', 'success');
            } catch (error) {
                console.error('Error editing user', error);
                Swal.fire('Error', 'Failed to update user', 'error');
            }
        },
        async deleteItem(prodID) {
            try {
                await fetch(`https://cyber-cecurity-1.onrender.com/items/${prodID}`, {
                    method: 'DELETE',
                });
                this.$store.dispatch('fetchItems');
                Swal.fire('Success', 'Item has been removed', 'success');
                location.reload()
            } catch (error) {
                console.error('Error deleting item', error);
                Swal.fire('Error', 'Failed to delete item', 'error');
            }
        }
    },
    async mounted() {
        try {
            await this.$store.dispatch('fetchUsers');
            await this.$store.dispatch('fetchItems');
        } catch (error) {
            console.error('Error fetching home data', error);
        }
    }
}
</script>

<style scoped>
h1 {
    padding: 2em 0 0 0;
}

.container-fluid {
    min-height: 100vh;
    background-color: gray;
}
</style>
