import { EventCard } from '../components/eventCard';
import { getBookings, addToCart, getCart } from '../utils/storage';

export class HomePage {
    constructor(container, onCartUpdate) {
        this.container = container;
        this.onCartUpdate = onCartUpdate;
        this.allEvents = [];
        this.bookings = getBookings();
    }

    setEvents(events) {
        this.allEvents = events;
        this.render();
    }

    showNotification(message, type = 'success') {
        const notif = document.createElement('div');
        notif.className = `notification ${type}`;
        notif.textContent = message;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 2000);
    }

    renderCategory(containerId, events) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        if (events.length === 0) {
            container.innerHTML = '<div class="empty-message"> Нет мероприятий</div>';
            return;
        }
        
        container.innerHTML = '';
        this.bookings = getBookings();
        
        events.forEach(event => {
            const isBooked = this.bookings.some(b => b.id === event.id);
            const cart = getCart();
            const isInCart = cart.some(c => c.id === event.id);
            const disabled = isBooked || isInCart;
            
            const card = new EventCard(
                event, 
                (evt) => {
                    if (disabled) {
                        this.showNotification('Уже в корзине или забронировано', 'error');
                        return;
                    }
                    addToCart(evt);
                    this.showNotification(`"${evt.title}" добавлено в корзину. Перейдите в корзину для подтверждения.`);
                    if (this.onCartUpdate) this.onCartUpdate();
                    this.render();
                }, 
                isBooked
            );
            container.appendChild(card.render());
        });
    }

    render() {
        if (!this.container) return;
        
        const concerts = this.allEvents.filter(e => e.category === 'concert');
        const theaters = this.allEvents.filter(e => e.category === 'theater');
        const exhibitions = this.allEvents.filter(e => e.category === 'exhibition');
        const museums = this.allEvents.filter(e => e.category === 'museum');
        
        this.renderCategory('concertsGrid', concerts);
        this.renderCategory('theaterGrid', theaters);
        this.renderCategory('exhibitionGrid', exhibitions);
        this.renderCategory('museumGrid', museums);
    }
}