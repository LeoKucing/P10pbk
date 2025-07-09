<template>
    <div>
        <h1>Menu KopiKuy</h1>
        <div v-for="(items, kategori) in menuByKategori" :key="kategori">
        <h2>{{ kategori }}</h2>
        <ul>
            <li v-for="item in items" :key="item.id">
            {{ item.nama }} - Rp {{ item.harga }}
            
            <!-- Snack, Soft Drink, Tea pakai 1 tombol -->
            <template v-if="kategori === 'Snack' || kategori === 'Soft Drink' || kategori === 'Tea'">
                <button @click="addToCart(item)">Tambah</button>
            </template>

            <!-- Kopi & Milky pakai 2 tombol -->
            <template v-else>
                <button @click="addToCart(item, 'Dingin')">Tambah Dingin</button>
                <button @click="addToCart(item, 'Panas')">Tambah Panas</button>
            </template>

            </li>
        </ul>
        </div>
    </div>
    </template>

    <script setup>
    import { ref, onMounted, computed } from 'vue'
    import { useCartStore } from '../../stores/cartStore'

    const menus = ref([])
    const cart = useCartStore()

    function addToCart(item, jenis = '') {
    cart.addItem(item, jenis)
    }

    onMounted(() => {
    fetch('https://api-kopikuy-1.onrender.com/api/menus')
        .then(res => res.json())
        .then(data => menus.value = data)
})

const menuByKategori = computed(() => {
    const result = {}
    menus.value.forEach(menu => {
        if (!result[menu.kategori]) {
        result[menu.kategori] = []
        }
        result[menu.kategori].push(menu)
    })
    return result
})
</script>
