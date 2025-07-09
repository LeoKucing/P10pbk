<template>
  <div>
    <h1>Kelola Pesanan (Selesai)</h1>
    <ul>
      <li v-for="order in orders" :key="order.id">
        <strong>{{ order.nama }}</strong>:
        <ul>
          <li v-for="item in order.items" :key="item.nama">
            {{ item.nama }} - Rp {{ item.harga }}
            <span v-if="item.jenis">({{ item.jenis }})</span>
          </li>
        </ul>
        <p><strong>Total:</strong> Rp {{ order.total }}</p>
      </li>
    </ul>

    <h3>Total Penjualan: Rp {{ totalPenjualan }}</h3>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const orders = ref([])

// Ambil pesanan yang selesai
function ambilOrders() {
  fetch('https://api-kopikuy-1.onrender.com/api/orders')
    .then(res => res.json())
    .then(data => {
      orders.value = data.filter(o => o.selesai)
    })
}

// Hitung total penjualan semua pesanan yang selesai
const totalPenjualan = computed(() => {
  return orders.value.reduce((total, order) => total + (order.total || 0), 0)
})

onMounted(() => ambilOrders())
</script>
