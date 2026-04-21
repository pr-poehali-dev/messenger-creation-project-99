import Icon from "@/components/ui/icon";
import { contacts } from "./data";

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

export default function ContactsTab() {
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
