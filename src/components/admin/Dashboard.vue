<template>
    <div>
        <h1>Ini Halaman Dashboard Admin</h1>
        <nav>
        <router-link to="/admin/menu">Kelola Menu</router-link> |
        <router-link to="/admin/orders">Kelola Pesanan</router-link> |
        <router-link to="/admin/reports">Laporan</router-link>
        </nav>
        <router-view />
    </div>
    </template>

    <script>
    export default {
    name: 'AdminDashboard'
    }
</script>
