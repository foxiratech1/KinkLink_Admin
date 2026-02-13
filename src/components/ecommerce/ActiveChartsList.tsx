
interface ChatUser {
    id: string;
    name: string;
    avatar: string;
    message: string;
    time: string;
    status: "online" | "offline" | "busy";
}

const activeChats: ChatUser[] = [
    {
        id: "1",
        name: "Unguja Admin",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        message: "System maintenance scheduled for...",
        time: "2m ago",
        status: "online",
    },
    {
        id: "2",
        name: "Tech Support",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        message: "Ticket #402 has been resolved.",
        time: "15m ago",
        status: "busy",
    },
    {
        id: "3",
        name: "Billing Dept",
        avatar: "https://randomuser.me/api/portraits/men/85.jpg",
        message: "Payment processing error on...",
        time: "1h ago",
        status: "offline",
    },
    {
        id: "4",
        name: "Marketing Team",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        message: "New campaign assets are ready.",
        time: "2h ago",
        status: "online",
    },
    {
        id: "5",
        name: "Development",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        message: "Deployment status update...",
        time: "3h ago",
        status: "online",
    },
];

export default function ActiveChatsList() {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Active Chats</h3>
                <span className="px-3 py-1 text-xs font-semibold text-brand-600 bg-brand-50 rounded-full">
                    {activeChats.length} Active
                </span>
            </div>

            <div className="space-y-4">
                {activeChats.map((chat) => (
                    <div
                        key={chat.id}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
                    >
                        <div className="relative">
                            <img
                                src={chat.avatar}
                                alt={chat.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                            <span
                                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${chat.status === "online"
                                    ? "bg-green-500"
                                    : chat.status === "busy"
                                        ? "bg-red-500"
                                        : "bg-gray-400"
                                    }`}
                            ></span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-brand-600 transition-colors">
                                    {chat.name}
                                </h4>
                                <span className="text-xs text-gray-400">{chat.time}</span>
                            </div>
                            <p className="text-xs text-gray-500 truncate">
                                {chat.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-brand-600 bg-gray-50 hover:bg-brand-50 rounded-xl transition-all duration-200">
                View All Messages
            </button>
        </div>
    );
}