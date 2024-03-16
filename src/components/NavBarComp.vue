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
                            <button @click="signOut" :class="{ 'black-text': isScrolled }">Sign Out<i
                                    class="bi bi-box-arrow-right"></i></button>
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
                        <h3 class="NavNameIco" v-if="$cookies.isKey('webtoken') && $cookies.isKey('user')">{{
            userloggedinName.charAt(0) }}</h3>
                        <h4 class="offcanvas-title text-center" id="offcanvasNavbarLabel"><span>Cy</span>ber
                            <span>Secu</span>rity
                        </h4>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <router-link class="nav-link me-start" to="/"><i class="bi bi-house-lock"></i>
                                    Home</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/about"><i class="bi bi-diagram-3"></i> About
                                    Us</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/products"><i class="bi bi-basket3"></i>
                                    Products</router-link>
                            </li>
                            <li class="nav-item" v-if="isWorker">
                                <router-link class="nav-link" to="/inventory"><i class="bi bi-pie-chart"></i>
                                    Inventory</router-link>
                            </li>
                            <li class="nav-item" v-if="isAdmin">
                                <router-link class="nav-link" to="/5465351321asdad48w6521a5sd"><i
                                        class="bi bi-database-fill-gear"></i>
                                    Admin</router-link>
                            </li>
                            <li class="nav-item"
                                v-if="$cookies.isKey('webtoken') && $cookies.isKey('user') && !isAdmin && !isWorker">
                                <router-link class="nav-link" to="/cart"><i class="bi bi-cart3"></i> Cart</router-link>
                            </li>
                            <li class="nav-item" v-if="!isAdmin && !isWorker">
                                <router-link class="nav-link" to="/contact"><i class="bi bi-telephone-inbound"></i>
                                    Contact</router-link>
                            </li>
                        </ul>
                        <div v-if="$cookies.isKey('webtoken') && $cookies.isKey('user')">
                            <UpdateUser />
                        </div>
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
import UpdateUser from './UserUpdate.vue';
import Swal from 'sweetalert2';

export default {
    components: {
        LogInModal,
        SignupComp,
        UpdateUser
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
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error signing out. Please try again.',
                });
            }
        },
        deleteCookies() {
            this.$cookies.remove('webtoken');
            this.$cookies.remove('user');
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 0;
        }
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
    display: flex;
    justify-content: start;
}

.nav-item .router-link-active {
    color: white !important;
}

.nav-item .nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: rgb(0, 89, 255);
    visibility: hidden;
    border-radius: .3pc;
}

.nav-item,
.nav-link:hover::before {
    visibility: visible;
}

nav a.router-link-active {
    color: white;
    background-color: rgb(0, 89, 255);
    border-radius: .3pc;
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
    font-size: 16px;
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
    font-size: 16px;
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

.offcanvas {
    background-color: rgba(255, 255, 255, 0.8);
    transition: all .3s;
}

.offcanvas:hover {
    background-color: rgba(255, 255, 255, 0.9);
}

i {
    margin: 0 1em;
    font-size: 16px;
}

.NavNameIco,
h3 {
    margin: 0 .5em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 89, 255);
    width: 35px;
    height: 35px;
    border-radius: 5pc;
    color: white;
    font-size: 16px;
}
</style>
