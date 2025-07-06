import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: []
    }),
    actions: {
        addItem(item, jenis = '') {
        this.items.push({ ...item, jenis })
        },
        clearCart() {
        this.items = []
        }
    }
})
