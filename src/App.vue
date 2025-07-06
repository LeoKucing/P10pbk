<template>
  <div>
    <nav>
      <div style="color:white; font-weight:bold;">KopiKuy ☕</div>
      <div class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div :class="['menu', { active: showMenu }]">
        <router-link to="/home">Home</router-link>
        <router-link to="/menu">Menu</router-link>
        <router-link to="/cart">Keranjang</router-link>
        <router-link to="/history">Riwayat</router-link>
        <router-link to="/admin">Admin</router-link>
        <button @click="logout">Logout</button>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>

    <!-- Floating button laporan -->
    <div class="floating-btn" @click="showForm = true">📝</div>

    <!-- Popup form laporan -->
    <div v-if="showForm" class="popup">
      <h3>Buat Laporan</h3>
      <textarea v-model="pesan" placeholder="Tulis laporan di sini..." rows="4"></textarea>
      <br />
      <button @click="kirimLaporan">Kirim</button>
      <button @click="showForm = false">Tutup</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from './stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const showMenu = ref(false)

const showForm = ref(false)
const pesan = ref('')

function logout() {
  auth.logout()
  router.push('/login')
}

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function kirimLaporan() {
  if (!pesan.value) {
    alert('Isi dulu laporannya')
    return
  }

  fetch('http://localhost:3000/reports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pesan: pesan.value, selesai: false })
  }).then(() => {
    pesan.value = ''
    showForm.value = false
    alert('Laporan berhasil disimpan!')
  })
}
</script>
