<template>
  <div>
    <h1>Keranjang</h1>
    <ul>
      <li v-for="item in cart.items" :key="item.id">
        {{ item.nama }} - Rp {{ item.harga }}
        <span v-if="item.jenis">({{ item.jenis }})</span>
      </li>
    </ul>

    <p v-if="cart.items.length > 0"><strong>Total Harga:</strong> Rp {{ totalHarga }}</p>

    <div v-if="cart.items.length > 0" style="margin-top: 20px;">
      <input v-model="nama" placeholder="Nama Pemesan" />
      <button @click="submitOrder">Submit Pesanan</button>
      <button @click="cart.clearCart">Kosongkan Keranjang</button>
    </div>
    <p v-else>Keranjang kosong</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../../stores/cartStore'

const cart = useCartStore()
const nama = ref('')

// Hitung total harga
const totalHarga = computed(() => {
  return cart.items.reduce((total, item) => total + item.harga, 0)
})

function submitOrder() {
  if (!nama.value || cart.items.length === 0) {
    alert('Isi nama dan keranjang dulu!')
    return
  }

  const items = cart.items.map(item => ({
    nama: item.nama,
    harga: item.harga,
    jenis: item.jenis
  }))

  fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nama: nama.value,
      items: items,
      total: totalHarga.value,  // kirim total harga
      selesai: false
    })
  }).then(() => {
    cart.clearCart()
    nama.value = ''
    alert('Pesanan berhasil disimpan!')
  })
}
</script>
