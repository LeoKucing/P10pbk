<template>
  <div>
    <h1>Laporan Operasional</h1>

    <ul>
      <li v-for="laporan in reports" :key="laporan.id">
        <template v-if="editId === laporan.id">
          <textarea v-model="editPesan" rows="3"></textarea>
          <br />
          <button @click="simpanEdit(laporan.id)">Simpan</button>
          <button @click="batalEdit">Batal</button>
        </template>
        <template v-else>
          {{ laporan.pesan }}
          <span v-if="laporan.selesai">✅ Selesai</span>
          <br />
          <button v-if="!laporan.selesai" @click="tandaiSelesai(laporan.id)">Selesai</button>
          <button @click="mulaiEdit(laporan)">Edit</button>
          <button @click="hapusLaporan(laporan.id)">Hapus</button>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const reports = ref([])
const editId = ref(null)
const editPesan = ref('')

function ambilReports() {
  fetch('https://api-kopikuy-1.onrender.com/api/reports')
    .then(res => res.json())
    .then(data => reports.value = data)
}

function tandaiSelesai(id) {
  fetch(`https://api-kopikuy-1.onrender.com/api/reports/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ selesai: true })
  }).then(() => ambilReports())
}

function hapusLaporan(id) {
  fetch(`https://api-kopikuy-1.onrender.com/api/reports/${id}`, {
    method: 'DELETE'
  }).then(() => ambilReports())
}

function mulaiEdit(laporan) {
  editId.value = laporan.id
  editPesan.value = laporan.pesan
}

function simpanEdit(id) {
  fetch(`https://api-kopikuy-1.onrender.com/api/reports/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pesan: editPesan.value })
  }).then(() => {
    editId.value = null
    editPesan.value = ''
    ambilReports()
  })
}

function batalEdit() {
  editId.value = null
  editPesan.value = ''
}

onMounted(() => ambilReports())
</script>
