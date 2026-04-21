import { useState } from "react";
import Icon from "@/components/ui/icon";

const AVATAR_URL = "https://cdn.poehali.dev/projects/32698be0-413a-4782-920c-4776b902959c/files/cded7423-97aa-45cd-88ce-13ccaa21b021.jpg";

const contacts = [
  { id: 1, name: "Алекс Волков", status: "online", lastSeen: "в сети", avatar: "АВ", color: "#00e5ff" },
  { id: 2, name: "Мария Светлова", status: "online", lastSeen: "в сети", avatar: "МС", color: "#e91e8c" },
  { id: 3, name: "Дмитрий Крылов", status: "offline", lastSeen: "1 ч назад", avatar: "ДК", color: "#9c27b0" },
  { id: 4, name: "Анна Орлова", status: "online", lastSeen: "в сети", avatar: "АО", color: "#00e676" },
  { id: 5, name: "Сергей Морев", status: "offline", lastSeen: "вчера", avatar: "СМ", color: "#ff6d00" },
  { id: 6, name: "Елена Захарова", status: "away", lastSeen: "10 мин назад", avatar: "ЕЗ", color: "#ffeb3b" },
];

const chats = [
  { id: 1, name: "Алекс Волков", msg: "🔐 Зашифровано", time: "14:32", unread: 3, avatar: "АВ", color: "#00e5ff", online: true },
  { id: 2, name: "Команда дизайна", msg: "Макеты готовы!", time: "13:15", unread: 12, avatar: "КД", color: "#9c27b0", online: false, group: true },
  { id: 3, name: "Мария Светлова", msg: "Хорошо, увидимся!", time: "12:04", unread: 0, avatar: "МС", color: "#e91e8c", online: true },
  { id: 4, name: "Анна Орлова", msg: "🔐 Зашифровано", time: "11:30", unread: 1, avatar: "АО", color: "#00e676", online: true },
  { id: 5, name: "Проект Nova", msg: "Дедлайн завтра", time: "10:00", unread: 5, avatar: "ПН", color: "#ff6d00", online: false, group: true },
  { id: 6, name: "Сергей Морев", msg: "Окей!", time: "вчера", unread: 0, avatar: "СМ", color: "#ff9800", online: false },
];

const initMessages = [
  { id: 1, text: "Привет! Как дела с проектом?", time: "14:20", from: "them", encrypted: true },
  { id: 2, text: "Всё отлично! Мы используем сквозное шифрование, так что никто не читает 😄", time: "14:21", from: "me", encrypted: true },
  { id: 3, text: "Видел последние макеты? Дизайн просто огонь!", time: "14:25", from: "them", encrypted: true },
  { id: 4, text: "Да, уже смотрел. Отправляю файлы через минуту.", time: "14:28", from: "me", encrypted: true },
  { id: 5, text: "🔐 Это сообщение защищено сквозным шифрованием. Только вы и Алекс можете его прочитать.", time: "14:30", from: "system", encrypted: false },
  { id: 6, text: "Жду!", time: "14:32", from: "them", encrypted: true },
];

const notifications = [
  { id: 1, type: "msg", text: "Мария написала вам сообщение", time: "5 мин", read: false, color: "#e91e8c" },
  { id: 2, type: "group", text: "Команда дизайна: 12 новых сообщений", time: "15 мин", read: false, color: "#9c27b0" },
  { id: 3, type: "security", text: "Новое устройство подключилось к аккаунту", time: "1 ч", read: false, color: "#00e5ff" },
  { id: 4, type: "contact", text: "Алекс Волков добавил вас в контакты", time: "2 ч", read: true, color: "#00e676" },
  { id: 5, type: "msg", text: "Анна Орлова отправила фото", time: "3 ч", read: true, color: "#00e676" },
  { id: 6, type: "security", text: "Шифрование обновлено до версии 2.0", time: "вчера", read: true, color: "#00e5ff" },
];

const gallery = [
  { id: 1, from: "Алекс Волков", time: "сегодня", gradient: "from-cyan-500 to-violet-500" },
  { id: 2, from: "Мария Светлова", time: "вчера", gradient: "from-pink-500 to-orange-500" },
  { id: 3, from: "Команда дизайна", time: "2 дня", gradient: "from-violet-500 to-cyan-500" },
  { id: 4, from: "Анна Орлова", time: "3 дня", gradient: "from-green-400 to-cyan-500" },
  { id: 5, from: "Сергей Морев", time: "неделя", gradient: "from-orange-500 to-pink-500" },
  { id: 6, from: "Проект Nova", time: "неделя", gradient: "from-cyan-400 to-green-400" },
];

type Tab = "chats" | "contacts" | "search" | "notifications" | "gallery" | "profile" | "settings";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [activeChat, setActiveChat] = useState<typeof chats[0] | null>(chats[0]);
  const [inputMsg, setInputMsg] = useState("");
  const [chatMessages, setChatMessages] = useState(initMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications2FA, setNotifications2FA] = useState(true);
  const [notifMsg, setNotifMsg] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [theme, setTheme] = useState("dark");

  const navItems: { id: Tab; icon: string; label: string }[] = [
    { id: "chats", icon: "MessageSquare", label: "Чаты" },
    { id: "contacts", icon: "Users", label: "Контакты" },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "notifications", icon: "Bell", label: "Уведомл." },
    { id: "gallery", icon: "Image", label: "Галерея" },
    { id: "profile", icon: "User", label: "Профиль" },
    { id: "settings", icon: "Settings", label: "Настройки" },
  ];

  const unreadCount = chats.reduce((s, c) => s + c.unread, 0);
  const unreadNotif = notifications.filter(n => !n.read).length;

  const sendMessage = () => {
    if (!inputMsg.trim()) return;
    const newMsg = {
      id: chatMessages.length + 1,
      text: inputMsg,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      from: "me" as const,
      encrypted: true,
    };
    setChatMessages(prev => [...prev, newMsg]);
    setInputMsg("");
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredChats = chats.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "'Golos Text', sans-serif", background: "hsl(222, 25%, 6%)" }}>

      {/* Sidebar Navigation */}
      <aside className="w-20 flex flex-col items-center py-6 gap-2 shrink-0 relative z-10"
        style={{ background: "rgba(0,0,0,0.4)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mb-4 flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center animate-pulse-glow"
            style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0, #e91e8c)" }}>
            <span className="text-white font-black text-sm">N</span>
          </div>
        </div>

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="relative w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 group"
            style={{
              background: activeTab === item.id
                ? "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(156,39,176,0.15))"
                : "transparent",
              border: activeTab === item.id
                ? "1px solid rgba(0,229,255,0.3)"
                : "1px solid transparent",
              boxShadow: activeTab === item.id ? "0 0 20px rgba(0,229,255,0.15)" : "none",
            }}
          >
            <Icon
              name={item.icon}
              size={20}
              style={{ color: activeTab === item.id ? "#00e5ff" : "rgba(255,255,255,0.4)" }}
              className="transition-all duration-300 group-hover:scale-110"
            />
            <span className="text-[9px] font-medium"
              style={{ color: activeTab === item.id ? "#00e5ff" : "rgba(255,255,255,0.35)" }}>
              {item.label}
            </span>
            {item.id === "chats" && unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)" }}>
                {unreadCount}
              </span>
            )}
            {item.id === "notifications" && unreadNotif > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ background: "#e91e8c" }}>
                {unreadNotif}
              </span>
            )}
          </button>
        ))}

        <div className="mt-auto">
          <img src={AVATAR_URL} alt="me" className="w-10 h-10 rounded-2xl object-cover"
            style={{ border: "2px solid rgba(0,229,255,0.4)", boxShadow: "0 0 15px rgba(0,229,255,0.2)" }} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">

        {/* CHATS */}
        {activeTab === "chats" && (
          <>
            <div className="w-80 flex flex-col shrink-0"
              style={{ borderRight: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
              <div className="p-4 pb-3">
                <h2 className="text-xl font-bold mb-3" style={{ color: "#00e5ff" }}>Сообщения</h2>
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
                  <input
                    placeholder="Поиск чатов..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
                {chats.map((chat, i) => (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChat(chat)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 text-left"
                    style={{
                      background: activeChat?.id === chat.id
                        ? "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(156,39,176,0.1))"
                        : "transparent",
                      border: activeChat?.id === chat.id ? "1px solid rgba(0,229,255,0.2)" : "1px solid transparent",
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm text-white"
                        style={{ background: `${chat.color}22`, border: `1.5px solid ${chat.color}55` }}>
                        {chat.avatar}
                      </div>
                      {chat.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                          style={{ background: "#00e676", borderColor: "hsl(222, 25%, 6%)" }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-sm truncate" style={{ color: "rgba(255,255,255,0.9)" }}>
                          {chat.name}
                        </span>
                        <span className="text-[11px] ml-2 shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>{chat.time}</span>
                      </div>
                      <div className="flex justify-between items-center mt-0.5">
                        <span className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{chat.msg}</span>
                        {chat.unread > 0 && (
                          <span className="ml-2 shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                            style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)" }}>
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
              {activeChat ? (
                <>
                  <div className="flex items-center gap-4 px-6 py-4 shrink-0"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
                    <div className="relative">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white"
                        style={{ background: `${activeChat.color}22`, border: `1.5px solid ${activeChat.color}55` }}>
                        {activeChat.avatar}
                      </div>
                      {activeChat.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                          style={{ background: "#00e676", borderColor: "hsl(222, 25%, 6%)" }} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>{activeChat.name}</h3>
                      <div className="flex items-center gap-1.5">
                        <Icon name="Shield" size={11} style={{ color: "#00e5ff" }} />
                        <span className="text-xs" style={{ color: "#00e5ff" }}>Сквозное шифрование</span>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      {["Phone", "Video", "MoreVertical"].map(ic => (
                        <button key={ic} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <Icon name={ic} size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id}>
                        {msg.from === "system" ? (
                          <div className="flex justify-center my-3">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs"
                              style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", color: "#00e5ff" }}>
                              <Icon name="Lock" size={11} />
                              <span>{msg.text}</span>
                            </div>
                          </div>
                        ) : (
                          <div className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                            <div className="max-w-xs lg:max-w-md">
                              <div className="px-4 py-2.5 rounded-2xl"
                                style={msg.from === "me" ? {
                                  background: "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(156,39,176,0.2))",
                                  border: "1px solid rgba(0,229,255,0.25)",
                                  borderBottomRightRadius: "6px",
                                } : {
                                  background: "rgba(255,255,255,0.07)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  borderBottomLeftRadius: "6px",
                                }}>
                                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>{msg.text}</p>
                              </div>
                              <div className={`flex items-center gap-1 mt-1 ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                                {msg.encrypted && <Icon name="Lock" size={9} style={{ color: "rgba(0,229,255,0.5)" }} />}
                                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{msg.time}</span>
                                {msg.from === "me" && <Icon name="CheckCheck" size={11} style={{ color: "#00e5ff" }} />}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="px-6 py-4 shrink-0"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
                    <div className="flex items-center gap-3">
                      <button className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all hover:scale-105"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <Icon name="Paperclip" size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
                      </button>
                      <input
                        value={inputMsg}
                        onChange={e => setInputMsg(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && sendMessage()}
                        placeholder="Введите сообщение... 🔐"
                        className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}
                      />
                      <button
                        onClick={sendMessage}
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all hover:scale-105"
                        style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0, #e91e8c)" }}>
                        <Icon name="Send" size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center flex-col gap-4">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center animate-float"
                    style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0, #e91e8c)" }}>
                    <Icon name="MessageSquare" size={36} className="text-white" />
                  </div>
                  <p className="text-lg font-semibold" style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Выберите чат</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* CONTACTS */}
        {activeTab === "contacts" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Контакты</h2>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
                  style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0, #e91e8c)" }}>
                  <Icon name="UserPlus" size={15} />
                  Добавить
                </button>
              </div>
              <div className="grid gap-3">
                {contacts.map((c, i) => (
                  <div key={c.id}
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(20px)",
                      animationDelay: `${i * 0.06}s`,
                    }}>
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-white"
                        style={{ background: `${c.color}22`, border: `2px solid ${c.color}44` }}>
                        {c.avatar}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
                        style={{
                          borderColor: "hsl(222, 25%, 6%)",
                          background: c.status === "online" ? "#00e676" : c.status === "away" ? "#ffeb3b" : "rgba(255,255,255,0.2)"
                        }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold" style={{ color: "rgba(255,255,255,0.95)" }}>{c.name}</p>
                      <p className="text-sm mt-0.5" style={{ color: c.status === "online" ? "#00e676" : "rgba(255,255,255,0.4)" }}>
                        {c.lastSeen}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.25)" }}>
                        <Icon name="MessageSquare" size={15} style={{ color: "#00e5ff" }} />
                      </button>
                      <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: "rgba(156,39,176,0.1)", border: "1px solid rgba(156,39,176,0.25)" }}>
                        <Icon name="Phone" size={15} style={{ color: "#c084fc" }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEARCH */}
        {activeTab === "search" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6" style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Поиск</h2>
              <div className="relative mb-6">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#00e5ff" }} />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Поиск людей и чатов..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl text-base outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: searchQuery ? "1px solid rgba(0,229,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.9)",
                    boxShadow: searchQuery ? "0 0 20px rgba(0,229,255,0.1)" : "none",
                  }}
                />
              </div>
              {searchQuery ? (
                <>
                  {filteredContacts.length > 0 && (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Контакты</p>
                      <div className="space-y-2 mb-6">
                        {filteredContacts.map(c => (
                          <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:scale-[1.01] transition-all"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                              style={{ background: `${c.color}22`, border: `1.5px solid ${c.color}44` }}>
                              {c.avatar}
                            </div>
                            <span style={{ color: "rgba(255,255,255,0.85)" }}>{c.name}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {filteredChats.length > 0 && (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Чаты</p>
                      <div className="space-y-2">
                        {filteredChats.map(c => (
                          <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:scale-[1.01] transition-all"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                              style={{ background: `${c.color}22`, border: `1.5px solid ${c.color}44` }}>
                              {c.avatar}
                            </div>
                            <div>
                              <p style={{ color: "rgba(255,255,255,0.85)" }}>{c.name}</p>
                              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{c.msg}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {filteredContacts.length === 0 && filteredChats.length === 0 && (
                    <div className="text-center py-12">
                      <Icon name="SearchX" size={40} className="mx-auto mb-3" style={{ color: "rgba(255,255,255,0.15)" }} />
                      <p style={{ color: "rgba(255,255,255,0.35)" }}>Ничего не найдено</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center animate-float"
                    style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(156,39,176,0.1))", border: "1px solid rgba(0,229,255,0.2)" }}>
                    <Icon name="Search" size={36} style={{ color: "#00e5ff" }} />
                  </div>
                  <p className="text-lg font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Начните поиск</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>Введите имя контакта или название чата</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Уведомления</h2>
                <button className="text-sm px-4 py-2 rounded-xl transition-all hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
                  Прочитать все
                </button>
              </div>
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div key={n.id}
                    className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] cursor-pointer"
                    style={{
                      background: n.read ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)",
                      border: n.read ? "1px solid rgba(255,255,255,0.06)" : `1px solid ${n.color}33`,
                      boxShadow: n.read ? "none" : `0 0 15px ${n.color}11`,
                      animationDelay: `${i * 0.06}s`,
                    }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${n.color}15`, border: `1px solid ${n.color}33` }}>
                      <Icon
                        name={n.type === "msg" ? "MessageSquare" : n.type === "group" ? "Users" : n.type === "security" ? "Shield" : "UserPlus"}
                        size={18}
                        style={{ color: n.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: n.read ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.9)" }}>
                        {n.text}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>{n.time} назад</p>
                    </div>
                    {!n.read && (
                      <div className="w-2 h-2 rounded-full shrink-0 mt-2 animate-pulse"
                        style={{ background: n.color }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GALLERY */}
        {activeTab === "gallery" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Галерея</h2>
                <div className="flex gap-2">
                  {["Все", "Фото", "Видео", "Файлы"].map((f, idx) => (
                    <button key={f} className="px-3 py-1.5 rounded-xl text-sm transition-all"
                      style={{
                        background: idx === 0 ? "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(156,39,176,0.15))" : "rgba(255,255,255,0.05)",
                        border: idx === 0 ? "1px solid rgba(0,229,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                        color: idx === 0 ? "#00e5ff" : "rgba(255,255,255,0.5)",
                      }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {gallery.map((item, i) => (
                  <div key={item.id}
                    className={`aspect-square rounded-2xl bg-gradient-to-br ${item.gradient} relative overflow-hidden cursor-pointer group`}
                    style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <Icon name="Expand" size={28} className="text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-all duration-300"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                      <p className="text-xs text-white font-medium">{item.from}</p>
                      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>{item.time}</p>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Icon name="Lock" size={12} style={{ color: "rgba(255,255,255,0.7)" }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center mt-6 text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
                <Icon name="Shield" size={13} className="inline mr-1" style={{ color: "#00e5ff" }} />
                Все медиафайлы защищены сквозным шифрованием
              </p>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-bold mb-6" style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Профиль</h2>
              <div className="rounded-3xl p-6 mb-4 text-center relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(156,39,176,0.08))" }} />
                <div className="relative">
                  <div className="relative inline-block mb-4">
                    <img src={AVATAR_URL} alt="avatar"
                      className="w-24 h-24 rounded-3xl object-cover mx-auto animate-pulse-glow"
                      style={{ border: "3px solid rgba(0,229,255,0.4)" }} />
                    <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)" }}>
                      <Icon name="Camera" size={14} className="text-white" />
                    </button>
                  </div>
                  <h3 className="text-2xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Алексей Новиков</h3>
                  <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>@aleksei_nova</p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Icon name="Shield" size={14} style={{ color: "#00e5ff" }} />
                    <span className="text-sm" style={{ color: "#00e5ff" }}>Аккаунт защищён</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[["Контакты", contacts.length], ["Чаты", chats.length], ["Медиа", gallery.length]].map(([label, count]) => (
                      <div key={String(label)} className="py-3 rounded-2xl"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <p className="text-xl font-black" style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{count}</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl p-5 space-y-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
                {[
                  { label: "Имя", value: "Алексей Новиков", icon: "User" },
                  { label: "Имя пользователя", value: "@aleksei_nova", icon: "AtSign" },
                  { label: "Статус", value: "В сети и открыт к общению!", icon: "MessageCircle" },
                  { label: "Телефон", value: "+7 (999) 123-45-67", icon: "Phone" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4 py-2"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)" }}>
                      <Icon name={item.icon} size={16} style={{ color: "#00e5ff" }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{item.label}</p>
                      <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{item.value}</p>
                    </div>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.05)" }}>
                      <Icon name="Pencil" size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-bold mb-6" style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Настройки</h2>

              <div className="rounded-2xl p-5 mb-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Shield" size={18} style={{ color: "#00e5ff" }} />
                  <h3 className="font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>Безопасность</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Сквозное шифрование", desc: "E2E для всех сообщений", value: encryptionEnabled, toggle: setEncryptionEnabled, color: "#00e5ff" },
                    { label: "Двухфакторная аутентификация", desc: "Защита входа через SMS/приложение", value: notifications2FA, toggle: setNotifications2FA, color: "#c084fc" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-3"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{item.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{item.desc}</p>
                      </div>
                      <button
                        onClick={() => item.toggle(!item.value)}
                        className="relative w-12 h-6 rounded-full transition-all duration-300 shrink-0"
                        style={{
                          background: item.value ? `linear-gradient(135deg, #00e5ff, ${item.color})` : "rgba(255,255,255,0.1)",
                          boxShadow: item.value ? `0 0 15px ${item.color}55` : "none",
                        }}>
                        <div className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow"
                          style={{ left: item.value ? "28px" : "4px" }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5 mb-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Bell" size={18} style={{ color: "#c084fc" }} />
                  <h3 className="font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>Уведомления</h3>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>Уведомления о сообщениях</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Звук и вибрация при новых сообщениях</p>
                  </div>
                  <button
                    onClick={() => setNotifMsg(!notifMsg)}
                    className="relative w-12 h-6 rounded-full transition-all duration-300 shrink-0"
                    style={{
                      background: notifMsg ? "linear-gradient(135deg, #c084fc, #e91e8c)" : "rgba(255,255,255,0.1)",
                      boxShadow: notifMsg ? "0 0 15px rgba(192,132,252,0.4)" : "none",
                    }}>
                    <div className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow"
                      style={{ left: notifMsg ? "28px" : "4px" }} />
                  </button>
                </div>
              </div>

              <div className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Palette" size={18} style={{ color: "#e91e8c" }} />
                  <h3 className="font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>Оформление</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "dark", label: "Тёмная", icon: "Moon" },
                    { id: "amoled", label: "AMOLED", icon: "Contrast" },
                    { id: "neon", label: "Неон", icon: "Zap" },
                    { id: "glass", label: "Стекло", icon: "Layers" },
                  ].map(t => (
                    <button key={t.id}
                      onClick={() => setTheme(t.id)}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
                      style={{
                        background: theme === t.id ? "linear-gradient(135deg, rgba(0,229,255,0.12), rgba(156,39,176,0.12))" : "rgba(255,255,255,0.04)",
                        border: theme === t.id ? "1px solid rgba(0,229,255,0.3)" : "1px solid rgba(255,255,255,0.07)",
                      }}>
                      <Icon name={t.icon} size={16} style={{ color: theme === t.id ? "#00e5ff" : "rgba(255,255,255,0.4)" }} />
                      <span className="text-sm" style={{ color: theme === t.id ? "#00e5ff" : "rgba(255,255,255,0.6)" }}>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
