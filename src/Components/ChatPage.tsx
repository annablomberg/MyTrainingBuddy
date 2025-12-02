import React, { useRef, useState, useEffect } from "react";

type Message = {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
};

type Conversation = {
  id: string;
  name: string;
  isGroup: boolean;
  participants: string[];
  lastMessage: string;
  messages: Message[];
};

const CURRENT_USER_ID = "john-doe";

const initialConversations: Conversation[] = [
  {
    id: "c1",
    name: "Emma Johansson",
    isGroup: false,
    participants: ["john-doe", "emma"],
    lastMessage: "Ses på gymmet imorgon?",
    messages: [
      {
        id: "m1",
        senderId: "emma",
        senderName: "Emma Johansson",
        text: "Hej John! Ska du med på klättring på söndag?",
        time: "09:32",
      },
      {
        id: "m2",
        senderId: CURRENT_USER_ID,
        senderName: "John Doe",
        text: "Ja absolut, det låter kul! Vilken tid?",
        time: "09:35",
      },
      {
        id: "m3",
        senderId: "emma",
        senderName: "Emma Johansson",
        text: "Kanske 14:00? Ses på Fysiken?",
        time: "09:37",
      },
      {
        id: "m4",
        senderId: CURRENT_USER_ID,
        senderName: "John Doe",
        text: "Perfekt! Ses där",
        time: "09:40",
      },
    ],
  },
  {
    id: "c2",
    name: "Klätter-gänget",
    isGroup: true,
    participants: ["john-doe", "emma", "mikael", "sara"],
    lastMessage: "Jag bokar bana 3.",
    messages: [
      {
        id: "m5",
        senderId: "mikael",
        senderName: "Mikael",
        text: "Vilken bana tar vi ikväll?",
        time: "18:01",
      },
      {
        id: "m6",
        senderId: CURRENT_USER_ID,
        senderName: "John Doe",
        text: "Jag kan ta med rep om det behövs.",
        time: "18:05",
      },
      {
        id: "m7",
        senderId: "sara",
        senderName: "Sara",
        text: "Nice! Jag bokar bana 3.",
        time: "18:08",
      },
    ],
  },
  {
    id: "c3",
    name: "Anna",
    isGroup: false,
    participants: ["john-doe", "anna"],
    lastMessage: "Skickar nytt schema imorgon.",
    messages: [
      {
        id: "m8",
        senderId: "anna",
        senderName: "Anna",
        text: "Hur kändes benpasset i måndags?",
        time: "15:22",
      },
      {
        id: "m9",
        senderId: CURRENT_USER_ID,
        senderName: "John Doe",
        text: "Riktigt jobbigt men bra haha",
        time: "15:25",
      },
      {
        id: "m10",
        senderId: "anna",
        senderName: "Anna",
        text: "Bra! Jag skickar nytt schema imorgon.",
        time: "15:27",
      },
    ],
  },
];

export const ChatPage: React.FC = () => {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [selectedId, setSelectedId] = useState<string>("c1");
  const [draft, setDraft] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const selectedConversation = conversations.find((c) => c.id === selectedId)!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedId, conversations]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;

    const newMessage: Message = {
      id: `local-${Date.now()}`,
      senderId: CURRENT_USER_ID,
      senderName: "John Doe",
      text: draft.trim(),
      time: new Date().toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: newMessage.text,
            }
          : conv
      )
    );
    setDraft("");
  };

  return (
    <main className="min-h-screen bg-slate-100 flex pt-16">

      <aside className="w-full md:w-72 border-r border-slate-200 bg-white flex flex-col">
        <div className="px-3 py-3 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            Messages
          </h2>
        </div>

        <div className="px-3 py-3">
          <input
            type="text"
            placeholder="Sök i konversationer"
            className="text-[16px] w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-1 text-xs outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex-1">
          {conversations.map((conv) => {
            const isActive = conv.id === selectedId;
            return (
              <button
                key={conv.id}
                type="button"
                onClick={() => setSelectedId(conv.id)}
                className={
                  "w-full text-left px-3 py-2 flex flex-col gap-0.5 border-b border-slate-100 hover:bg-slate-50 " +
                  (isActive ? "bg-slate-100" : "")
                }
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[16px] text-slate-900">
                    {conv.name}
                  </span>
                  {conv.isGroup && (
                    <span className="text-[12px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 font-medium">
                      Grupp
                    </span>
                  )}
                </div>
                <span className="text-[12px] text-slate-500 truncate">
                  {conv.lastMessage}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="flex-1 flex flex-col">
        <header className="h-12 px-3 border-b border-slate-200 bg-white flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              {selectedConversation.name}
            </h1>
            <p className="text-[12px] text-slate-500">
              {selectedConversation.isGroup
                ? `${selectedConversation.participants.length} deltagare`
                : "Direct Messages"}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-1 text-[16px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Active
          </div>
        </header>

        <div className="flex-1 bg-slate-50 px-2 md:px-3 py-2 flex flex-col">
          {selectedConversation.messages.map((msg) => {
            const isOwn = msg.senderId === CURRENT_USER_ID;
            return (
              <div
                key={msg.id}
                className={
                  "mb-1 flex " + (isOwn ? "justify-end" : "justify-start")
                }
              >
                <div className="max-w-[75%]">
                  {!isOwn && (
                    <p className="text-[12px] text-slate-500 mb-0.5">
                      {msg.senderName}
                    </p>
                  )}
                  <div
                    className={
                      "px-3 py-1.5 rounded-2xl text-[14px] shadow-sm " +
                      (isOwn
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-white text-slate-900 rounded-bl-md")
                    }
                  >
                    {msg.text}
                  </div>
                  <p
                    className={
                      "text-[12px] mt-0.5 " +
                      (isOwn ? "text-right text-slate-400" : "text-slate-400")
                    }
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSend}
          className="border-t border-slate-200 bg-white px-2 md:px-3 py-1.5 flex items-center gap-2"
        >
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Skriv ett meddelande..."
            className="flex-1 rounded-full border border-slate-300 bg-slate-50 px-3 py-1.5 text-base outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-blue-500 text-white text-base font-semibold px-3 py-1.5 hover:bg-blue-600 active:bg-blue-700 transition disabled:opacity-50"
            disabled={!draft.trim()}
          >
            Send
          </button>
        </form>
      </section>
    </main>
  );
};
