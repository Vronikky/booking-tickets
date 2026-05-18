export class EventCard {
    constructor(event, onBook, isBooked = false) {
        this.event = event;
        this.onBook = onBook;
        this.isBooked = isBooked;
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
        card.className = 'event-card';
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'event-card__image';
        
        const base = import.meta.env.BASE_URL;
        
        let imageUrl = this.event.image;
        if (!imageUrl) {
            const imageName = this.getImageNameByCategory();
            imageUrl = `${base}images/${imageName}.jpg`;
        } else {
            
            if (imageUrl.startsWith('/')) {
                imageUrl = `${base}${imageUrl.slice(1)}`;
            } else {
                imageUrl = `${base}${imageUrl}`;
            }
        }
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = this.event.title;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        
        img.onerror = () => {
            imageContainer.innerHTML = this.getCategoryEmoji();
            imageContainer.style.display = 'flex';
            imageContainer.style.alignItems = 'center';
            imageContainer.style.justifyContent = 'center';
            imageContainer.style.fontSize = '64px';
            imageContainer.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        };
        
        imageContainer.appendChild(img);
        card.appendChild(imageContainer);

        const content = document.createElement('div');
        content.className = 'event-card__content';

        const title = document.createElement('h3');
        title.className = 'event-card__title';
        title.textContent = this.event.title;
        content.appendChild(title);

        const venue = document.createElement('div');
        venue.className = 'event-card__venue';
        venue.innerHTML = `📍 ${this.event.venue}`;
        content.appendChild(venue);

        const date = document.createElement('div');
        date.className = 'event-card__date';
        date.innerHTML = `${this.formatDate(this.event.date)}`;
        content.appendChild(date);

        if (this.event.description) {
            const desc = document.createElement('div');
            desc.className = 'event-card__description';
            desc.innerHTML = this.event.description;
            content.appendChild(desc);
        }

        const price = document.createElement('div');
        price.className = 'event-card__price';
        price.innerHTML = `${this.event.price.toLocaleString()} ₽`;
        content.appendChild(price);

        const button = document.createElement('button');
        button.className = 'event-card__button';
        button.textContent = this.isBooked ? 'Забронировано' : 'Забронировать';
        if (this.isBooked) button.disabled = true;
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.onBook(this.event);
        });
        content.appendChild(button);

        card.appendChild(content);
        this.element = card;
        return card;
    }

    getImageNameByCategory() {
        const images = {
            concert: 'concert',
            theater: 'theater',
            exhibition: 'exhibition',
            museum: 'museum'
        };
        return images[this.event.category] || 'placeholder';
    }

    getCategoryEmoji() {
        const emojis = {
            concert: '🎸',
            theater: '🎭',
            exhibition: '🖼️',
            museum: '🏛️'
        };
        return emojis[this.event.category] || '🎫';
    }

    setBooked(booked) {
        this.isBooked = booked;
        const button = this.element?.querySelector('.event-card__button');
        if (button) {
            button.disabled = booked;
            button.textContent = booked ? 'Забронировано' : 'Забронировать';
        }
    }
}