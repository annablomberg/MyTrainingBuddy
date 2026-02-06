import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

// TODO: add input field for emojis + pictures + audio

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

// ---- mock data ----
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

type AvatarProps = {
    src?: string;
    name: string;
    size?: "sm" | "md";
};

const Avatar: React.FC<AvatarProps> = ({ src, name, size = "md" }) => {
    const sizeClasses = size === "sm" ? "w-12 h-12" : "w-10 h-10";
    const initial = name ? name.charAt(0).toUpperCase() : "?";

    return (
        <div
            className={`${sizeClasses} rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-white shadow`}
        >
            {src ? (
                <img src={src} alt={name} className="w-full h-full object-cover" />
            ) : (
                <span className="text-sm font-semibold text-slate-600">{initial}</span>
            )}
        </div>
    );
};

export const ChatPage: React.FC = () => {
    const { user } = useAuth();
    const [conversations, setConversations] =
        useState<Conversation[]>(initialConversations);
    const [selectedId, setSelectedId] = useState<string>("c1");
    const [draft, setDraft] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);


    const selectedConversation = conversations.find((c) => c.id === selectedId)!;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedId, conversations]);

    if (!user) return null;

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!draft.trim()) return;

        const newMessage: Message = {
            id: `local-${Date.now()}`,
            senderId: CURRENT_USER_ID,
            senderName: user.name,
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
        <main className="min-h-screen bg-white pt-16 flex justify-center">
            <div className="flex w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <aside className="w-72 md:w-80 border-r border-slate-400 bg-white flex flex-col">
                    <div className="px-4 pt-4 h-16 border-b border-slate-400">
                        <h2 className="text-2xl font-semibold text-slate-900">Messages</h2>
                    </div>

                    <div className="px-5 py-3">
                        <input
                            type="text"
                            placeholder="Sök i konversationer"
                            className="w-full rounded-full border border-slate-400 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {conversations.map((conv) => {
                            const isSelected = conv.id === selectedId;
                            const isActive = conv.id === "c1";

                            return (
                                <button
                                    key={conv.id}
                                    type="button"
                                    onClick={() => setSelectedId(conv.id)}
                                    className={
                                        "w-full text-left px-5 py-3 hover:bg-slate-200 " +
                                        (isSelected ? "bg-slate-200" : "")
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar name={conv.name} size="sm" />

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
              <span className="font-semibold text-base md:text-lg text-slate-900">
                {conv.name}
              </span>
                                                {isActive && (
                                                    <span className="hidden md:inline-flex items-center gap-1 text-xs text-green-600">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  Active
                </span>
                                                )}

                                                {conv.isGroup && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-medium">
                  Grupp
                </span>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-slate-500 truncate">
                {conv.lastMessage}
              </span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>


                </aside>

                <section className="flex-1 flex flex-col bg-white">
                    <header className="h-16 px-6 border-b border-slate-400 bg-white flex items-center justify-between">
                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                                {selectedConversation.name}
                            </h1>
                            <p className="text-sm text-slate-500">
                                {selectedConversation.isGroup
                                    ? `${selectedConversation.participants.length} deltagare`
                                    : "Direct Messages"}
                            </p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            Active
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto px-10 md:px-6 py-4 flex flex-col">
                        {selectedConversation.messages.map((msg) => {
                            const isOwn = msg.senderId === CURRENT_USER_ID;

                            return (
                                <div
                                    key={msg.id}
                                    className={
                                        "mb-3 flex w-full items-end " +
                                        (isOwn ? "justify-end" : "justify-start")
                                    }
                                >
                                    {!isOwn && (
                                        <div className="mr-3 mb-6 shrink-0">
                                            <Avatar name={msg.senderName} size="sm" />
                                        </div>
                                    )}

                                    <div className="max-w-[80%]">
                                        {!isOwn && (
                                            <p className="text-xs text-slate-500 mb-1">
                                                {msg.senderName}
                                            </p>
                                        )}
                                        <div
                                            className={
                                                "inline-block px-4 py-3 rounded-2xl text-sm md:text-lg shadow-sm " +
                                                (isOwn
                                                    ? "bg-blue-500 text-white rounded-br-md"
                                                    : "bg-white text-slate-900 rounded-bl-md")
                                            }
                                        >
                                            {msg.text}
                                        </div>
                                        <p
                                            className={
                                                "text-[12px] mt-1 " +
                                                (isOwn ? "text-right text-slate-400" : "text-slate-400")
                                            }
                                        >
                                            {msg.time}
                                        </p>
                                    </div>

                                    {isOwn && (
                                        <div className="ml-3 mb-6 shrink-0">
                                            <Avatar src={user.avatarUrl} name={user.name} size="sm" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    <form
                        onSubmit={handleSend}
                        className="border-t border-slate-400 bg-white px-4 md:px-6 py-3 flex items-center gap-3"
                    >
                        <input
                            type="text"
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            placeholder="Skriv ett meddelande..."
                            className="flex-1 rounded-full border border-slate-400 bg-slate-50 px-4 md:px-5 py-6 text-base outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-3xl bg-blue-500 text-white text-sm md:text-base font-semibold px-5 py-5 hover:bg-blue-600 active:bg-blue-700 transition "
                            disabled={!draft.trim()}
                        >
                            Send
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
};
