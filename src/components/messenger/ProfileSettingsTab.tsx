import { useState } from "react";
import Icon from "@/components/ui/icon";
import { contacts, chats, gallery, AVATAR_URL, type Tab } from "./data";

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

interface Props {
  activeTab: Tab;
}

export default function ProfileSettingsTab({ activeTab }: Props) {
  const [notifications2FA, setNotifications2FA] = useState(true);
  const [notifMsg, setNotifMsg] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [theme, setTheme] = useState("dark");

  /* ── PROFILE ── */
  if (activeTab === "profile") {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={gradText}>
            Профиль
          </h2>
          <div className="rounded-3xl p-6 mb-4 text-center relative overflow-hidden" style={glassCard}>
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
                {(
                  [
                    ["Контакты", contacts.length],
                    ["Чаты", chats.length],
                    ["Медиа", gallery.length],
                  ] as [string, number][]
                ).map(([label, count]) => (
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
                ))}
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
