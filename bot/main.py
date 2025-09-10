import telebot
import random
from telebot.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton

# Імпорт конфігурації та утиліт
from config import TOKEN, rozklad, ebooks_8
from utils import *

bot = telebot.TeleBot(TOKEN)
user_states = {}
ebooks_8_list = list(ebooks_8.items())

# ------------------ СТАРТ ------------------
@bot.message_handler(commands=['start'])
def start(message):
    get_user_data(message.from_user)
    markup = ReplyKeyboardMarkup(resize_keyboard=True)
    markup.row(KeyboardButton("🎲 Випадковий учень"), KeyboardButton("📅 Розклад"))
    markup.row(KeyboardButton("📖 Онлайн підручники"), KeyboardButton("🔔 Розклад дзвінків"))
    markup.row(KeyboardButton("📋 Інформація"))
    
    bot.send_message(
        message.chat.id,
        "👋 Вітаю! Я навчальний бот\n\n"
        "🔹 Випадковий учень - для вчителів\n"
        "🔹 Розклад - розклад занять 5-8 класів\n"
        "🔹 Онлайн підручники - підручники 8 класу\n"
        "🔹 Розклад дзвінків - розклад уроків та перерв\n"
        "🔹 Інформація - корисна інформація",
        reply_markup=markup
    )

# ------------------ РОЗКЛАД ДЗВІНКІВ ------------------
@bot.message_handler(commands=['rozklad_bells'])
def rozklad_bells_command(message):
    show_bells_schedule(message)

@bot.message_handler(func=lambda m: m.text == "🔔 Розклад дзвінків")
def rozklad_bells_button(message):
    show_bells_schedule(message)

def show_bells_schedule(message):
    from config import ROZKLAD_BELLS
    
    bells_text = "🔔 Розклад дзвінків та перерв:\n\n"
    
    for lesson, time in ROZKLAD_BELLS:
        if "перерва" in lesson:
            bells_text += f"🔄 {lesson}: {time}\n"
        else:
            bells_text += f"📚 {lesson}: {time}\n"
    
    bells_text += "\n⏰ Загальна тривалість навчального дня: 6:50 год"
    bot.send_message(message.chat.id, bells_text)

# ------------------ ІНФОРМАЦІЯ ------------------
@bot.message_handler(func=lambda m: m.text == "📋 Інформація")
def info(message):
    info_text = (
        "ℹ️ Інформація про бота:\n\n"
        "🎲 Випадковий учень - для вчителів\n"
        "📅 Розклад - розклад занять 5-8 класів\n"
        "📖 Онлайн підручники - підручники 8 класу\n"
        "🔔 Розклад дзвінків - розклад уроків та перерв\n\n"
        "📞 Екстрені служби:\n"
        "• 101 - Пожежна\n• 102 - Поліція\n"
        "• 103 - Швидка\n• 104 - Газова"
    )
    bot.send_message(message.chat.id, info_text)

# ------------------ ОНЛАЙН ПІДРУЧНИКИ ------------------
@bot.message_handler(commands=['online_books'])
def online_books(message):
    markup = InlineKeyboardMarkup()
    markup.add(InlineKeyboardButton("8 клас", callback_data="ebook_8"))
    bot.send_message(message.chat.id, "Оберіть клас для перегляду підручників:", reply_markup=markup)

@bot.message_handler(func=lambda m: m.text == "📖 Онлайн підручники")
def online_books_btn(message):
    online_books(message)

@bot.callback_query_handler(func=lambda call: call.data == "ebook_8")
def callback_ebook_8(call):
    markup = InlineKeyboardMarkup(row_width=2)
    for i, (subject_name, url) in enumerate(ebooks_8_list):
        callback_data = f"book_{i}"
        markup.add(InlineKeyboardButton(subject_name, callback_data=callback_data))
    bot.send_message(call.message.chat.id, "Оберіть предмет для перегляду підручника 8 класу:", reply_markup=markup)

@bot.callback_query_handler(func=lambda call: call.data.startswith("book_"))
def callback_book(call):
    try:
        index = int(call.data[len("book_"):])
        if 0 <= index < len(ebooks_8_list):
            subject_name, url = ebooks_8_list[index]
            message_text = f"📚 {subject_name}\n\n🔗 Посилання на підручник:\n{url}"
            bot.send_message(call.message.chat.id, message_text)
        else:
            bot.send_message(call.message.chat.id, "❌ Підручник не знайдено.")
    except (ValueError, IndexError):
        bot.send_message(call.message.chat.id, "❌ Неправильний індекс підручника.")
    except Exception as e:
        bot.send_message(call.message.chat.id, f"❌ Сталася помилка: {e}")

# ------------------ РОЗКЛАД ------------------
@bot.message_handler(commands=['rozklad'])
def command_rozklad(message):
    markup = InlineKeyboardMarkup()
    for cls, icon in [("5","📘"),("6","📗"),("7","📕"),("8","📙")]:
        markup.add(InlineKeyboardButton(f"{icon} {cls} клас", callback_data=f"rozklad_class_{cls}"))
    bot.send_message(message.chat.id, "Оберіть клас:", reply_markup=markup)

@bot.message_handler(func=lambda m: m.text == "📅 Розклад")
def rozklad_start_btn(message):
    command_rozklad(message)

# ------------------ ВИПАДКОВИЙ УЧЕНЬ ------------------
@bot.message_handler(commands=['random_child'])
def command_random_child(message):
    user_data = get_user_data(message.from_user)
    classes = user_data["classes"]
    if not classes:
        bot.send_message(message.chat.id, "У вас ще немає класів. Спочатку додайте клас через /add_class!")
        return
    markup = InlineKeyboardMarkup()
    for c in classes.keys():
        markup.add(InlineKeyboardButton(c, callback_data=f"random_child_{sanitize_callback_data(c)}"))
    bot.send_message(message.chat.id, "Оберіть клас для випадкового вибору учня:", reply_markup=markup)

@bot.message_handler(func=lambda m: m.text == "🎲 Випадковий учень")
def random_start_btn(message):
    command_random_child(message)

# ------------------ ДОДАВАННЯ КЛАСІВ ------------------
@bot.message_handler(commands=['add_class'])
def add_class(message):
    user_states[message.from_user.id] = {'action': 'add_class'}
    bot.send_message(message.chat.id, "Введіть назву(и) нового класу(ів) через кому:")

# ------------------ ДОДАВАННЯ УЧНІВ ------------------
@bot.message_handler(commands=['add_children'])
def add_child_step(message):
    user_data = get_user_data(message.from_user)
    if not user_data["classes"]:
        bot.send_message(message.chat.id, "Спочатку додайте клас через /add_class!")
        return
    markup = InlineKeyboardMarkup()
    for c in user_data["classes"].keys():
        markup.add(InlineKeyboardButton(c, callback_data=f"add_child_{sanitize_callback_data(c)}"))
    bot.send_message(message.chat.id, "Оберіть клас для додавання учнів:", reply_markup=markup)

# ------------------ СПИСОК КЛАСІВ ------------------
@bot.message_handler(commands=['list_class'])
def list_class(message):
    user_data = get_user_data(message.from_user)
    classes = user_data["classes"]
    if not classes:
        bot.send_message(message.chat.id, "У вас ще немає класів.")
    else:
        send_long_message(bot, message.chat.id, "Ваші класи:\n" + "\n".join(classes.keys()))

# ------------------ СПИСОК УЧНІв ------------------
@bot.message_handler(commands=['list_children'])
def list_children(message):
    user_data = get_user_data(message.from_user)
    if not user_data["classes"]:
        bot.send_message(message.chat.id, "У вас ще немає класів.")
        return
    markup = InlineKeyboardMarkup()
    for c in user_data["classes"].keys():
        markup.add(InlineKeyboardButton(c, callback_data=f"list_children_{sanitize_callback_data(c)}"))
    bot.send_message(message.chat.id, "Оберіть клас для перегляду учнів:", reply_markup=markup)

# ------------------ ВИДАЛЕННЯ КЛАСУ ------------------
@bot.message_handler(commands=['delete_class'])
def delete_class_step(message):
    user_data = get_user_data(message.from_user)
    if not user_data["classes"]:
        bot.send_message(message.chat.id, "У вас немає класів для видалення.")
        return
    markup = InlineKeyboardMarkup()
    for c in user_data["classes"].keys():
        markup.add(InlineKeyboardButton(c, callback_data=f"delete_class_{sanitize_callback_data(c)}"))
    bot.send_message(message.chat.id, "Оберіть клас для видалення:", reply_markup=markup)

# ------------------ ВИДАЛЕННЯ УЧНЯ ------------------
@bot.message_handler(commands=['delete_child'])
def delete_child_step(message):
    user_data = get_user_data(message.from_user)
    if not user_data["classes"]:
        bot.send_message(message.chat.id, "У вас немає класів!")
        return
    markup = InlineKeyboardMarkup()
    for c in user_data["classes"].keys():
        markup.add(InlineKeyboardButton(c, callback_data=f"delete_child_class_{sanitize_callback_data(c)}"))
    bot.send_message(message.chat.id, "Оберіть клас для видалення учня:", reply_markup=markup)

# ------------------ CALLBACK ОБРОБКА ------------------
@bot.callback_query_handler(func=lambda call: True)
def callback_handler(call):
    data_file = load_data()
    user_id = str(call.from_user.id)
    user_data = get_user_data(call.from_user)
    classes = user_data["classes"]
    data = call.data

    # Обробка розкладу
    if data.startswith("rozklad_class_"):
        class_no = data[len("rozklad_class_"):]
        days = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"]
        markup = InlineKeyboardMarkup()
        for d in days:
            day_key = d.replace("'", "").replace(" ", "_")
            markup.add(InlineKeyboardButton(d, callback_data=f"rozklad_day_{class_no}_{day_key}"))
        bot.send_message(call.message.chat.id, f"📅 Розклад — {class_no} клас. Оберіть день:", reply_markup=markup)
        return

    if data.startswith("rozklad_day_"):
        parts = data.split("_", 3)
        try:
            _, _, class_no, day_key = parts
        except ValueError:
            bot.send_message(call.message.chat.id, "❌ Невірна команда розкладу.")
            return
            
        class_sched = rozklad.get(class_no)
        if not class_sched:
            bot.send_message(call.message.chat.id, f"❌ Розклад для {class_no} класу не знайдено.")
            return
            
        found_day = None
        for d in class_sched.keys():
            key = d.replace("'", "").replace(" ", "_")
            if key == day_key:
                found_day = d
                break
                
        if not found_day:
            bot.send_message(call.message.chat.id, "❌ Не знайдено розкладу для цього дня.")
            return
            
        lessons = class_sched.get(found_day, [])
        if not lessons:
            bot.send_message(call.message.chat.id, f"ℹ️ У {class_no} класі немає уроків на {found_day}.")
            return
            
        text = f"📚 Розклад для {class_no} класу ({found_day}):\n"
        for i, lesson in enumerate(lessons, start=1):
            text += f"{i}. {lesson}\n"
        send_long_message(bot, call.message.chat.id, text)
        return

    # Випадковий учень
    if data.startswith("random_child_"):
        class_name_encoded = data[len("random_child_"):]
        class_name = None
        for c in classes.keys():
            if sanitize_callback_data(c) == class_name_encoded:
                class_name = c
                break
        
        if class_name and class_name in classes and classes[class_name]:
            chosen = random.choice(classes[class_name])
            bot.send_message(call.message.chat.id, f"🎉 Випадково обрано: {chosen} 🎉")
        else:
            bot.send_message(call.message.chat.id, f"❌ У класі {class_name} немає учнів!")
        return

    # Інші callback-и (додавання, видалення, список)
    if data.startswith("add_child_"):
        class_name_encoded = data[len("add_child_"):]
        class_name = None
        for c in classes.keys():
            if sanitize_callback_data(c) == class_name_encoded:
                class_name = c
                break
        
        if class_name:
            user_states[int(user_id)] = {'action': 'add_child_wait_name', 'class': class_name}
            bot.send_message(call.message.chat.id, f"Введіть ім'я(а) учня(ів) для класу {class_name} через кому:")
        else:
            bot.send_message(call.message.chat.id, "❌ Клас не знайдено.")
        return

    if data.startswith("list_children_"):
        class_name_encoded = data[len("list_children_"):]
        class_name = None
        for c in classes.keys():
            if sanitize_callback_data(c) == class_name_encoded:
                class_name = c
                break
        
        if class_name and class_name in classes and classes[class_name]:
            send_long_message(bot, call.message.chat.id, f"👥 Учні класу {class_name}:\n" + "\n".join(classes[class_name]))
        else:
            bot.send_message(call.message.chat.id, f"❌ У класі {class_name} ще немає учнів.")
        return

    if data.startswith("delete_class_"):
        class_name_encoded = data[len("delete_class_"):]
        class_name = None
        for c in classes.keys():
            if sanitize_callback_data(c) == class_name_encoded:
                class_name = c
                break
        
        if class_name and class_name in classes:
            classes.pop(class_name, None)
            data_file[user_id] = user_data
            save_data(data_file)
            bot.send_message(call.message.chat.id, f"✅ Клас {class_name} видалено!")
        else:
            bot.send_message(call.message.chat.id, "❌ Клас не знайдено!")
        return

    if data.startswith("delete_child_class_"):
        class_name_encoded = data[len("delete_child_class_"):]
        class_name = None
        for c in classes.keys():
            if sanitize_callback_data(c) == class_name_encoded:
                class_name = c
                break
        
        if class_name and class_name in classes and classes[class_name]:
            markup = InlineKeyboardMarkup()
            for student in classes[class_name]:
                markup.add(InlineKeyboardButton(student, callback_data=f"delete_child_{sanitize_callback_data(class_name)}_{sanitize_callback_data(student)}"))
            bot.send_message(call.message.chat.id, f"Оберіть учня для видалення з класу {class_name}:", reply_markup=markup)
        else:
            bot.send_message(call.message.chat.id, f"❌ У класі {class_name} немає учнів!")
        return

    if data.startswith("delete_child_"):
        try:
            parts = data.split("_", 2)
            if len(parts) < 3:
                raise ValueError
            _, class_name_encoded, student_name_encoded = parts
        except ValueError:
            bot.send_message(call.message.chat.id, "❌ Невірний формат даних.")
            return
        
        class_name = None
        student_name = None
        
        for c in classes.keys():
            if sanitize_callback_data(c) == class_name_encoded:
                class_name = c
                break
        
        if class_name and class_name in classes:
            for s in classes[class_name]:
                if sanitize_callback_data(s) == student_name_encoded:
                    student_name = s
                    break
        
        if class_name and student_name and student_name in classes[class_name]:
            classes[class_name].remove(student_name)
            data_file[user_id] = user_data
            save_data(data_file)
            bot.send_message(call.message.chat.id, f"✅ Учень {student_name} видалений з класу {class_name}!")
        else:
            bot.send_message(call.message.chat.id, f"❌ Учня не знайдено в класі {class_name}!")
        user_states.pop(int(user_id), None)
        return

# ------------------ ОБРОБКА СТАНІВ ------------------
@bot.message_handler(func=lambda m: m.from_user.id in user_states)
def handle_state_messages(message):
    state = user_states.get(message.from_user.id)
    if not message.text or message.text.startswith("/") or not is_valid_name(message.text):
        bot.send_message(message.chat.id, "❌ Некоректна назва. Спробуйте ще раз.")
        return
        
    data = load_data()
    user_data = get_user_data(message.from_user)
    classes = user_data["classes"]

    if state['action'] == 'add_class':
        added = []
        for c in map(str.strip, message.text.split(",")):
            if is_valid_name(c) and c not in classes:
                classes[c] = []
                added.append(c)
        data[str(message.from_user.id)] = user_data
        save_data(data)
        if added:
            send_long_message(bot, message.chat.id, f"✅ Додані класи: {', '.join(added)}")
        else:
            bot.send_message(message.chat.id, "❌ Всі ці класи вже існують або недопустимі.")
        user_states.pop(message.from_user.id, None)

    elif state['action'] == 'add_child_wait_name':
        class_name = state['class']
        if class_name not in classes:
            bot.send_message(message.chat.id, f"❌ Клас {class_name} не знайдено.")
            user_states.pop(message.from_user.id, None)
            return
            
        added = [s for s in map(str.strip, message.text.split(",")) if is_valid_name(s)]
        if added:
            classes[class_name].extend(added)
            data[str(message.from_user.id)] = user_data
            save_data(data)
            send_long_message(bot, message.chat.id, f"✅ Додані учні до {class_name}: {', '.join(added)}")
        else:
            bot.send_message(message.chat.id, "❌ Не додано жодного учня. Перевірте імена.")
        user_states.pop(message.from_user.id, None)

# Додайте цю функцію для генерації посилання на Mini App
def generate_mini_app_url():
    return "https://telegram-school-bot.vercel.app/"

# Оновіть функцію start
@bot.message_handler(commands=['start'])
def start(message):
    get_user_data(message.from_user)
    markup = ReplyKeyboardMarkup(resize_keyboard=True)
    markup.row(KeyboardButton("🎲 Випадковий учень"), KeyboardButton("📅 Розклад"))
    markup.row(KeyboardButton("📖 Онлайн підручники"), KeyboardButton("🔔 Розклад дзвінків"))
    markup.row(KeyboardButton("📋 Інформація"), KeyboardButton("📱 Mini App"))
    
    mini_app_url = generate_mini_app_url()
    
    bot.send_message(
        message.chat.id,
        f"👋 Вітаю! Я навчальний бот\n\n"
        f"🔹 Випадковий учень - для вчителів\n"
        f"🔹 Розклад - розклад занять 5-8 класів\n"
        f"🔹 Онлайн підручники - підручники 8 класу\n"
        f"🔹 Розклад дзвінків - розклад уроків та перерв\n"
        f"🔹 Інформація - корисна інформація\n"
        f"🔹 Mini App - повноцінний веб-додаток\n\n"
        f"🌐 Mini App: {mini_app_url}",
        reply_markup=markup
    )

# Додайте обробник для Mini App
@bot.message_handler(func=lambda m: m.text == "📱 Mini App")
def mini_app_button(message):
    mini_app_url = generate_mini_app_url()
    markup = InlineKeyboardMarkup()
    markup.add(InlineKeyboardButton("📱 Відкрити Mini App", url=mini_app_url))
    
    bot.send_message(
        message.chat.id,
        f"🌐 Натисніть кнопку нижче, щоб відкрити Mini App:\n{mini_app_url}",
        reply_markup=markup
    )

# Додайте команду для прямого посилання
@bot.message_handler(commands=['webapp'])
def webapp_command(message):
    mini_app_url = generate_mini_app_url()
    markup = InlineKeyboardMarkup()
    markup.add(InlineKeyboardButton("📱 Відкрити Mini App", url=mini_app_url))
    
    bot.send_message(
        message.chat.id,
        f"🌐 Mini App доступний за посиланням:\n{mini_app_url}",
        reply_markup=markup
    )

# ------------------ НЕВІДОМІ КОМАНДИ ------------------
@bot.message_handler(func=lambda m: m.text and m.text.startswith("/"))
def unknown_command(message):
    bot.send_message(message.chat.id, "❌ Невідома команда. Використовуйте /start для перегляду доступних команд")

# ------------------ ОБРОБКА ІНШИХ ПОВІДОМЛЕНЬ ------------------
@bot.message_handler(func=lambda m: True)
def handle_other_messages(message):
    if message.text.startswith('/'):
        unknown_command(message)
    else:
        bot.send_message(message.chat.id, "ℹ️ Використовуйте кнопки меню або команду /start для навігації")

# ------------------ ЗАПУСК ------------------
if __name__ == "__main__":
    print("🚀 Навчальний бот запущено!")
    print("✅ Модуль навчання: активовано")
    print("✅ Модуль розкладу: активовано")
    print("✅ Модуль дзвінків: активовано")
    print("🔔 Бот готовий до роботи...")
    
    bot.infinity_polling()
