<template>
  <div>
    <h1>Selamat Datang di KopiKuy ☕</h1>

    <h2>Best Seller</h2>
    <ul>
      <li v-for="item in bestSeller" :key="item.nama">
        {{ item.nama }} ({{ item.jumlah }}x) - Estimasi Harga: Rp {{ estimasiHarga(item.nama) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const orders = ref([])
const bestSeller = ref([])

// Ambil semua pesanan selesai
function ambilOrders() {
  fetch('https://api-kopikuy-1.onrender.com/api/orders')
    .then(res => res.json())
    .then(data => {
      orders.value = data.filter(o => o.selesai)
      hitungBestSeller()
    })
}

// Hitung frekuensi menu dari pesanan selesai
function hitungBestSeller() {
  const counter = {}

  orders.value.forEach(order => {
    order.items.forEach(item => {
      if (counter[item.nama]) {
        counter[item.nama] += 1
      } else {
        counter[item.nama] = 1
      }
    })
  })

  // Ubah jadi array & urutkan
  const hasil = Object.keys(counter)
    .map(nama => ({ nama, jumlah: counter[nama] }))
    .sort((a, b) => b.jumlah - a.jumlah)
    .slice(0, 5) // top 5 best seller

  bestSeller.value = hasil
}

// Estimasi harga menu dari salah satu pesanan
function estimasiHarga(nama) {
  // cari harga pertama ketemu dari orders
  for (const order of orders.value) {
    const found = order.items.find(item => item.nama === nama)
    if (found) return found.harga
  }
  return '-'
}

onMounted(() => ambilOrders())
</script>
