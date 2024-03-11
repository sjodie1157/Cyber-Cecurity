<template>
    <h1>users</h1>
    <div v-for="user in users" :key="user.userID">
        <li>{{ user.userFirstName }}</li><button @click="deleteUser(user.userID)">delete user</button>
    </div>
    <h1>items</h1>
    <div v-for="item in items" :key="item.prodID">
        <li>{{ item.prodName }}</li><button @click="deleteItem(item.prodID)">delete item</button>
    </div>

</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        users() {
            return this.$store.state.users
        },
        items() {
            return this.$store.state.items
        }
    },
    methods: {
        async deleteUser(userID) {
            try {
                await fetch(`https://cyber-cecurity-1.onrender.com/users/${userID}`, {
                    method: 'DELETE',
                });
                this.$store.dispatch('fetchUsers');
                alert('User has been removed');
            } catch (error) {
                console.error('Error deleting user', error);
            }
        },
        async deleteItem(prodID) {
            try {
                await fetch(`https://cyber-cecurity-1.onrender.com/items/${prodID}`, {
                    method: 'DELETE',
                });
                this.$store.dispatch('fetchUsers');
                alert('Item has been removed');
                location.reload()
            } catch (error) {
                console.error('Error deleting item', error);
            }
        }
    },
    async mounted() {
        try {
            await this.$store.dispatch('fetchUsers');
            await this.$store.dispatch('fetchItems');
        } catch (error) {
            console.error('Error fetching home data', error);
        }
    }
}
</script>

<style scoped></style>