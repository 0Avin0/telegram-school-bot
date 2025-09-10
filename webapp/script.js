// Ініціалізація Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Елементи DOM
const userNameElement = document.getElementById('user-name');
const userIdElement = document.getElementById('user-id');
const userPhotoElement = document.getElementById('user-photo');
const featureContentElement = document.getElementById('feature-content');

// Дані розкладу (синхронізовані з config.py)
const rozklad = {
    "5": {
        "Понеділок": ["Українська мова","Математика","Англійська мова","Мистецтво","Українська література","Пізнаємо природу"],
        "Вівторок": ["Зарубіжна література","Укр. мова / нім. мова","Математика","Фізична культура","Нім. мова / укр. мова","Технології","Технології"],
        "Середа": ["Англійська мова","Інформатика / нім. мова","Математика","Фізична культура","Українська мова","Нім. мова / інформатика"],
        "Четвер": ["Українська література","Математика","Дослід. історію","Англійська мова","Здоров'я, безпека","Мистецтво"],
        "П'ятниця": ["Фізична культура","Математика","Етика","Українська мова","Пізнаємо природу","Англійська мова"]
    },
    "6": {
        "Понеділок": ["Інформатика / нім. мова","Українська мова","Математика","Нім.мова/інформат.","Дослід. історію","Мистецтво","Фізична культура"],
        "Вівторок": ["Технології","Технології","Українська мова","Математика","Зарубіжна література","Мистецтво","Зарубіжна література"],
        "Середа": ["Географія","Математика","Фізична культура","Дослід. історію","Нім. мова / інформатика","Англійська мова","Інформатика/нім.мова"],
        "Четвер": ["Пізнаємо природу","Українська мова","Математика","Здоров'я, безпека","Фізична культура","Українська література","Етика"],
        "П'ятниця": ["Географія","Пізнаємо природу","Англійська мова","Математика","Українська мова","Українська література"]
    },
    "7": {
        "Понеділок": ["Алгебра","Біологія","Німецька мова","Українська література","Англійська мова","Географія","Мистецтво"],
        "Вівторок": ["Українська мова","Зарубіжна література","Інформатика/Англ.мова","Фізика","Англ. мова / інформатика","Зарубіжна література","Фізична культура"],
        "Середа": ["Геометрія","Біологія","Німецька мова","Алгебра","Історія України","Українська мова","Здоров'я, безпека"],
        "Четвер": ["Географія","Хімія","Українська література","Фізична культура","Геометрія","Інформатика / англ. мова","Англ. мова / інформатика"],
        "П'ятниця": ["Алгебра","Українська мова","Фізика","Всесвітня історія","Технології","Біологія","Фізична культура"]
    },
    "8": {
        "Понеділок": ["Історія України","Підприємство і Фінансова грамотність","Українська мова","Алгебра","Мистецтво","Українська література","Фізика"],
        "Вівторок": ["Фізична культура","Географія","Зарубіжна література","Німецька мова","Геометрія","Інформатика / англ. мова","Англ. мова / інформатика"],
        "Середа": ["Хімія","Всесвітня історія","Українська мова","Біологія","Алгебра","Фізика","Фізична культура"],
        "Четвер": ["Геометрія","Англійська мова","Німецька мова","Українська література","Географія","Алгебра","Біологія","Фізична культура"],
        "П'ятниця": ["Українська мова","Історія України","Хімія","Інформатика / англ. мова","Англ.мова/інформатика","Технології","Здоров'я, безпека"]
    }
};

// Посилання на підручники 8 класу (синхронізовані з config.py)
const ebooks_8 = {
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
};

// Розклад дзвінків та перерв (синхронізований з config.py)
const ROZKLAD_BELLS = [
    ("1 урок", "8:30-9:10"),
    ("перерва", "9:10-9:20 (10 хв)"),
    ("2 урок", "9:20-10:00"), 
    ("перерва", "10:00-10:20 (20 хв)"),
    ("3 урок", "10:20-11:00"),
    ("перерва", "11:00-11:15 (15 хв)"),
    ("4 урок", "11:15-11:55"),
    ("перерва", "11:55-12:10 (15 хв)"),
    ("5 урок", "12:10-12:50"),
    ("перерва", "12:50-13:00 (10 хв)"),
    ("6 урок", "13:00-13:40"),
    ("перерва", "13:40-13:50 (10 хв)"),
    ("7 урок", "13:50-14:30"),
    ("перерва", "14:30-14:40 (10 хв)"),
    ("8 урок", "14:40-15:20")
];

// Ініціалізація користувача
function initUser() {
    const user = tg.initDataUnsafe.user;
    if (user) {
        userNameElement.textContent = `${user.first_name} ${user.last_name || ''}`;
        userIdElement.textContent = `ID: ${user.id}`;
        
        if (user.photo_url) {
            userPhotoElement.src = user.photo_url;
        } else {
            userPhotoElement.src = 'assets/default-avatar.png';
        }
    } else {
        userNameElement.textContent = 'Користувач Telegram';
        userPhotoElement.src = 'assets/default-avatar.png';
    }
}

// Функції для відображення контенту функцій
function showFeature(feature) {
    featureContentElement.classList.remove('hidden');
    
    switch(feature) {
        case 'schedule':
            showSchedule();
            break;
        case 'homework':
            showHomework();
            break;
        case 'grades':
            showGrades();
            break;
        case 'messages':
            showMessages();
            break;
        case 'random':
            showRandomStudent();
            break;
        case 'books':
            showBooks();
            break;
        case 'bells':
            showBells();
            break;
    }
}

function showSchedule() {
    featureContentElement.innerHTML = `
        <h2>📅 Розклад занять</h2>
        <div class="class-selector">
            <select id="class-select" onchange="updateSchedule()">
                <option value="5">5 клас</option>
                <option value="6">6 клас</option>
                <option value="7">7 клас</option>
                <option value="8">8 клас</option>
            </select>
        </div>
        <div class="day-selector" id="day-selector">
            <button class="day-button" onclick="selectDay('Понеділок')">Понеділок</button>
            <button class="day-button" onclick="selectDay('Вівторок')">Вівторок</button>
            <button class="day-button" onclick="selectDay('Середа')">Середа</button>
            <button class="day-button" onclick="selectDay('Четвер')">Четвер</button>
            <button class="day-button" onclick="selectDay('П\'ятниця')">П'ятниця</button>
        </div>
        <div id="schedule-content"></div>
    `;
    
    // Встановлюємо перший день як активний
    selectDay('Понеділок');
}

function updateSchedule() {
    const classSelect = document.getElementById('class-select');
    const selectedClass = classSelect.value;
    const selectedDay = document.querySelector('.day-button.active')?.dataset.day || 'Понеділок';
    
    displayScheduleForDay(selectedClass, selectedDay);
}

function selectDay(day) {
    // Видаляємо активний клас з усіх кнопок
    const buttons = document.querySelectorAll('.day-button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.dataset.day = btn.textContent;
    });
    
    // Додаємо активний клас до обраної кнопки
    const selectedButton = Array.from(buttons).find(btn => btn.textContent === day);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    
    // Оновлюємо розклад
    const classSelect = document.getElementById('class-select');
    const selectedClass = classSelect ? classSelect.value : '5';
    displayScheduleForDay(selectedClass, day);
}

function displayScheduleForDay(classNum, day) {
    const scheduleContent = document.getElementById('schedule-content');
    const lessons = rozklad[classNum]?.[day] || [];
    
    if (lessons.length === 0) {
        scheduleContent.innerHTML = `<p>На ${day} у ${classNum} класі немає уроків.</p>`;
        return;
    }
    
    let html = `<h3>${day} - ${classNum} клас</h3><table class="schedule-table"><tr><th>№</th><th>Урок</th></tr>`;
    
    lessons.forEach((lesson, index) => {
        html += `<tr><td>${index + 1}</td><td>${lesson}</td></tr>`;
    });
    
    html += '</table>';
    scheduleContent.innerHTML = html;
}

function showHomework() {
    featureContentElement.innerHTML = `
        <h2>📚 Домашні завдання</h2>
        <p>Функціонал домашніх завдань буде додано найближчим часом.</p>
        <p>Тут ви зможете переглядати та додавати домашні завдання.</p>
    `;
}

function showGrades() {
    featureContentElement.innerHTML = `
        <h2>📊 Оцінки</h2>
        <p>Функціонал оцінок буде додано найближчим часом.</p>
        <p>Тут ви зможете переглядати свої оцінки з різних предметів.</p>
    `;
}

function showMessages() {
    featureContentElement.innerHTML = `
        <h2>✉️ Повідомлення</h2>
        <p>Функціонал повідомлень буде додано найближчим часом.</p>
        <p>Тут ви зможете спілкуватися з вчителями.</p>
    `;
}

function showRandomStudent() {
    featureContentElement.innerHTML = `
        <h2>🎲 Випадковий учень</h2>
        <p>Ця функція доступна тільки для вчителів у повній версії бота.</p>
        <p>У мобільному додатку Telegram використовуйте команду /random_child</p>
        <p>або кнопку "🎲 Випадковий учень" в меню бота.</p>
    `;
}

function showBooks() {
    let html = `<h2>📖 Онлайн підручники 8 класу</h2><ul class="book-list">`;
    
    for (const [subject, url] of Object.entries(ebooks_8)) {
        html += `
            <li class="book-item">
                <a href="${url}" target="_blank" class="book-link">${subject}</a>
            </li>
        `;
    }
    
    html += '</ul>';
    featureContentElement.innerHTML = html;
}

function showBells() {
    let html = `<h2>🔔 Розклад дзвінків та перерв</h2><ul class="bells-list">`;
    
    ROZKLAD_BELLS.forEach(([lesson, time]) => {
        const isBreak = lesson.includes('перерва');
        html += `
            <li class="bell-item">
                <span>${isBreak ? '🔄' : '📚'} ${lesson}</span>
                <span class="bell-time">${time}</span>
            </li>
        `;
    });
    
    html += `
        </ul>
        <p><strong>⏰ Загальна тривалість навчального дня:</strong> 6:50 год</p>
    `;
    
    featureContentElement.innerHTML = html;
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    initUser();
});
