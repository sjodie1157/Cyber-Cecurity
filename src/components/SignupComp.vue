<template>
    <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signupModal"
            id="modalBtn">
            Sign Up
        </button>
        <div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="signupModalLabel">Sign Up</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="addUser">
                            <div class="mb-3">
                                <label for="userFirstName" class="form-label">First Name:</label>
                                <input type="text" class="form-control" id="userFirstName" v-model="user.userFirstName"
                                    required>
                            </div>
                            <div class="mb-3">
                                <label for="userLastName" class="form-label">Last Name:</label>
                                <input type="text" class="form-control" id="userLastName" v-model="user.userLastName"
                                    required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email:</label>
                                <input type="email" class="form-control" id="email" v-model="user.userEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password:</label>
                                <input type="password" class="form-control" id="password" v-model="user.userPass"
                                    required>
                            </div>
                            <button type="submit" class="btn btn-primary">Sign Up</button>
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
                await fetch(`https://cyber-cecurity-1.onrender.com/Users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.user)
                });

                this.user = {
                    userFirstName: this.userFirstName,
                    userLastName: this.userLastName,
                    userEmail: this.userEmail,
                    userPass: this.userPass
                };

                alert('User has been added')
            } catch (error) {
                console.error("error adding user :" +error);
            }
        },
    }
};
</script>

<style scoped>
#modalBtn {
    background-color: transparent;
    border: none;
    color: black;
}
</style>