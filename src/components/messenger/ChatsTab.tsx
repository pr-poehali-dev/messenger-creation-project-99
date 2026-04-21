import Icon from "@/components/ui/icon";
import { chats, type Chat, type Message } from "./data";

interface ChatsTabProps {
  activeChat: Chat | null;
  setActiveChat: (chat: Chat) => void;
  chatMessages: Message[];
  inputMsg: string;
  setInputMsg: (v: string) => void;
  sendMessage: () => void;
}

export default function ChatsTab({
  activeChat,
  setActiveChat,
  chatMessages,
  inputMsg,
  setInputMsg,
  sendMessage,
}: ChatsTabProps) {
  return (
    <>
      {/* Chat list */}
      <div
        className="w-80 flex flex-col shrink-0"
        style={{ borderRight: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}
      >
        <div className="p-4 pb-3">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#00e5ff" }}>
            Сообщения
          </h2>
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "rgba(255,255,255,0.3)" }}
            />
            <input
              placeholder="Поиск чатов..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.8)",
              }}
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
                background:
                  activeChat?.id === chat.id
                    ? "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(156,39,176,0.1))"
                    : "transparent",
                border:
                  activeChat?.id === chat.id
                    ? "1px solid rgba(0,229,255,0.2)"
                    : "1px solid transparent",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <div className="relative shrink-0">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm text-white"
                  style={{ background: `${chat.color}22`, border: `1.5px solid ${chat.color}55` }}
                >
                  {chat.avatar}
                </div>
                {chat.online && (
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                    style={{ background: "#00e676", borderColor: "hsl(222, 25%, 6%)" }}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-sm truncate" style={{ color: "rgba(255,255,255,0.9)" }}>
                    {chat.name}
                  </span>
                  <span className="text-[11px] ml-2 shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {chat.time}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {chat.msg}
                  </span>
                  {chat.unread > 0 && (
                    <span
                      className="ml-2 shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                      style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0)" }}
                    >
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Header */}
            <div
              className="flex items-center gap-4 px-6 py-4 shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}
            >
              <div className="relative">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white"
                  style={{ background: `${activeChat.color}22`, border: `1.5px solid ${activeChat.color}55` }}
                >
                  {activeChat.avatar}
                </div>
                {activeChat.online && (
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                    style={{ background: "#00e676", borderColor: "hsl(222, 25%, 6%)" }}
                  />
                )}
              </div>
              <div>
                <h3 className="font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
                  {activeChat.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  <Icon name="Shield" size={11} style={{ color: "#00e5ff" }} />
                  <span className="text-xs" style={{ color: "#00e5ff" }}>
                    Сквозное шифрование
                  </span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {["Phone", "Video", "MoreVertical"].map((ic) => (
                  <button
                    key={ic}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Icon name={ic} size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id}>
                  {msg.from === "system" ? (
                    <div className="flex justify-center my-3">
                      <div
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs"
                        style={{
                          background: "rgba(0,229,255,0.08)",
                          border: "1px solid rgba(0,229,255,0.2)",
                          color: "#00e5ff",
                        }}
                      >
                        <Icon name="Lock" size={11} />
                        <span>{msg.text}</span>
                      </div>
                    </div>
                  ) : (
                    <div className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                      <div className="max-w-xs lg:max-w-md">
                        <div
                          className="px-4 py-2.5 rounded-2xl"
                          style={
                            msg.from === "me"
                              ? {
                                  background: "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(156,39,176,0.2))",
                                  border: "1px solid rgba(0,229,255,0.25)",
                                  borderBottomRightRadius: "6px",
                                }
                              : {
                                  background: "rgba(255,255,255,0.07)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  borderBottomLeftRadius: "6px",
                                }
                          }
                        >
                          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
                            {msg.text}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-1 mt-1 ${
                            msg.from === "me" ? "justify-end" : "justify-start"
                          }`}
                        >
                          {msg.encrypted && (
                            <Icon name="Lock" size={9} style={{ color: "rgba(0,229,255,0.5)" }} />
                          )}
                          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                            {msg.time}
                          </span>
                          {msg.from === "me" && (
                            <Icon name="CheckCheck" size={11} style={{ color: "#00e5ff" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div
              className="px-6 py-4 shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}
            >
              <div className="flex items-center gap-3">
                <button
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Icon name="Paperclip" size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
                </button>
                <input
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Введите сообщение... 🔐"
                  className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                />
                <button
                  onClick={sendMessage}
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0, #e91e8c)" }}
                >
                  <Icon name="Send" size={16} className="text-white" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col gap-4">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center animate-float"
              style={{ background: "linear-gradient(135deg, #00e5ff, #9c27b0, #e91e8c)" }}
            >
              <Icon name="MessageSquare" size={36} className="text-white" />
            </div>
            <p
              className="text-lg font-semibold"
              style={{
                background: "linear-gradient(135deg, #00e5ff, #9c27b0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Выберите чат
            </p>
          </div>
        )}
      </div>
    </>
  );
}
