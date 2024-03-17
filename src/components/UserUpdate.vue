<template>
    <div>
        <button type="button" class="btn my-2" data-bs-toggle="modal" :data-bs-target="'#editusermodal'">
            Edit
        </button>
        <div class="modal fade" :id="'editusermodal'" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="editUser">
                            <div class="mb-3">
                                <label for="username" class="form-label">New Username:</label>
                                <!-- <input type="text" class="form-control" id="username" v-model="user.userFirstName"> -->
                            </div>
                            <div class="comtainer">
                                <div class="col">
                                    <button type="submit" class="btn btn-primary">Save Changes</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-danger" @click="deleteUser">Delete Your
                                        Account</button>
                                </div>
                            </div>
                        </form>
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
        user: Object
    },
    methods: {
        async editUser() {
            try {
                const response = await fetch(`https://cyber-cecurity-1.onrender.com/users/${this.user.userID}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userFirstName: this.user.userFirstName })
                });
                if (response.ok) {
                    this.refresh();
                    Swal.fire('Success', 'User has been updated', 'success');
                } else {
                    console.error('Error editing user:', response.statusText);
                    Swal.fire('Error', 'Failed to update user', 'error');
                }
            } catch (error) {
                console.error('Error editing user:', error);
                Swal.fire('Error', 'Failed to update user', 'error');
            }
        },
        refresh() {
            setTimeout(() => {
                location.reload();
            }, 300);
        },
        async deleteUser() {
            try {
                const userData = this.$cookies.get("user");
                if (userData && userData.userID) {
                    const userID = userData.userID;
                    const response = await fetch(`https://cyber-cecurity-1.onrender.com/user/${userID}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {

                        this.$cookies.remove("user");
                        this.$cookies.remove("webtoken");

                        location.href = 'http://localhost:8080';

                        Swal.fire('Success', 'User has been deleted', 'success');
                    } else {
                        console.error('Error deleting user:', response.statusText);
                        Swal.fire('Error', 'Failed to delete user', 'error');
                    }
                } else {
                    console.error('Error: User data or userID not found in cookie.');
                    Swal.fire('Error', 'Failed to delete user', 'error');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                Swal.fire('Error', 'Failed to delete user', 'error');
            }
        },
        deleteCookies() {
            this.$cookies.remove('webtoken');
            this.$cookies.remove('user');
        },
    }
};
</script>
