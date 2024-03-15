<template>
    <div>
        <button type="button" class="btn btn-primary modal-button" data-bs-toggle="modal" data-bs-target="#signupModal"
            id="modalBtn" :class="{ 'black-text': isScrolled }">
            Sign Up <i class="bi bi-person-plus-fill"></i>
        </button>
        <div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <form @submit.prevent="addUser">
                            <h4>New Here?</h4>
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
                                <label for="password" class="form-label black-text">Password:</label>
                                <input type="password" class="form-control" id="password" v-model="user.userPass"
                                    required>
                            </div>
                            <button type="submit" class="btn btn-primary modal-button">Sign Up</button>
                        </form>
                        <button type="button" class="btn btn-primary modal-button" data-bs-toggle="modal"
                            data-bs-target="#SignIn" id="signInBtn" :class="{ 'black-text': isScrolled }">Already a
                            User? Log In
                        </button>
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
            },
            isScrolled: false
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
                console.error("error adding user :" + error);
            }
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 0;
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
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
    background-color: rgb(0, 89, 255);
    border-radius: .4pc;
}

.black-text {
    color: black !important;
}

#signInBtn {
    background-color: transparent;
}
</style>
