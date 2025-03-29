import { Bot } from "lucide-react";

const Chatbot = () => {
    function handleChatClick() {
         window.location.href = "/chat"; 
    }

    return (
        <button
            onClick={handleChatClick}
            className="fixed bottom-20 right-4 p-4 bg-[#1266D4] rounded-full shadow-lg focus:outline-none hover:bg-[#0D5BBF]"
        >
            <Bot className="h-6 w-6 text-white" />
        </button>
    );
};

export default Chatbot;
