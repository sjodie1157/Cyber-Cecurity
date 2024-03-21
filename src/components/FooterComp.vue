<template>
    <div class="footer p-2">
        <div class="container">
            <div class="col my-3">
                <h1><span>Cy</span>ber
                    <span>Secu</span>rity
                </h1>
            </div>
            <div class="col d-flex flex-md-row flex-lg-row flex-column my-4 justify-content-center justify-content-md-start">
                <div class="col d-flex justify-content-around">
                    <h2><span>Find </span> Out More <span> About Us On</span></h2>
                </div>
                <div class="col d-flex justify-content-around">
                    <i class="bi bi-instagram d-flex align-items-center mx-4"></i>
                    <i class="bi bi-twitter d-flex align-items-center mx-4"></i>
                    <i class="bi bi-facebook d-flex align-items-center mx-4"></i>
                </div>
            </div>
            <div class="col">
                <h5>
                    &copy; Rights Reserved <span>{{ currentYear }} Cy</span>ber <span>Sec</span>urity
                </h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        currentYear() {
            return new Date().getFullYear();
        }
    }
}
</script>

<style scoped>
    h1,
    h3,
    h5 {
        color: white;
    }

    span {
        color: rgb(0, 173, 239);
    }

    i {
        color: rgb(0, 173, 239);
    }

    .footer {
        background-color: black;
    }
</style>