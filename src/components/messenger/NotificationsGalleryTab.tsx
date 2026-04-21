import Icon from "@/components/ui/icon";
import { notifications, gallery, type Tab } from "./data";

const gradText = {
  background: "linear-gradient(135deg, #00e5ff, #9c27b0)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
};

interface Props {
  activeTab: Tab;
}

export default function NotificationsGalleryTab({ activeTab }: Props) {
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
