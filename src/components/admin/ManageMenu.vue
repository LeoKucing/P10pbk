<template>
    <div>
        <h1>Kelola Menu</h1>
        <input v-model="nama" placeholder="Nama Menu" />
        <input v-model="harga" placeholder="Harga" type="number" />
        <button @click="tambahMenu">Tambah Menu</button>

        <ul>
        <li v-for="m in menus" :key="m.id">{{ m.nama }} - Rp {{ m.harga }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const menus = ref([])
const nama = ref('')
const harga = ref('')

function tambahMenu() {
    fetch('http://localhost:3000/menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama: nama.value, harga: parseInt(harga.value) })
    }).then(() => ambilMenu())
}

function ambilMenu() {
    fetch('https://api.example.com/data/menus')
        .then(res => res.json())
        .then(data => menus.value = data)
}

onMounted(() => ambilMenu())
</script>
