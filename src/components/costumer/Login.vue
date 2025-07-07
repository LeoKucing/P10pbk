<template>
    <div>
        <h1>Login</h1>
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button @click="login">Login</button>
        <p v-if="pesan">{{ pesan }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const auth = useAuthStore()
const username = ref('')
const password = ref('')
const pesan = ref('')

function login() {
    fetch('https://p10pbk-production.up.railway.app/users')
        .then(res => res.json())
        .then(users => {
        const user = users.find(u => u.username === username.value && u.password === password.value)
        if (user) {
            auth.login()
            router.push('/home')
        } else {
            pesan.value = 'Username / Password Salah'
        }
        })
}
</script>
