import { useState } from "react";
import { chats, initMessages, type Tab, type Chat, type Message } from "@/components/messenger/data";
import Sidebar from "@/components/messenger/Sidebar";
import ChatsTab from "@/components/messenger/ChatsTab";
import TabContent from "@/components/messenger/TabContent";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [activeChat, setActiveChat] = useState<Chat | null>(chats[0]);
  const [inputMsg, setInputMsg] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>(initMessages);

  const sendMessage = () => {
    if (!inputMsg.trim()) return;
    const newMsg: Message = {
      id: chatMessages.length + 1,
      text: inputMsg,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      from: "me",
      encrypted: true,
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setInputMsg("");
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ fontFamily: "'Golos Text', sans-serif", background: "hsl(222, 25%, 6%)" }}
    >
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex overflow-hidden">
        {activeTab === "chats" ? (
          <ChatsTab
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            chatMessages={chatMessages}
            inputMsg={inputMsg}
            setInputMsg={setInputMsg}
            sendMessage={sendMessage}
          />
        ) : (
          <TabContent activeTab={activeTab} />
        )}
      </main>
    </div>
  );
}
