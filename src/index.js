import { fetchEvents } from './api/eventAPI';
import { HomePage } from './pages/home';
import { getCart } from './utils/storage';

const cartCountSpan = document.getElementById('cartCount');
let homePage = null;

function updateCartCount() {
    const cart = getCart();
    cartCountSpan.textContent = cart.length;
}

async function init() {
    updateCartCount();
    const mainContainer = document.querySelector('.container');
    try {
        const events = await fetchEvents();
        homePage = new HomePage(mainContainer, () => updateCartCount());
        homePage.setEvents(events);
    } catch (error) {
        console.error(error);
        
        const statsSpan = document.getElementById('eventsStats');
        if (statsSpan) statsSpan.textContent = 'Ошибка загрузки';
    }
}

init();