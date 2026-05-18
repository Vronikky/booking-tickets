export async function fetchEvents() {
    try {
        const response = await fetch('/events.json');
        if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
        const data = await response.json();
        console.log('Загружено мероприятий:', data.events.length);
        return data.events;
    } catch (error) {
        console.error('Ошибка API:', error);
        throw new Error('Не удалось загрузить мероприятия');
    }
}