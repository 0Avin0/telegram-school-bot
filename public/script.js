// Ініціалізація Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Елементи DOM
const userNameElement = document.getElementById('user-name');
const userPhotoMainElement = document.getElementById('user-photo-main');
const appContainer = document.querySelector('.app-container');

// Список дозволених користувачів (ID) - ЗАМІНИТИ НА РЕАЛЬНІ ID
const ALLOWED_USERS = [
    123456789,  // Замінити на реальні ID користувачів
    987654321,  // Додати потрібні ID
    555555555   // Приклад ID
];

// Перевірка доступу
function checkAccess(userId) {
    return ALLOWED_USERS.includes(userId);
}

// Блокування доступу
function blockAccess() {
    appContainer.innerHTML = `
        <div class="access-denied">
            <div class="denied-content">
                <div class="denied-icon">⛔</div>
                <h2>Доступ заборонено</h2>
                <p>Ви не маєте дозволу на використання цього додатку.</p>
                <p>Зверніться до адміністратора для отримання доступу.</p>
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
        background-color: #f8f9fa;
        padding: 20px;
    }
    
    .denied-content {
        text-align: center;
        background: white;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 100%;
    }
    
    .denied-icon {
        font-size: 4rem;
        margin-bottom: 20px;
    }
    
    .denied-content h2 {
        color: #dc3545;
        margin-bottom: 15px;
    }
    
    .denied-content p {
        color: #6c757d;
        margin-bottom: 10px;
    }
`;

// Додаємо стилі для блокування
const styleSheet = document.createElement('style');
styleSheet.textContent = blockStyles;
document.head.appendChild(styleSheet);

// Ініціалізація додатку
function initApp() {
    // Отримуємо дані користувача з Telegram
    const user = tg.initDataUnsafe.user;
    
    if (!user || !checkAccess(user.id)) {
        blockAccess();
        return;
    }
    
    // Якщо доступ дозволено - продовжуємо
    userNameElement.textContent = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Учень';
    if (user.photo_url) {
        userPhotoMainElement.src = user.photo_url;
    }
    
    // Додаємо обробники подій для карток
    document.querySelectorAll('.nav-card').forEach(card => {
        card.addEventListener('click', () => {
            const feature = card.getAttribute('data-feature');
            openFeature(feature);
        });
    });
}

// ... (решта коду script.js залишається без змін, але тепер буде виконуватися
// тільки для дозволених користувачів)

// Ініціалізація додатку при завантаженні
document.addEventListener('DOMContentLoaded', initApp);
