export const AVATAR_URL =
  "https://cdn.poehali.dev/projects/32698be0-413a-4782-920c-4776b902959c/files/cded7423-97aa-45cd-88ce-13ccaa21b021.jpg";

export const contacts = [
  { id: 1, name: "Алекс Волков", status: "online", lastSeen: "в сети", avatar: "АВ", color: "#00e5ff" },
  { id: 2, name: "Мария Светлова", status: "online", lastSeen: "в сети", avatar: "МС", color: "#e91e8c" },
  { id: 3, name: "Дмитрий Крылов", status: "offline", lastSeen: "1 ч назад", avatar: "ДК", color: "#9c27b0" },
  { id: 4, name: "Анна Орлова", status: "online", lastSeen: "в сети", avatar: "АО", color: "#00e676" },
  { id: 5, name: "Сергей Морев", status: "offline", lastSeen: "вчера", avatar: "СМ", color: "#ff6d00" },
  { id: 6, name: "Елена Захарова", status: "away", lastSeen: "10 мин назад", avatar: "ЕЗ", color: "#ffeb3b" },
];

export const chats = [
  { id: 1, name: "Алекс Волков", msg: "🔐 Зашифровано", time: "14:32", unread: 3, avatar: "АВ", color: "#00e5ff", online: true },
  { id: 2, name: "Команда дизайна", msg: "Макеты готовы!", time: "13:15", unread: 12, avatar: "КД", color: "#9c27b0", online: false, group: true },
  { id: 3, name: "Мария Светлова", msg: "Хорошо, увидимся!", time: "12:04", unread: 0, avatar: "МС", color: "#e91e8c", online: true },
  { id: 4, name: "Анна Орлова", msg: "🔐 Зашифровано", time: "11:30", unread: 1, avatar: "АО", color: "#00e676", online: true },
  { id: 5, name: "Проект Nova", msg: "Дедлайн завтра", time: "10:00", unread: 5, avatar: "ПН", color: "#ff6d00", online: false, group: true },
  { id: 6, name: "Сергей Морев", msg: "Окей!", time: "вчера", unread: 0, avatar: "СМ", color: "#ff9800", online: false },
];

export const initMessages = [
  { id: 1, text: "Привет! Как дела с проектом?", time: "14:20", from: "them", encrypted: true },
  { id: 2, text: "Всё отлично! Мы используем сквозное шифрование, так что никто не читает 😄", time: "14:21", from: "me", encrypted: true },
  { id: 3, text: "Видел последние макеты? Дизайн просто огонь!", time: "14:25", from: "them", encrypted: true },
  { id: 4, text: "Да, уже смотрел. Отправляю файлы через минуту.", time: "14:28", from: "me", encrypted: true },
  { id: 5, text: "🔐 Это сообщение защищено сквозным шифрованием. Только вы и Алекс можете его прочитать.", time: "14:30", from: "system", encrypted: false },
  { id: 6, text: "Жду!", time: "14:32", from: "them", encrypted: true },
];

export const notifications = [
  { id: 1, type: "msg", text: "Мария написала вам сообщение", time: "5 мин", read: false, color: "#e91e8c" },
  { id: 2, type: "group", text: "Команда дизайна: 12 новых сообщений", time: "15 мин", read: false, color: "#9c27b0" },
  { id: 3, type: "security", text: "Новое устройство подключилось к аккаунту", time: "1 ч", read: false, color: "#00e5ff" },
  { id: 4, type: "contact", text: "Алекс Волков добавил вас в контакты", time: "2 ч", read: true, color: "#00e676" },
  { id: 5, type: "msg", text: "Анна Орлова отправила фото", time: "3 ч", read: true, color: "#00e676" },
  { id: 6, type: "security", text: "Шифрование обновлено до версии 2.0", time: "вчера", read: true, color: "#00e5ff" },
];

export const gallery = [
  { id: 1, from: "Алекс Волков", time: "сегодня", gradient: "from-cyan-500 to-violet-500" },
  { id: 2, from: "Мария Светлова", time: "вчера", gradient: "from-pink-500 to-orange-500" },
  { id: 3, from: "Команда дизайна", time: "2 дня", gradient: "from-violet-500 to-cyan-500" },
  { id: 4, from: "Анна Орлова", time: "3 дня", gradient: "from-green-400 to-cyan-500" },
  { id: 5, from: "Сергей Морев", time: "неделя", gradient: "from-orange-500 to-pink-500" },
  { id: 6, from: "Проект Nova", time: "неделя", gradient: "from-cyan-400 to-green-400" },
];

export type Tab = "chats" | "contacts" | "search" | "notifications" | "gallery" | "profile" | "settings";
export type Chat = typeof chats[0];
export type Message = typeof initMessages[0];
