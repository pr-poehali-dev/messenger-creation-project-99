import { useState } from "react";
import Icon from "@/components/ui/icon";
import { contacts, chats } from "./data";

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

export default function SearchTab() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
