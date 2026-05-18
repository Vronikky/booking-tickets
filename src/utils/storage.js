const CART_KEY = 'ticket_cart';
const BOOKINGS_KEY = 'ticket_bookings';

export function getCart() {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
}

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getBookings() {
    const saved = localStorage.getItem(BOOKINGS_KEY);
    return saved ? JSON.parse(saved) : [];
}

export function saveBookings(bookings) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function addToCart(event) {
    const cart = getCart();
    if (!cart.some(item => item.id === event.id)) {
        cart.push({ ...event });
        saveCart(cart);
        return true;
    }
    return false;
}

export function removeFromCart(index) {
    let cart = getCart();
    const removed = cart[index];
    cart.splice(index, 1);
    saveCart(cart);
    return removed;
}

export function addBooking(event) {
    let bookings = getBookings();
    if (!bookings.some(b => b.id === event.id)) {
        bookings.push({ ...event, bookedAt: new Date().toLocaleString() });
        saveBookings(bookings);
        return true;
    }
    return false;
}

export function removeBooking(bookingId) {
    let bookings = getBookings();
    bookings = bookings.filter(b => b.id !== bookingId);
    saveBookings(bookings);
    return bookings;
}

export function clearBookings() {
    saveBookings([]);
}

export function checkout() {
    const cart = getCart();
    let bookings = getBookings();
    cart.forEach(item => {
        if (!bookings.some(b => b.id === item.id)) {
            bookings.push({ ...item, bookedAt: new Date().toLocaleString() });
        }
    });
    saveCart([]);
    saveBookings(bookings);
    return { cart: [], bookings };
}