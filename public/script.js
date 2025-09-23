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

// Список дозволених користувачів (ID) - ТАКИЙ ЖЕ ЯК У БОТІ
const ALLOWED_USERS = [
    8147168546, // Назар Кузьмич
    6329096147, // Аліна Ткач
    5836950765, // Діма Яриш
    7745185733, // Марго Коваленко
    1924433301 // Саша Ткач
];

// Перевірка доступу
function checkAccess(userId) {
    console.log('Перевірка доступу для ID:', userId);
    console.log('Дозволені ID:', ALLOWED_USERS);
    return ALLOWED_USERS.includes(userId);
}

// Блокування доступу
function blockAccess() {
    elements.appContainer.innerHTML = `
        <div class="access-denied">
            <div class="denied-content">
                <div class="denied-icon">⛔</div>
                <h2>Доступ заборонено</h2>
                <p>Ви не маєте дозволу на використання цього додатку.</p>
                <p>Зверніться до адміністратора для отримання доступу.</p>
                <p style="margin-top: 20px; font-size: 12px; color: #999;">Ваш ID: ${tg.initDataUnsafe?.user?.id || 'невідомо'}</p>
            </div>
        </div>
    `;
}

// Стилі для блокування доступу
const blockStyles = `
    .access-denied {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 20px;
    }
    
    .denied-content {
        text-align: center;
        background: white;
        padding: 40px 30px;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        width: 100%;
    }
    
    .denied-icon {
        font-size: 4rem;
        margin-bottom: 20px;
        color: #ff6b6b;
    }
    
    .denied-content h2 {
        color: #dc3545;
        margin-bottom: 15px;
        font-size: 1.5rem;
    }
    
    .denied-content p {
        color: #6c757d;
        margin-bottom: 10px;
        line-height: 1.5;
    }
`;

// Додаємо стилі для блокування
const styleSheet = document.createElement('style');
styleSheet.textContent = blockStyles;
document.head.appendChild(styleSheet);

// Дані для додатка
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
    },
    
    casino: {
        "admin_card": "4441 1144 3778 7581",
        "exchange_rate": 10,
        "withdraw_rate": 12,
        "min_bet": 10,
        "max_bet": 5000,
        "win_multiplier": 2,
        "min_deposit": 50,
        "min_withdraw": 100
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
        elements.modalContent.innerHTML = '';
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
        
        setTimeout(() => {
            const dayButtons = document.querySelectorAll('.day-button');
            dayButtons.forEach(button => {
                button.addEventListener('click', function() {
                    document.querySelectorAll('.day-button').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    const day = this.getAttribute('data-day');
                    const scheduleDisplay = document.getElementById('schedule-display');
                    scheduleDisplay.innerHTML = renderSchedule(day);
                });
            });
            if (dayButtons.length > 0) {
                dayButtons[0].classList.add('active');
            }
        }, 50);
    },
    
    books: () => {
        elements.modalTitle.textContent = '📚 Онлайн підручники';
        
        const booksList = Object.entries(APP_DATA.ebooks).map(([subject, url]) => `
            <div class="book-item">
                <a href="${url}" target="_blank" class="book-link">
                    <span>📚</span>
                    <span style="flex: 1;">${subject}</span>
                    <span>↗</span>
                </a>
            </div>
        `).join('');
        
        elements.modalContent.innerHTML = `
            <div class="info-card">
                <h3>Підручники 8 класу</h3>
                <p>Доступні електронні версії підручників:</p>
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
                <span class="bell-time">${time}</span>
            </div>
        `).join('');
        
        elements.modalContent.innerHTML = `
            <div class="info-card">
                <h3>Розклад уроків та перерв</h3>
                <p>Час проведення занять:</p>
            </div>
            <div class="bells-list">${bellsList}</div>
            <div class="info-card">
                <p><strong>⏰ Загальна тривалість навчального дня:</strong> 6:50 год</p>
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
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 4px 0;">${position}</h4>
                        <p class="ministry-students" style="margin: 0;">${students.join(', ')}</p>
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
    
    casino: () => {
        elements.modalTitle.textContent = '🎰 Казино Study Bot';
        
        elements.modalContent.innerHTML = `
            <div class="info-card">
                <h3>🎰 Ігрова система Study Bot</h3>
                <p>Казино доступне тільки в Telegram боті</p>
            </div>
            
            <div class="info-card">
                <h3>📱 Як грати?</h3>
                <p>1. Перейдіть в Telegram бота</p>
                <p>2. Натисніть кнопку "🎰 Казино"</p>
                <p>3. Поповніть баланс або грайте на бонуси</p>
            </div>
            
            <div class="info-card">
                <h3>💳 Поповнення балансу</h3>
                <p>• Мінімальний депозит: ${APP_DATA.casino.min_deposit} грн</p>
                <p>• Курс: 1 грн = ${APP_DATA.casino.exchange_rate} балів</p>
                <p>• Виведення: ${APP_DATA.casino.withdraw_rate} балів = 1 грн</p>
                <p>• Картка для оплати: ${APP_DATA.casino.admin_card}</p>
            </div>
            
            <div class="info-card">
                <h3>🎯 Правила гри</h3>
                <p>• Ставка від ${APP_DATA.casino.min_bet} до ${APP_DATA.casino.max_bet} балів</p>
                <p>• Шанс виграшу: 50/50</p>
                <p>• Множник виграшу: x${APP_DATA.casino.win_multiplier}</p>
                <p>• При виграші отримуєте подвійну ставку</p>
            </div>
            
            <div class="info-card" style="text-align: center;">
                <h3>📲 Перейти в бота</h3>
                <p>Натисніть кнопку нижче, щоб відкрити казино</p>
                <a href="https://t.me/your_study_bot" target="_blank" 
                   style="display: inline-block; background: #6366f1; color: white; 
                          padding: 12px 24px; border-radius: 8px; text-decoration: none; 
                          margin-top: 10px; font-weight: 500;">
                   🎰 Відкрити казино в боті
                </a>
            </div>
        `;
        
        utils.showModal();
    },
    
    info: () => {
        elements.modalTitle.textContent = '📋 Інформація';
        
        elements.modalContent.innerHTML = `
            <div class="info-card">
                <h3>ℹ️ Про Study Bot</h3>
                <p>Навчальний помічник для учнів 8 класу</p>
            </div>
            
            <div class="info-card">
                <h3>📞 Екстрені служби</h3>
                <ul>
                    <li>🚒 101 - Пожежна служба</li>
                    <li>🚓 102 - Поліція</li>
                    <li>🚑 103 - Швидка допомога</li>
                    <li>⚠️ 104 - Газова служба</li>
                </ul>
            </div>
            
            <div class="info-card">
                <h3>📚 Доступні функції</h3>
                <ul>
                    <li>📅 Розклад занять 8 класу</li>
                    <li>📖 Онлайн підручники 8 класу</li>
                    <li>🔔 Розклад дзвінків та перерв</li>
                    <li>👥 Міністри класу 8 класу</li>
                    <li>🎰 Казино з реальним виводом</li>
                </ul>
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

// Ініціалізація додатка
function initApp() {
    console.log('🚀 Ініціалізація додатка...');
    
    // Отримуємо дані користувача
    const user = tg.initDataUnsafe?.user;
    console.log('👤 Дані користувача:', user);
    
    // Перевіряємо доступ
    if (!user || !checkAccess(user.id)) {
        console.log('🚫 Доступ заборонено для ID:', user?.id);
        blockAccess();
        return;
    }
    
    console.log('✅ Доступ дозволено для ID:', user.id);
    
    // Якщо доступ дозволено - продовжуємо
    tg.expand();
    tg.enableClosingConfirmation();
    
    // Оновлення інформації користувача
    elements.userName.textContent = user.first_name || 'Учень';
    if (user.photo_url) elements.userPhoto.src = user.photo_url;
    
    // Обробники кнопок
    document.querySelectorAll('.nav-card').forEach(card => {
        card.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            console.log('🖱️ Клік по картці:', feature);
            if (features[feature]) {
                features[feature]();
            }
        });
        
        // Ефекти натискання
        card.style.cursor = 'pointer';
        card.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        card.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Обробники модального вікна
    elements.closeButton.addEventListener('click', utils.closeModal);
    elements.modalOverlay.addEventListener('click', function(e) {
        if (e.target === elements.modalOverlay) utils.closeModal();
    });
    
    // Обробка посилань
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.href) {
            e.preventDefault();
            window.open(e.target.href, '_blank');
        }
    });
    
    console.log('✅ Додаток успішно ініціалізовано');
}

// Запуск додатка
document.addEventListener('DOMContentLoaded', initApp);

// Обробка помилок
window.addEventListener('error', function(e) {
    console.error('❌ Помилка:', e.error);
});
