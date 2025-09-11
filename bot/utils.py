import json
import re

# Імпорт конфігурації
from config import INFO_FILE

# Функції для роботи з даними
def load_data():
    try:
        with open(INFO_FILE, "r", encoding="utf-8") as f:
            content = f.read().strip()
            return json.loads(content) if content else {}
    except:
        return {}

def save_data(data):
    with open(INFO_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def get_user_data(user):
    data = load_data()
    uid = str(user.id)
    if uid not in data:
        data[uid] = {
            "telegram_id": user.id,
            "username": user.username or "",
            "first_name": user.first_name or "",
            "phone": getattr(user, "phone_number", ""),
            "classes": {}
        }
        save_data(data)
    return data[uid]

def send_long_message(bot, chat_id, text):
    for i in range(0, len(text), 4000):
        bot.send_message(chat_id, text[i:i+4000])

def is_valid_name(name):
    from config import FORBIDDEN_NAMES
    return name.strip() not in FORBIDDEN_NAMES and not name.strip().startswith("/")

def sanitize_callback_data(text):
    cleaned = re.sub(r'[^a-zA-Z0-9_]', '_', text)
    return cleaned[:30]
