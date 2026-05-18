export class BookingCard {
    constructor(booking, onCancel) {
        this.booking = booking;
        this.onCancel = onCancel;
        this.element = null;
    }

    formatDate(dateStr) {
        if (!dateStr) return 'Дата не указана';
        if (dateStr.includes('.')) return dateStr;
        const date = new Date(dateStr);
        return date.toLocaleDateString('ru-RU');
    }

    render() {
        const card = document.createElement('div');
        card.className = 'booking-card';

        const info = document.createElement('div');
        info.className = 'booking-info';

        const title = document.createElement('div');
        title.className = 'booking-title';
        title.textContent = this.booking.title;
        info.appendChild(title);

        const venue = document.createElement('div');
        venue.className = 'booking-details';
        venue.innerHTML = `📍 ${this.booking.venue}`;
        info.appendChild(venue);

        const date = document.createElement('div');
        date.className = 'booking-details';
        date.innerHTML = `${this.formatDate(this.booking.date)}`;
        info.appendChild(date);

        const price = document.createElement('div');
        price.className = 'booking-details';
        price.innerHTML = `${this.booking.price.toLocaleString()} ₽`;
        info.appendChild(price);

        const status = document.createElement('div');
        status.className = 'booking-status';
        status.textContent = 'Активен';
        info.appendChild(status);

        if (this.booking.bookedAt) {
            const bookedAt = document.createElement('div');
            bookedAt.className = 'booking-details';
            bookedAt.innerHTML = `Забронировано: ${this.booking.bookedAt}`;
            info.appendChild(bookedAt);
        }

        card.appendChild(info);

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'cancel-booking';
        cancelBtn.textContent = 'Отменить';
        cancelBtn.addEventListener('click', () => this.onCancel(this.booking.id));
        card.appendChild(cancelBtn);

        this.element = card;
        return card;
    }
}