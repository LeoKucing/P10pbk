import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../src/stores/cartStore'
import { describe, expect, it, beforeEach } from 'vitest'

describe('Cart Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('menambahkan item ke keranjang', () => {
        const cart = useCartStore()
        cart.addItem({ id: 1, nama: 'Kopi Susu', harga: 18000 })
        expect(cart.items.length).toBe(1)
    })
})
