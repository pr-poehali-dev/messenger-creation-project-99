import Icon from "@/components/ui/icon";
import { AVATAR_URL, chats, notifications, type Tab } from "./data";

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const navItems: { id: Tab; icon: string; label: string }[] = [
  { id: "chats", icon: "MessageSquare", label: "Чаты" },
  { id: "contacts", icon: "Users", label: "Контакты" },
  { id: "search", icon: "Search", label: "Поиск" },
  { id: "notifications", icon: "Bell", label: "Уведомл." },
  { id: "gallery", icon: "Image", label: "Галерея" },
  { id: "profile", icon: "User", label: "Профиль" },
  { id: "settings", icon: "Settings", label: "Настройки" },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const unreadCount = chats.reduce((s, c) => s + c.unread, 0);
  const unreadNotif = notifications.filter(n => !n.read).length;

  return (
    <aside
      className="w-20 flex flex-col items-center py-6 gap-2 shrink-0 relative z-10"
      style={{ background: "rgba(0,0,0,0.4)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mb-4 flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center animate-pulse-glow"
          style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0, #e91e8c)" }}
        >
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
          <span
            className="text-[9px] font-medium"
            style={{ color: activeTab === item.id ? "#00e5ff" : "rgba(255,255,255,0.35)" }}
          >
            {item.label}
          </span>
          {item.id === "chats" && unreadCount > 0 && (
            <span
              className="absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
              style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)" }}
            >
              {unreadCount}
            </span>
          )}
          {item.id === "notifications" && unreadNotif > 0 && (
            <span
              className="absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
              style={{ background: "#e91e8c" }}
            >
              {unreadNotif}
            </span>
          )}
        </button>
      ))}

      <div className="mt-auto">
        <img
          src={AVATAR_URL}
          alt="me"
          className="w-10 h-10 rounded-2xl object-cover"
          style={{ border: "2px solid rgba(0,229,255,0.4)", boxShadow: "0 0 15px rgba(0,229,255,0.2)" }}
        />
      </div>
    </aside>
  );
}
