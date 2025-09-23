// Ініціалізація Telegram WebApp
const tg = window.Telegram.WebApp;

// Елементи DOM
const elements = {
    userName: document.getElementById('user-name'),
    userPhoto: document.getElementById('user-photo-main'),
    appContainer: document.querySelector('.app-container'),
    modalOverlay: document.getElementById('modal-overlay'),
    modalTitle: document.getElementById('modal-title'),
    modalContent: document.getElementById('modal-content'),
    closeButton: document.querySelector('.close-button')
};

// Дані додатка
const APP_DATA = {
    rozklad: {
        "Понеділок": ["Історія України", "Підприємство і Фінансова грамотність", "Українська мова", "Алгебра", "Мистецтво", "Українська література", "Фізика"],
        "Вівторок": ["Фізична культура", "Географія", "Зарубіжна література", "Німецька мова", "Геометрія", "Інформатика / англ. мова", "Англ. мова / інформатика"],
        "Середа": ["Хімія", "Всесвітня історія", "Українська мова", "Біологія", "Алгебра", "Фізика", "Фізична культура"],
        "Четвер": ["Геометрія", "Англійська мова", "Німецька мова", "Українська література", "Географія", "Алгебра", "Біологія", "Фізична культура"],
        "П'ятниця": ["Українська мова", "Історія України", "Хімія", "Інформатика / англ. мова", "Англ.мова/інформатика", "Технології", "Здоров'я, безпека"]
    },
    
    ebooks: {
        "Інформатика": "https://pidruchnyk.com.ua/3011-informatyka-ryvkind-8-klas-2025.html",
        "Геометрія": "https://pidruchnyk.com.ua/2915-geometriia-burda-8-klas-2025.html",
        "Англійська мова": "https://pidruchnyk.com.ua/2896-angliiska-mova-mitchell-8-klas.html",
        "Технологія (хлопці)": "https://pidruchnyk.com.ua/2953-tekhnologii-bilenko-8-klas-2025.html",
        "Зарубіжна література": "https://pidruchnyk.com.ua/2993-zarubizhna-literatura-milianovska-8-klas-2025.html",
        "Історія України": "https://pidruchnyk.com.ua/3016-istoriia-ukrainy-pometun-8-klas-2025.html",
        "Українська література": "https://pidruchnyk.com.ua/2962-ukrainska-literatura-avramenko-8-klas-2025.html",
        "Німецька мова": "https://pidruchnyk.com.ua/2941-nimecka-sotnykova-8-klas-2025-4rik.html",
        "Технологія (дівчата)": "https://pidruchnyk.com.ua/2951-tekhnologii-khodzycka-8-klas-2025.html",
        "Підприємство та фінансова грамотність": "https://pidruchnyk.com.ua/2948-pidpryiemnyctvo-i-finansova-gramotnist-kuzniecova-8-klas-2025.html",
        "Хімія": "https://pidruchnyk.com.ua/2920-khimiia-midak-8-klas-2025.html",
        "Географія": "https://pidruchnyk.com.ua/2984-geografiia-gilberg-8-klas-2025.html",
        "Біологія": "https://pidruchnyk.com.ua/2925-biologiia-balan-8-klas-2025.html",
        "Мистецтво": "https://pidruchnyk.com.ua/2938-mystectvo-masol-8-klas-2025.html",
        "Фізика": "https://pidruchnyk.com.ua/2971-fizyka-bariakhtar-8-klas-2025.html",
        "Алгебра": "https://pidruchnyk.com.ua/2909-algebra-tarasenkova-8-klas-2025.html",
        "Здоров'я, безпека та добробут": "https://pidruchnyk.com.ua/3000-zdorovia-bezpeka-ta-dobrobut-shyian-8-klas-2025.html",
        "Українська мова": "https://pidruchnyk.com.ua/2899-ukrainska-mova-avramenko-8-klas-2025.html",
        "Громадська освіта": "https://pidruchnyk.com.ua/2988-gromadianska-osvita-vasylkiv-8-klas-2025.html",
        "Всесвітня історія": "https://pidruchnyk.com.ua/2977-vsesvitnia-istoriia-pometun-8-klas-2025.html"
    },
    
    bells: [
        ["1 урок", "8:30-9:10"],
        ["перерва", "9:10-9:20 (10 хв)"],
        ["2 урок", "9:20-10:00"], 
        ["перерва", "10:00-10:20 (20 хв)"],
        ["3 урок", "10:20-11:00"],
        ["перерва", "11:00-11:15 (15 хв)"],
        ["4 урок", "11:15-11:55"],
        ["перерва", "11:55-12:10 (15 хв)"],
        ["5 урок", "12:10-12:50"],
        ["перерва", "12:50-13:00 (10 хв)"],
        ["6 урок", "13:00-13:40"],
        ["перерва", "13:40-13:50 (10 хв)"],
        ["7 урок", "13:50-14:30"],
        ["перерва", "14:30-14:40 (10 хв)"],
        ["8 урок", "14:40-15:20"]
    ],
    
    ministry: {
        "👑 Президент класу": ["Мілана Баляс"],
        "⭐ Віце-президент": ["Аріна Кухаренко", "Софія Заболотня"],
        "🏦 Депутат": ["Маргарита Даниленко"],
        "📚 Міністерство освіти та науки": ["Станіслав Гусєв", "Максим Вашека"],
        "🎭 Міністерство культури та дозвілля": ["Олександр Ткач"],
        "⚽ Міністерство спорту та здоров'я": ["Злата Мелещенко"],
        "🌍 Міністерство екології та порядку": ["Анастасія Коваль"],
        "📸 Міністерство медіа та комунікацій": ["Марія Мовчан"],
        "💡 Міністерство креативних ідей": ["Ліна Ільченко"],
        "❤️ Міністерство добрих справ і дружби": ["Маргарита Гриценко"]
    }
};

// Утиліти
const utils = {
    showModal: () => {
        elements.modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    closeModal: () => {
        elements.modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    },
    
    createElement: (tag, classes, content) => {
        const el = document.createElement(tag);
        if (classes) el.className = classes;
        if (content) el.innerHTML = content;
        return el;
    }
};

// Обробники функціоналу
const features = {
    schedule: () => {
        elements.modalTitle.textContent = '📅 Розклад занять';
        
        const days = Object.keys(APP_DATA.rozklad);
        const dayButtons = days.map(day => 
            `<button class="day-button" data-day="${day}">${day}</button>`
        ).join('');
        
        elements.modalContent.innerHTML = `
            <div class="day-buttons">${dayButtons}</div>
            <div id="schedule-display">${renderSchedule(days[0])}</div>
        `;
        
        utils.showModal();
        
        // Обробники кнопок днів
        setTimeout(() => {
            document.querySelectorAll('.day-button').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.day-button').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    document.getElementById('schedule-display').innerHTML = 
                        renderSchedule(e.target.dataset.day);
                });
            });
            document.querySelector('.day-button').classList.add('active');
        }, 50);
    },
    
    books: () => {
        elements.modalTitle.textContent = '📚 Підручники';
        
        const booksList = Object.entries(APP_DATA.ebooks).map(([subject, url]) => `
            <div class="book-item">
                <a href="${url}" target="_blank" class="book-link">
                    <span class="card-icon">📚</span>
                    <span>${subject}</span>
                    <span style="margin-left: auto;">↗</span>
                </a>
            </div>
        `).join('');
        
        elements.modalContent.innerHTML = `
            <div class="info-card">
                <h3>Електронні підручники 8 класу</h3>
                <p>Натисніть на предмет для перегляду</p>
            </div>
            <div class="book-list">${booksList}</div>
        `;
        
        utils.showModal();
    },
    
    bells: () => {
        elements.modalTitle.textContent = '🔔 Розклад дзвінків';
        
        const bellsList = APP_DATA.bells.map(([lesson, time]) => `
            <div class="bell-item">
                <div class="bell-info">
                    <span>${lesson.includes('перерва') ? '🔄' : '📚'}</span>
                    <span>${lesson}</span>
                </div>
                <span>${time}</span>
            </div>
        `).join('');
        
        elements.modalContent.innerHTML = `
            <div class="info-card">
                <h3>Розклад уроків та перерв</h3>
            </div>
            <div class="bells-list">${bellsList}</div>
            <div class="info-card">
                <p><strong>⏰ Тривалість навчального дня:</strong> 6:50 год</p>
            </div>
        `;
        
        utils.showModal();
    },
    
    ministry: () => {
        elements.modalTitle.textContent = '👥 Міністри класу';
        
        const ministryList = Object.entries(APP_DATA.ministry).map(([position, students]) => `
            <div class="ministry-item">
                <div class="ministry-header">
                    <span>${position.split(' ')[0]}</span>
                    <div>
                        <h4>${position}</h4>
                        <p class="ministry-students">${students.join(', ')}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        elements.modalContent.innerHTML = `
            <div class="info-card">
                <h3>Структура самоврядування 8 класу</h3>
            </div>
            <div class="ministry-list">${ministryList}</div>
        `;
        
        utils.showModal();
    },
    
    info: () => {
        elements.modalTitle.textContent = '📋 Інформація';
        
        elements.modalContent.innerHTML = `
            <div class="info-card">
                <h3>Study Bot</h3>
                <p>Навчальний помічник для 8 класу</p>
            </div>
            
            <div class="info-card">
                <h3>📞 Екстрені служби</h3>
                <p>101 - Пожежна<br>102 - Поліція<br>103 - Швидка<br>104 - Газова</p>
            </div>
        `;
        
        utils.showModal();
    }
};

// Допоміжні функції
function renderSchedule(day) {
    const lessons = APP_DATA.rozklad[day];
    if (!lessons) return '<p>Розклад не знайдено</p>';
    
    return `
        <div class="info-card">
            <h3>${day}</h3>
        </div>
        <table class="schedule-table">
            <thead>
                <tr><th>№</th><th>Предмет</th></tr>
            </thead>
            <tbody>
                ${lessons.map((lesson, i) => `
                    <tr><td>${i+1}</td><td>${lesson}</td></tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Ініціалізація
function initApp() {
    // Ініціалізація Telegram WebApp
    tg.expand();
    tg.enableClosingConfirmation();
    
    // Оновлення інформації користувача
    const user = tg.initDataUnsafe?.user;
    if (user) {
        elements.userName.textContent = user.first_name || 'Учень';
        if (user.photo_url) elements.userPhoto.src = user.photo_url;
    }
    
    // Обробники кнопок
    document.querySelectorAll('.nav-card').forEach(card => {
        card.addEventListener('click', () => {
            const feature = card.dataset.feature;
            if (features[feature]) {
                features[feature]();
            }
        });
    });
    
    // Обробники модального вікна
    elements.closeButton.addEventListener('click', utils.closeModal);
    elements.modalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.modalOverlay) utils.closeModal();
    });
    
    // Обробка посилань
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.href) {
            e.preventDefault();
            window.open(e.target.href, '_blank');
        }
    });
}

// Запуск додатка
document.addEventListener('DOMContentLoaded', initApp);
