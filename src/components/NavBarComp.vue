<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-transparent fixed-top" :class="{ 'bg-white': isScrolled }">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link" :class="{ 'black-text': isScrolled }"
                                to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :class="{ 'black-text': isScrolled }"
                                to="/about">About</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :class="{ 'black-text': isScrolled }"
                                to="/products">Products</router-link>
                        </li>
                        <li class="nav-item" v-if="isWorker">
                            <router-link class="nav-link" :class="{ 'black-text': isScrolled }"
                                to="/inventory">Inventory</router-link>
                        </li>
                        <li class="nav-item" v-if="isAdmin">
                            <router-link class="nav-link" :class="{ 'black-text': isScrolled }"
                                to="/admin">Admin</router-link>
                        </li>
                        <li class="nav-item"
                            v-if="$cookies.isKey('webtoken') && $cookies.isKey('user') && !isAdmin && !isWorker">
                            <router-link class="nav-link" :class="{ 'black-text': isScrolled }"
                                to="/cart">Cart</router-link>
                        </li>
                        <li class="nav-item" v-if="!isAdmin && !isWorker">
                            <router-link class="nav-link" :class="{ 'black-text': isScrolled }"
                                to="/contact">Contact</router-link>
                        </li>
                    </ul>
                    <span class="d-flex ms-auto align-items-center"
                        v-if="$cookies.isKey('webtoken') && $cookies.isKey('user')">
                        <h4 class="d-flex align-items-center" :class="{ 'black-text': isScrolled }">{{ userloggedinName
                            }}</h4>
                        <img :src="userImage || ''" alt="loggedInUser"
                            v-if="userImage !== null && userImage !== undefined">
                        <div v-else>
                            <h5 :class="{ 'black-text': isScrolled }">{{ userloggedinName.charAt(0) }}</h5>
                        </div>
                        <button @click="signOut" :class="{ 'black-text': isScrolled }">Sign Out</button>
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
    data() {
        return {
            isScrolled: false
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    computed: {
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
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 0;
        },
    }
}
</script>

<style scoped>
.bg-white {
    background-color: rgba(255, 255, 255, 0.59) !important;
    transition: background-color 0.3s ease;
}

.black-text {
    color: white !important;
    transition: color 0.3s ease;
}

.nav-item .nav-link {
    position: relative;
    transition: all .3s;
    color: white;
}

.nav-item .nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: rgba(1, 1, 210, 0.529);
    visibility: hidden;
}

.nav-item,
.nav-link:hover::before {
    visibility: visible;
}

nav a.router-link-active {
    color: white;
    background-color: rgba(1, 1, 210, 0.529);
}

img[alt="loggedInUser"] {
    width: 35px;
    height: 35px;
    margin: 0 2em;
    border-radius: 10pc;
}

h5 {
    margin: 0 1em;
    width: 35px;
    height: 35px;
    border-radius: 15pc;
    display: flex;
    font-weight: 800;
    justify-content: center;
    align-items: center;
    background-color: blue;
    color: white;
}

h4 {
    color: white;
}

button {
    border: solid 2px white;
    color: white;
    border-radius: .4pc;
    background-color: transparent;
    padding: .3rem;
}
</style>
