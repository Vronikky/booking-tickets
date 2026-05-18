import { getCart, getBookings, removeFromCart, checkout } from '../utils/storage.js';

const cartList = document.getElementById('cartList');
const cartTotalSpan = document.getElementById('cartTotal');
const cartCountSpan = document.getElementById('cartCount');

let cart = getCart();
let bookings = getBookings();

function updateCartCount() {
    cart = getCart();
    cartCountSpan.textContent = cart.length;
}

function showNotification(message, type = 'success') {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}

function renderCart() {
    if (!cartList) return;
    
    cart = getCart();
    
    if (cart.length === 0) {
        cartList.innerHTML = '<div class="empty-state">Корзина пуста</div>';
        cartTotalSpan.innerHTML = 'Итого: 0 ₽';
        return;
    }
    
    let total = 0;
    cartList.innerHTML = '';
    
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-details">📍 ${item.venue}</div>
                <div class="cart-item-details">${item.date}</div>
                <div class="cart-item-details">${item.price.toLocaleString()} ₽</div>
            </div>
            <button class="remove-from-cart" data-index="${index}">✕</button>
        `;
        cartList.appendChild(div);
    });
    
    cartTotalSpan.innerHTML = `Итого: ${total.toLocaleString()} ₽`;
    
    document.querySelectorAll('.remove-from-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            const removed = removeFromCart(index, cart);
            cart = getCart();
            showNotification(`"${removed.title}" удалено из корзины`, 'error');
            renderCart();
            updateCartCount();
        });
    });
}

document.getElementById('checkoutBtn').addEventListener('click', () => {
    cart = getCart();
    if (cart.length === 0) {
        showNotification('Корзина пуста', 'error');
        return;
    }
    
    bookings = getBookings();
    const result = checkout(cart, bookings);
    cart = result.newCart;
    bookings = result.bookings;
    
    showNotification(`Успешно забронировано ${result.bookings.length} билетов!`);
    renderCart();
    updateCartCount();
    
    setTimeout(() => {
        window.location.href = './profile.html';
    }, 1500);
});

renderCart();
updateCartCount();