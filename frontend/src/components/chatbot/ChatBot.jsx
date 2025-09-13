import "./ChatBot.css";
import "./TypingIndicator.css";
import {
  BsEmojiSmile,
  CiCirclePlus,
  FaUser,
  GoArrowUp,
  GoClock,
  IoIosArrowRoundBack,
  LuMessageCircleMore,
  RiRobot2Line,
  VscChromeMinimize,
} from "../../exports/icons.js";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getRelativeTime } from "../../functions/date.js";
import { adjustTextareaHeight } from "../../functions/textarea-height.js";
const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "How can I help you?",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight(textareaRef.current, setIsExpanded);
    }
  }, [input]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userMessage = {
      sender: "user",
      text,
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const chatbotResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat`,
        {
          message: text,
        }
      );
      const botMessage = {
        sender: "bot",
        text: chatbotResponse.data.reply,
        time: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Sorry, something went wrong!",
          time: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="customer-chatbot">
      <div
        className="message-bubble"
        style={{ display: isOpen ? "none" : "block" }}
        onClick={() => setIsOpen(true)}
      >
        <LuMessageCircleMore size={30} />
      </div>

      <div className={`chat-bot ${isOpen ? "open" : ""}`}>
        <div className="chatbot-head">
          <IoIosArrowRoundBack size={20} className="head-icon" />
          <h1>chat bot</h1>
          <VscChromeMinimize
            size={20}
            className="head-icon"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="chatbot-msg-ui">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === "bot" ? "chatbot-msg-part" : "user"}
              ref={index === messages.length - 1 ? messagesEndRef : null}
            >
              {msg.sender === "bot" ? (
                <RiRobot2Line size={40} className="chatbot-icon" />
              ) : (
                <FaUser size={30} className="user-icon" />
              )}

              <p className={msg.sender === "bot" ? "chat-bot-msg" : "user-msg"}>
                {msg.text}
              </p>
              <p
                className={` ${
                  msg.sender === "bot" ? "chatbot-date" : "user-date"
                } `}
              >
                <GoClock size={12} />
                {getRelativeTime(msg.time)}
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

            <textarea
              ref={textareaRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Your Message Here ..."
              className={`user-msg-input ${isExpanded ? "expanded" : ""}`}
            ></textarea>
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
