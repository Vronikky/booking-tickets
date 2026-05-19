import { getBookings, removeBooking } from '../utils/storage';
import { BookingCard } from '../components/booking';

export class ProfilePage {
    constructor(container, onCartUpdate, userName = 'Гость') {
        this.container = container;
        this.onCartUpdate = onCartUpdate;
        this.userName = userName;
        this.bookings = getBookings();
    }

    setUserName(name) {
        this.userName = name;
        this.render();
    }

    render() {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        this.bookings = getBookings();

        const profileContainer = document.createElement('div');
        profileContainer.className = 'profile-container';

        const header = document.createElement('div');
        header.className = 'page-header';
        header.innerHTML = `
            <h2>Мои бронирования</h2>
            <a href="." class="back-link">← Назад к мероприятиям</a>
        `;
        profileContainer.appendChild(header);

        // Статистика
        const statsGrid = document.createElement('div');
        statsGrid.className = 'profile-stats';
        const totalSpent = this.bookings.reduce((sum, b) => sum + b.price, 0);
        statsGrid.innerHTML = `
            <div class="stat-card">
                <div class="stat-card__value">${this.bookings.length}</div>
                <div class="stat-card__label">Всего билетов</div>
            </div>
            <div class="stat-card">
                <div class="stat-card__value">${totalSpent.toLocaleString()} ₽</div>
                <div class="stat-card__label">На сумму</div>
            </div>
        `;
        profileContainer.appendChild(statsGrid);

        const bookingsList = document.createElement('div');
        bookingsList.className = 'bookings-list';

        if (this.bookings.length === 0) {
            bookingsList.innerHTML = '<div class="empty-state"> У вас пока нет бронирований :( </div>';
        } else {
            this.bookings.forEach(booking => {
                const bookingCard = new BookingCard(booking, (bookingId) => {
                    removeBooking(bookingId);
                    if (this.onCartUpdate) this.onCartUpdate();
                    this.render();
                });
                bookingsList.appendChild(bookingCard.render());
            });
        }
        
        profileContainer.appendChild(bookingsList);
        this.container.appendChild(profileContainer);
    }
}