<template>
    <div>
        <button type="button" class="btn my-2" data-bs-toggle="modal" :data-bs-target="'#editusermodal' + 108">
            Edit
        </button>
        <div class="modal fade" :id="'editusermodal' + 108" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Edit User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="editUser">
                            <div class="mb-3">
                                <label for="username" class="form-label">New Username:</label>
                                <!-- <input type="text" class="form-control" id="username" v-model="user.userFirstName"> -->
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: Object 
    },
    methods: {
        async editUser() {
            try {
                const response = await fetch(`https://cyber-cecurity-1.onrender.com/users/${this.user.userID}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userFirstName: this.user.userFirstName })
                });
                if (response.ok) {
                    this.refresh();
                    alert('User has been updated');
                } else {
                    console.error('Error editing user:', response.statusText);
                }
            } catch (error) {
                console.error('Error editing user:', error);
            }
        },
        refresh() {
            setTimeout(() => {
                location.reload();
            }, 300);
        }
    }
};
</script>
