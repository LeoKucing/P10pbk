<template>
  <div>
    <h1>Riwayat Pesanan</h1>
    <ul>
      <li v-for="order in orders" :key="order.id">
        <strong>{{ order.nama }}</strong>:
        <ul>
          <li v-for="item in order.items" :key="item.nama">
            {{ item.nama }} - Rp {{ item.harga }} <span v-if="item.jenis">({{ item.jenis }})</span>
          </li>
        </ul>
        <p><strong>Total:</strong> Rp {{ order.total }}</p>
        <span v-if="order.selesai">✅ Selesai</span>
        <button v-if="!order.selesai" @click="tandaiSelesai(order.id)">Selesai</button>
        <button v-else @click="batalkanSelesai(order.id)">Batalkan Selesai</button>
        <button @click="batalkanPesanan(order.id)">Batalkan Pesanan</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const orders = ref([])

function ambilOrders() {
  fetch('https://api-kopikuy-1.onrender.com/api/orders')
    .then(res => res.json())
    .then(data => orders.value = data)
}

function batalkanPesanan(id) {
  fetch(`https://api-kopikuy-1.onrender.com/api/orders/${id}`, {
    method: 'DELETE'
  }).then(() => ambilOrders())
}

function tandaiSelesai(id) {
  fetch(`https://api-kopikuy-1.onrender.com/api/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ selesai: true })
  }).then(() => ambilOrders())
}

function batalkanSelesai(id) {
  fetch(`https://api-kopikuy-1.onrender.com/api/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ selesai: false })
  }).then(() => ambilOrders())
}

onMounted(() => ambilOrders())
</script>
