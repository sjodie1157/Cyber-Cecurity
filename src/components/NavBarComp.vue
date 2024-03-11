<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/about">About</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/products">Products</router-link>
                        </li>
                        <li class="nav-item" v-if="isWorker">
                            <router-link class="nav-link" to="/inventory">Inventory</router-link>
                        </li>
                        <li class="nav-item" v-if="isAdmin">
                            <router-link class="nav-link" to="/admin">admin</router-link>
                        </li>
                        <li class="nav-item"
                            v-if="$cookies.isKey('webtoken') && $cookies.isKey('user') && !isAdmin && !isWorker">
                            <router-link class="nav-link" to="/cart">Cart</router-link>
                        </li>
                        <li class="nav-item" v-if="!isAdmin && !isWorker">
                            <router-link class="nav-link" to="/contact">Contact</router-link>
                        </li>
                    </ul>
                    <span class="d-flex ms-auto" v-if="$cookies.isKey('webtoken') && $cookies.isKey('user')">
                        <h4>{{ userloggedinName }}</h4>
                        <img :src="userImage || ''" alt="loggedInUser"
                            v-if="userImage !== null && userImage !== undefined">
                        <div v-else>
                            <h5>{{ userloggedinName.charAt(0) }}</h5>
                        </div>
                        <button @click="signOut">Sign Out</button>
                    </span>
                    <span class="d-flex ms-auto" v-else>
                        <LogInModal />
                        <SignupComp />
                    </span>
                </div>
            </div>
        </nav>
    </div>
    <router-view />
</template>

<script>
import LogInModal from './LogInModal.vue';
import SignupComp from './SignupComp.vue';


export default {
    components: {
        LogInModal,
        SignupComp
    },
    computed: {
        cookieValidation() {
            if ($cookies.isKey('webtoken') === undefined || $cookies.isKey('user') === undefined) {
                this.signOut();
            }
        },
        isAdmin() {
            let userData = this.$cookies.get("user");
            return userData && userData.userRole === "Admin";
        },
        isWorker() {
            let userData = this.$cookies.get("user");
            return userData && userData.userRole === "Worker";
        },
        userloggedinName() {
            let userData = this.$cookies.get("user");
            return userData && userData.userFirstName;
        },
        userImage() {
            let userData = this.$cookies.get("user");
            return userData && userData.userImg;
        }
    },

    methods: {
        async signOut() {
            try {
                await this.$store.dispatch('signOut');
            } catch (error) {
                alert('Error signing out:', error);
            }
        },
        deleteCookies() {
            this.$cookies.remove('webtoken');
            this.$cookies.remove('user');
        }
    }
}
</script>

<style scoped>
.nav-item .nav-link {
    position: relative;
    transition: all .3s;
}

.nav-item .nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: blue;
    visibility: hidden;
}

.nav-item,
.nav-link:hover::before {
    visibility: visible;
}

nav a.router-link-active {
    color: white;
    background-color: blue;
}

img[alt="loggedInUser"] {
    width: 35px;
    height: 35px;
    margin: 0 2em;
    border-radius: 10pc;
}

h5 {
    margin: 0 1em;
    width: 25px;
    height: 25px;
    border-radius: 15pc;
    display: flex;
    justify-content: center;
    background-color: aqua;

}
</style>
