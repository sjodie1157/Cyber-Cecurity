<template>
    <div>
        <button type="button" class="btn btn-primary modal-button" data-bs-toggle="modal" data-bs-target="#signupModal"
            id="modalBtn">Add User
        </button>
        <div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <form @submit.prevent="addUser">
                            <h4>Add User</h4>
                            <div class="mb-3">
                                <label for="userFirstName" class="form-label black-text">First Name:</label>
                                <input type="text" class="form-control" id="userFirstName" v-model="user.userFirstName"
                                    required>
                            </div>
                            <div class="mb-3">
                                <label for="userLastName" class="form-label black-text">Last Name:</label>
                                <input type="text" class="form-control" id="userLastName" v-model="user.userLastName"
                                    required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label black-text">Email:</label>
                                <input type="email" class="form-control" id="email" v-model="user.userEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label black-text">Create a Password:</label>
                                <input type="password" class="form-control" id="password" v-model="user.userPass"
                                    required>
                            </div>
                            <button type="submit" class="btn btn-primary modal-button">Submit</button>
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
    data() {
        return {
            user: {
                userFirstName: '',
                userLastName: '',
                userEmail: '',
                userPass: ''
            }
        };
    },
    methods: {
        async addUser() {
            try {
                await this.$store.dispatch('addUser', this.user);
                this.clearInputFields();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'User has been added',
                });
            } catch (error) {
                console.error("Error adding user: " + error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to add user',
                });
            }
        },
        clearInputFields() {
            for (const key in this.user) {
                this.user[key] = '';
            }
        }
    }
};
</script>

<style scoped>
.modal-button {
    background-color: transparent;
    border: none;
    color: white;
    transition: color 0.3s ease;
}

h4 {
    color: white;
}

.modal-body {
    background-color:rgb(0, 173, 239);
    border-radius: .4pc;
}

.black-text {
    color: black !important;
}

#signInBtn {
    background-color: transparent;
}
</style>
