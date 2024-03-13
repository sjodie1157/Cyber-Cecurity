<template>
    <div>
        <nav class="navbar bg-body-trasnparent fixed-top" :class="{ 'bg-white': isScrolled }">
            <div class="container-fluid">
                <div class="col">
                    <button class="navbar-toggler text-white" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation">
                        <h6 :class="{ 'black-text': isScrolled }"><i class="bi bi-list"> </i> Pages</h6>
                    </button>
                </div>
                <div class="col">
                    <h1 :class="{ 'black-text': isScrolled }"><span>Cy</span>ber <span>Secu</span>rity</h1>
                </div>
                <div class="col">
                    <span class="d-flex ms-auto justify-content-end align-items-center"
                        v-if="$cookies.isKey('webtoken') && $cookies.isKey('user')">
                        <div class="col-5">
                            <h5 class="d-flex justify-content-end" :class="{ 'black-text': isScrolled }">{{
            userloggedinName }}</h5>
                        </div>
                        <div class="col-6 w-auto d-flex justify-content-end">
                            <img :src="userImage || ''" alt="loggedInUser"
                                v-if="userImage !== null && userImage !== undefined">
                            <div v-else>
                                <h3 :class="{ 'black-text': isScrolled }">{{ userloggedinName.charAt(0) }}</h3>
                            </div>
                        </div>
                        <div class="col-6 w-auto d-flex justify-content-end">
                            <button @click="signOut" :class="{ 'black-text': isScrolled }">Sign Out</button>
                        </div>
                    </span>
                    <span class="d-flex justify-content-end" v-else>
                        <LogInModal />
                        <SignupComp />
                    </span>
                </div>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
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
                                <router-link class="nav-link" to="/admin">Admin</router-link>
                            </li>
                            <li class="nav-item"
                                v-if="$cookies.isKey('webtoken') && $cookies.isKey('user') && !isAdmin && !isWorker">
                                <router-link class="nav-link" to="/cart">Cart</router-link>
                            </li>
                            <li class="nav-item" v-if="!isAdmin && !isWorker">
                                <router-link class="nav-link" to="/contact">Contact</router-link>
                            </li>
                        </ul>
                    </div>
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

span {
    color: rgb(0, 89, 255);
}

.black-text {
    color: black !important;
    transition: all 0.3s;
}

.nav-item .nav-link {
    position: relative;
    transition: all .3s;
    color: black;
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
    color: black;
    background-color: rgba(1, 1, 210, 0.529);
}

img[alt="loggedInUser"] {
    width: 35px;
    height: 35px;
    margin: 0 2em;
    border-radius: 10pc;
}


button {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: white;
    border-radius: .4pc;
    border: none;
    background-color: transparent;
    padding: .3rem;
    transition: all .3s;
}

h1 {
    color: white;
}

h5 {
    color: white;
    margin-bottom: 0;
}

button:hover {
    background-color: rgb(0, 89, 255);
}

button.navbar-toggler {
    border: none;
}

button.navbar-toggler:focus {
    box-shadow: none;
}

div.v-else button {
    border: none;
}

h6 {
    background-color: transparent;
    border-radius: .4pc;
    font-size: 20px;
    padding: 5px;
    transition: all .5s;
    margin: 0;
}

h6:hover {
    background-color: rgb(0, 89, 255);
}
</style>
