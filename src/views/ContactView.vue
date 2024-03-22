<template>
    <div class="container">
        <h1>Contact us</h1>
        <h2>Get in touch with us by completing this form</h2>
        <form @submit="submitForm" action="https://formspree.io/f/mzbnaobq" method="POST">
            <div class="row">
                <div class="col-md-6">
                    <label>First name</label>
                    <input type="text" class="form-control" placeholder="Enter your first name here"
                         name="FirstName" required>
                </div>
                <div class="col-md-6">
                    <label>Last name</label>
                    <input type="text" class="form-control" placeholder="Enter your last name here"
                     name="LastName" required>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <label>Email address</label>
                    <input type="email" class="form-control" placeholder="Enter your email here"
                        name="Email" required>
                </div>
                <div class="col-md-6">
                    <label>Message</label>
                    <input type="text" class="form-control" placeholder="Type your message here"
                        name="message" >
                </div>
            </div>
            <div class="mt-3 d-flex justify-content-evenly">
                <button type="submit" class="btn btn-primary me-4">Submit</button>
                <button type="button" class="btn btn-secondary" @click="clearInput">Clear</button>
            </div>
            <p class="mt-3">{{ submitMessage }}</p>
        </form>
        <h2 class="mt-5">Call online support or visit us directly</h2>
        <p class="mt-3">Cell: 079 905 5421</p>
        <h2 class="mt-3">Address:</h2>
        <div class="mt-3">
            <p>25 Loop Street</p>
            <p>Grassy Park</p>
            <p>Cape Town</p>
            <p>Western Cape</p>
            <p>7941</p>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    data() {
    },
    methods: {
        async submitForm() {
                this.submitMessage = "You've submitted all your fields correctly. Thank you for contacting us";
                await Swal.fire('Success', 'Submit Successful', 'success');
                location.reload()
        }
    }
};
</script>

<style scoped>
label,
input {
    margin: 5px;
}

label {
    width: 150px;
}


.addressPtag {
    margin-inline: 100px;
    width: fit-content;
}

input:focus {
    min-width: 2em;
}
</style>
