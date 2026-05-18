export async function fetchEvents() {
    try {
        // Используем BASE_URL, который Vite подставит автоматически
        const base = import.meta.env.BASE_URL;
        const response = await fetch(`${base}events.json`);
        if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
        const data = await response.json();
        console.log('Загружено мероприятий:', data.events.length);
        return data.events;
    } catch (error) {
        console.error('Ошибка API:', error);
        throw new Error('Не удалось загрузить мероприятия');
    }
}