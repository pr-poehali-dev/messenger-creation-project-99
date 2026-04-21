import { useState } from "react";
import Icon from "@/components/ui/icon";
import { contacts, chats, notifications, gallery, AVATAR_URL, type Tab } from "./data";

interface TabContentProps {
  activeTab: Tab;
}

export default function TabContent({ activeTab }: TabContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications2FA, setNotifications2FA] = useState(true);
  const [notifMsg, setNotifMsg] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [theme, setTheme] = useState("dark");

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const gradText = {
    background: "linear-gradient(135deg, #00e5ff, #9c27b0)",
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
  };

  const glassCard = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
  };

  /* ── CONTACTS ── */
  if (activeTab === "contacts") {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={gradText}>
              Контакты
            </h2>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
              style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0, #e91e8c)" }}
            >
              <Icon name="UserPlus" size={15} />
              Добавить
            </button>
          </div>
          <div className="grid gap-3">
            {contacts.map((c, i) => (
              <div
                key={c.id}
                className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] cursor-pointer"
                style={{ ...glassCard, animationDelay: `${i * 0.06}s` }}
              >
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-white"
                    style={{ background: `${c.color}22`, border: `2px solid ${c.color}44` }}
                  >
                    {c.avatar}
                  </div>
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
                    style={{
                      borderColor: "hsl(222, 25%, 6%)",
                      background:
                        c.status === "online"
                          ? "#00e676"
                          : c.status === "away"
                          ? "#ffeb3b"
                          : "rgba(255,255,255,0.2)",
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold" style={{ color: "rgba(255,255,255,0.95)" }}>
                    {c.name}
                  </p>
                  <p
                    className="text-sm mt-0.5"
                    style={{ color: c.status === "online" ? "#00e676" : "rgba(255,255,255,0.4)" }}
                  >
                    {c.lastSeen}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.25)" }}
                  >
                    <Icon name="MessageSquare" size={15} style={{ color: "#00e5ff" }} />
                  </button>
                  <button
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "rgba(156,39,176,0.1)", border: "1px solid rgba(156,39,176,0.25)" }}
                  >
                    <Icon name="Phone" size={15} style={{ color: "#c084fc" }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── SEARCH ── */
  if (activeTab === "search") {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={gradText}>
            Поиск
          </h2>
          <div className="relative mb-6">
            <Icon
              name="Search"
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "#00e5ff" }}
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Контакты
                  </p>
                  <div className="space-y-2 mb-6">
                    {filteredContacts.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:scale-[1.01] transition-all"
                        style={glassCard}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                          style={{ background: `${c.color}22`, border: `1.5px solid ${c.color}44` }}
                        >
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
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Чаты
                  </p>
                  <div className="space-y-2">
                    {filteredChats.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:scale-[1.01] transition-all"
                        style={glassCard}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                          style={{ background: `${c.color}22`, border: `1.5px solid ${c.color}44` }}
                        >
                          {c.avatar}
                        </div>
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.85)" }}>{c.name}</p>
                          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {c.msg}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {filteredContacts.length === 0 && filteredChats.length === 0 && (
                <div className="text-center py-12">
                  <Icon
                    name="SearchX"
                    size={40}
                    className="mx-auto mb-3"
                    style={{ color: "rgba(255,255,255,0.15)" }}
                  />
                  <p style={{ color: "rgba(255,255,255,0.35)" }}>Ничего не найдено</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div
                className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center animate-float"
                style={{
                  background: "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(156,39,176,0.1))",
                  border: "1px solid rgba(0,229,255,0.2)",
                }}
              >
                <Icon name="Search" size={36} style={{ color: "#00e5ff" }} />
              </div>
              <p className="text-lg font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                Начните поиск
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
                Введите имя контакта или название чата
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── NOTIFICATIONS ── */
  if (activeTab === "notifications") {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={gradText}>
              Уведомления
            </h2>
            <button
              className="text-sm px-4 py-2 rounded-xl transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Прочитать все
            </button>
          </div>
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <div
                key={n.id}
                className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] cursor-pointer"
                style={{
                  background: n.read ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)",
                  border: n.read ? "1px solid rgba(255,255,255,0.06)" : `1px solid ${n.color}33`,
                  boxShadow: n.read ? "none" : `0 0 15px ${n.color}11`,
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${n.color}15`, border: `1px solid ${n.color}33` }}
                >
                  <Icon
                    name={
                      n.type === "msg"
                        ? "MessageSquare"
                        : n.type === "group"
                        ? "Users"
                        : n.type === "security"
                        ? "Shield"
                        : "UserPlus"
                    }
                    size={18}
                    style={{ color: n.color }}
                  />
                </div>
                <div className="flex-1">
                  <p
                    className="text-sm"
                    style={{ color: n.read ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.9)" }}
                  >
                    {n.text}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {n.time} назад
                  </p>
                </div>
                {!n.read && (
                  <div
                    className="w-2 h-2 rounded-full shrink-0 mt-2 animate-pulse"
                    style={{ background: n.color }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── GALLERY ── */
  if (activeTab === "gallery") {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={gradText}>
              Галерея
            </h2>
            <div className="flex gap-2">
              {["Все", "Фото", "Видео", "Файлы"].map((f, idx) => (
                <button
                  key={f}
                  className="px-3 py-1.5 rounded-xl text-sm transition-all"
                  style={{
                    background:
                      idx === 0
                        ? "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(156,39,176,0.15))"
                        : "rgba(255,255,255,0.05)",
                    border: idx === 0 ? "1px solid rgba(0,229,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                    color: idx === 0 ? "#00e5ff" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {gallery.map((item, i) => (
              <div
                key={item.id}
                className={`aspect-square rounded-2xl bg-gradient-to-br ${item.gradient} relative overflow-hidden cursor-pointer group`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <Icon name="Expand" size={28} className="text-white drop-shadow-lg" />
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-all duration-300"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}
                >
                  <p className="text-xs text-white font-medium">{item.from}</p>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {item.time}
                  </p>
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
    );
  }

  /* ── PROFILE ── */
  if (activeTab === "profile") {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={gradText}>
            Профиль
          </h2>
          <div
            className="rounded-3xl p-6 mb-4 text-center relative overflow-hidden"
            style={glassCard}
          >
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(156,39,176,0.08))" }}
            />
            <div className="relative">
              <div className="relative inline-block mb-4">
                <img
                  src={AVATAR_URL}
                  alt="avatar"
                  className="w-24 h-24 rounded-3xl object-cover mx-auto animate-pulse-glow"
                  style={{ border: "3px solid rgba(0,229,255,0.4)" }}
                />
                <button
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)" }}
                >
                  <Icon name="Camera" size={14} className="text-white" />
                </button>
              </div>
              <h3 className="text-2xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>
                Алексей Новиков
              </h3>
              <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
                @aleksei_nova
              </p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Icon name="Shield" size={14} style={{ color: "#00e5ff" }} />
                <span className="text-sm" style={{ color: "#00e5ff" }}>
                  Аккаунт защищён
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {([["Контакты", contacts.length], ["Чаты", chats.length], ["Медиа", gallery.length]] as [string, number][]).map(
                  ([label, count]) => (
                    <div
                      key={label}
                      className="py-3 rounded-2xl"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <p className="text-xl font-black" style={gradText}>
                        {count}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {label}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="rounded-2xl p-5 space-y-4" style={glassCard}>
            {[
              { label: "Имя", value: "Алексей Новиков", icon: "User" },
              { label: "Имя пользователя", value: "@aleksei_nova", icon: "AtSign" },
              { label: "Статус", value: "В сети и открыт к общению!", icon: "MessageCircle" },
              { label: "Телефон", value: "+7 (999) 123-45-67", icon: "Phone" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 py-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)" }}
                >
                  <Icon name={item.icon} size={16} style={{ color: "#00e5ff" }} />
                </div>
                <div className="flex-1">
                  <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {item.label}
                  </p>
                  <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {item.value}
                  </p>
                </div>
                <button
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <Icon name="Pencil" size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── SETTINGS ── */
  if (activeTab === "settings") {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={gradText}>
            Настройки
          </h2>

          {/* Security */}
          <div className="rounded-2xl p-5 mb-4" style={glassCard}>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Shield" size={18} style={{ color: "#00e5ff" }} />
              <h3 className="font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>
                Безопасность
              </h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: "Сквозное шифрование",
                  desc: "E2E для всех сообщений",
                  value: encryptionEnabled,
                  toggle: setEncryptionEnabled,
                  color: "#00e5ff",
                },
                {
                  label: "Двухфакторная аутентификация",
                  desc: "Защита входа через SMS/приложение",
                  value: notifications2FA,
                  toggle: setNotifications2FA,
                  color: "#c084fc",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div>
                    <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {item.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {item.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => item.toggle(!item.value)}
                    className="relative w-12 h-6 rounded-full transition-all duration-300 shrink-0"
                    style={{
                      background: item.value
                        ? `linear-gradient(135deg, #00e5ff, ${item.color})`
                        : "rgba(255,255,255,0.1)",
                      boxShadow: item.value ? `0 0 15px ${item.color}55` : "none",
                    }}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow"
                      style={{ left: item.value ? "28px" : "4px" }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-2xl p-5 mb-4" style={glassCard}>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Bell" size={18} style={{ color: "#c084fc" }} />
              <h3 className="font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>
                Уведомления
              </h3>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                  Уведомления о сообщениях
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Звук и вибрация при новых сообщениях
                </p>
              </div>
              <button
                onClick={() => setNotifMsg(!notifMsg)}
                className="relative w-12 h-6 rounded-full transition-all duration-300 shrink-0"
                style={{
                  background: notifMsg
                    ? "linear-gradient(135deg, #c084fc, #e91e8c)"
                    : "rgba(255,255,255,0.1)",
                  boxShadow: notifMsg ? "0 0 15px rgba(192,132,252,0.4)" : "none",
                }}
              >
                <div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow"
                  style={{ left: notifMsg ? "28px" : "4px" }}
                />
              </button>
            </div>
          </div>

          {/* Appearance */}
          <div className="rounded-2xl p-5" style={glassCard}>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Palette" size={18} style={{ color: "#e91e8c" }} />
              <h3 className="font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>
                Оформление
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "dark", label: "Тёмная", icon: "Moon" },
                { id: "amoled", label: "AMOLED", icon: "Contrast" },
                { id: "neon", label: "Неон", icon: "Zap" },
                { id: "glass", label: "Стекло", icon: "Layers" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
                  style={{
                    background:
                      theme === t.id
                        ? "linear-gradient(135deg, rgba(0,229,255,0.12), rgba(156,39,176,0.12))"
                        : "rgba(255,255,255,0.04)",
                    border:
                      theme === t.id
                        ? "1px solid rgba(0,229,255,0.3)"
                        : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <Icon
                    name={t.icon}
                    size={16}
                    style={{ color: theme === t.id ? "#00e5ff" : "rgba(255,255,255,0.4)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: theme === t.id ? "#00e5ff" : "rgba(255,255,255,0.6)" }}
                  >
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
