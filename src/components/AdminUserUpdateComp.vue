<template>
    <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
            :data-bs-target="'#editOneUserModal' + user.userID" data-bs-whatever="@mdo">Edit</button>

        <div class="modal fade" :id="'editOneUserModal' + user.userID" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit User</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitEditUser">
                            <div class="mb-3">
                                <label for="Email" class="col-form-label">Email:</label>
                                <input type="email" class="form-control" id="prodName" v-model="userInfo.userEmail">
                            </div>
                            <div class="mb-3">
                                <label for="First Name" class="col-form-label">First Name:</label>
                                <input type="text" class="form-control" id="firstName" v-model="userInfo.userFirstName">
                            </div>
                            <div class="mb-3">
                                <label for="Last Name" class="col-form-label">Surname:</label>
                                <input type="text" class="form-control" id="lastName" v-model="userInfo.userLastName">
                            </div>
                            <div class="mb-3">
                                <label for="user image" class="col-form-label">User Image:</label>
                                <input type="text" class="form-control" id="userImg" v-model="userInfo.userImg">
                            </div>
                            <div class="mb-3">
                                <label for="user pass" class="col-form-label">Password:</label>
                                <input type="password" class="form-control" id="userPass" v-model="userInfo.userPass">
                            </div>
                            <div class="mb-3">
                                <label for="gender" class="col-form-label">Gender:</label>
                                <select class="form-select" v-model="userInfo.userGender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="age" class="col-form-label">Age:</label>
                                <input type="number" class="form-control" id="age" v-model="userInfo.userAge">
                            </div>
                            <div class="mb-3">
                                <label class="form-check-label">User Role:</label><br>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="userRoleUser" value="User"
                                        v-model="userInfo.userRole">
                                    <label class="form-check-label" for="userRoleUser">User</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="userRoleAdmin" value="Admin"
                                        v-model="userInfo.userRole">
                                    <label class="form-check-label" for="userRoleAdmin">Admin</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="userRoleWorker" value="Worker"
                                        v-model="userInfo.userRole">
                                    <label class="form-check-label" for="userRoleAdmin">Worker</label>
                                </div>
                            </div>
                            <button class="btn p-1" type="submit">Submit</button>
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
    data() {
        return {
            userInfo: {
                userEmail: this.user.userEmail,
                userFirstName: this.user.userFirstName,
                userLastName: this.user.userLastName,
                userImg: this.user.userImg,
                userPass: '',
                userGender: this.user.userGender,
                userAge: this.user.userAge,
                userRole: this.user.userRole
            }
        };
    },
    methods: {
        async submitEditUser() {
            try {
                await this.$store.dispatch('editUser', {
                    userID: this.user.userID,
                    newUserInfo: this.userInfo
                });
                Swal.fire('Success', 'User information has been updated', 'success');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            } catch (error) {
                console.error('Error editing user:', error);
                Swal.fire('Error', 'Failed to update user', 'error');
            }
        }
    }
}
</script>

<style scoped>
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
</style>
