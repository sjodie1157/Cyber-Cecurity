<template>
    <div>
        <button type="button" class="btn btn-primary modal-button" data-bs-toggle="modal" data-bs-target="#SignIn"
            id="signInBtn" :class="{ 'black-text': isScrolled }">
            login
        </button>

        <div class="modal fade" id="SignIn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Sign In</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="signIn">
                            <div class="mb-3">
                                <label for="email" class="col-form-label">Email:</label>
                                <input v-model="userEmail" type="email" class="form-control" id="email" required />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="col-form-label">Password:</label>
                                <input v-model="userPass" type="password" class="form-control" id="password" required />
                            </div>
                            <button type="submit" class="btn btn-primary modal-button">Sign In</button>
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
            userEmail: "",
            userPass: "",
            isScrolled: false
        };
    },
    methods: {
        async signIn() {
            try {
                if (this.userEmail.trim() === "" || this.userPass.trim() === "") {
                    alert("Email and password cannot be blank");
                }
                await this.$store.dispatch("signIn", {
                    userEmail: this.userEmail,
                    userPass: this.userPass
                });
            } catch (error) {
                console.error("Error signing in:", error);
                if (error.response && error.response.status === 404) {
                    alert("User not found. Please check your credentials and try again.");
                } else {
                    alert("Error signing in. Please try again.");
                }
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

.black-text {
    color: blue !important;
}
</style>
