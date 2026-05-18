import { ProfilePage } from './pages/profile.js';
import { getCart } from './utils/storage.js';

const profileContainer = document.getElementById('profileContainer');
const cartCountSpan = document.getElementById('cartCount');

function updateCartCount() {
    const cart = getCart();
    cartCountSpan.textContent = cart.length;
}

// ожидание загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const profilePage = new ProfilePage(profileContainer, () => {
        updateCartCount();
        profilePage.render();
    });
    profilePage.render();
    updateCartCount();
});