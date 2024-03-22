<template>
    <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
            :data-bs-target="'#editOneUserModal_' + userId" data-bs-whatever="@mdo">Edit Your Account</button>

        <div class="modal fade" :id="'editOneUserModal_' + userId" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- Modal content -->
                    <div class="modal-body">
                        <form @submit.prevent="submitEditUser">
                            <h1>Edit Your Account</h1>
                            <div class="mb-3">
                                <label for="Email" class="col-form-label">Email:</label>
                                <input type="email" class="form-control" id="prodName" v-model="userEmail">
                            </div>
                            <div class="mb-3">
                                <label for="First Name" class="col-form-label">First Name:</label>
                                <input type="text" class="form-control" id="firstName" v-model="userFirstName">
                            </div>
                            <div class="mb-3">
                                <label for="Last Name" class="col-form-label">Surname:</label>
                                <input type="text" class="form-control" id="lastName" v-model="userLastName">
                            </div>
                            <div class="mb-3">
                                <label for="user image" class="col-form-label">User Image:</label>
                                <input type="text" class="form-control" id="userImg" v-model="userImg">
                            </div>
                            <div class="mb-3">
                                <label for="user pass" class="col-form-label">Password:</label>
                                <input type="password" class="form-control" id="userPass" v-model="userPass">
                            </div>
                            <div class="mb-3">
                                <label for="gender" class="col-form-label">Gender:</label>
                                <select class="form-select" v-model="userGender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="age" class="col-form-label">Age:</label>
                                <input type="number" class="form-control" id="age" v-model="userAge">
                            </div>
                            <button type="submit" class="d-flex justify-content-center" id="sub">Submit changes</button>
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
            userInfo: {
                userEmail: '',
                userFirstName: '',
                userLastName: '',
                userImg: '',
                userPass: '',
                userGender: '',
                userAge: '',
                userRole: ''
            },
            userId: null
        };
    },
    mounted() {
        this.userId = this.getUserIdFromCookie('user');
    },
    methods: {
        getUserIdFromCookie() {
            const cookies = document.cookie.split(';').map(cookie => cookie.trim());
            let userId;
            for (const cookie of cookies) {
                const [name, value] = cookie.split('=');
                if (name.trim() === 'user') {
                    const user = JSON.parse(decodeURIComponent(value));
                    userId = user.userID;
                    break;
                }
            }
            return userId;
        },
        async submitEditUser() {
            try {
                await this.$store.dispatch('editUser', {
                    userID: this.userId,
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
button {
    display: flex;
    justify-content: start;
    background-color: transparent;
    color: black;
    border: none;
    padding: 3px;
    margin: 1em 0 1em 0 ;
}

button:hover {
    background-color: transparent;
    color: black;
}

button:active {
    background-color: transparent;
    box-shadow: none;
    color: black;
}

.modal-body , select{
    background-color: rgb(0, 173, 239);
    color: white;
    border-radius: .4pc;
}

input , h1{
    background-color: transparent;
    color: white;
    cursor: none;
}

input:focus {
    outline: none;
    background-color: rgb(0, 173, 239);
    cursor: none;
}

#sub {
    color: white;
}
</style>
