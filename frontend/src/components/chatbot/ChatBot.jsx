import { LuMessageCircleMore } from "react-icons/lu";
import "./ChatBot.css";
import "./TypingIndicator.css";
import { FaUser } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { GoArrowUp, GoClock } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { VscChromeMinimize } from "react-icons/vsc";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    setMessages([...messages, { sender: "user", text }]);
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Here’s the reply from API!" },
      ]);
      setLoading(false);
    }, 2000);
  };
  return (
    <div className="customer-chatbot">
      <div className="message-bubble">
        <LuMessageCircleMore size={30} />
      </div>
      <div className="chat-bot">
        <div className="chatbot-head">
          <IoIosArrowRoundBack size={20} className="head-icon" />
          <h1>chat bot</h1>
          <VscChromeMinimize size={20} className="head-icon" />
        </div>
        <div className="chatbot-msg-ui">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === "bot" ? "chatbot-msg-part" : "user"}
            >
              {msg.sender === "bot" ? (
                <RiRobot2Line size={40} className="chatbot-icon" />
              ) : (
                <FaUser size={30} className="user-icon" />
              )}

              <p className={msg.sender === "bot" ? "chat-bot-msg" : "user-msg"}>
                {msg.text}
              </p>
              <p className="chatbot-date">
                <GoClock size={12} />
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}

          {loading && (
            <div className="chatbot-msg-part">
              <div className="chat-bot-msg typing-indicator">
                <span></span>
              </div>
            </div>
          )}
        </div>
        <div className="chatbot-form">
          <div className="chatbot-input">
            <CiCirclePlus className="plus-icon" size={30} />

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Your Message Here ..."
              className="user-msg-input"
            />
            <BsEmojiSmile size={26} className="emoji-icon" />
          </div>
          <button
            className="user-msg-button"
            onClick={() => input.trim() && sendMessage(input)}
          >
            <GoArrowUp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
