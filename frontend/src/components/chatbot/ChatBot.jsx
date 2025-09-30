import "./ChatBot.css";
import "./TypingIndicator.css";
import { Link } from "react-router-dom";
import {
  BsEmojiSmile,
  CiCirclePlus,
  FaUser,
  GoArrowUp,
  GoClock,
  IoMdSettings,
  LuMessageCircleMore,
  RiRobot2Line,
  VscChromeMinimize,
} from "../../exports/icons.js";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  adjustTextareaHeight,
  getRelativeTime,
} from "../../helper-functions/functions.js";
import UserInfo from "../userInfo/UserInfo.jsx";

const ChatBot = ({
  title,
  welcomeMsg,
  theme = {
    headBg: "rgb(188, 195, 255)",
    botMsgBg: "#fff",
    iconBg: "#f8f8f8",
    userMsgBg: "rgb(188, 195 ,255)",
    primary: "rgb(129, 125, 247)",
  },
}) => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: welcomeMsg,
      time: new Date(),
    },
  ]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const [isUserInfoSubmitted, setIsUserInfoSubmitted] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleChatStart = () => {
    if (userInfo.name && userInfo.email) {
      setIsUserInfoSubmitted(true);
      //send to backend
      axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/users`,
        userInfo
      );
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="customer-chatbot">
      <div
        className="message-bubble"
        style={{
          display: isOpen ? "none" : "block",
          backgroundColor: theme.primary,
        }}
        onClick={() => setIsOpen(true)}
      >
        <LuMessageCircleMore size={30} className="msg-bubble-icon" />
      </div>

      <div className={`chat-bot ${isOpen ? "open" : ""}`}>
        <div className="chatbot-head" style={{ backgroundColor: theme.headBg }}>
          <IoMdSettings
            size={20}
            className="head-icon"
            style={{ backgroundColor: theme.iconBg }}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
          {isMenuOpen && (
            <div className="menu">
              <Link to={"/customize"} className="setting-menu">
                Dashboard
              </Link>
              <Link to={"/customize"} className="setting-menu">
                Setting
              </Link>
            </div>
          )}
          <h1>{title}</h1>

          <VscChromeMinimize
            size={20}
            className="head-icon"
            style={{ backgroundColor: theme.iconBg }}
            onClick={() => setIsOpen(false)}
          />
        </div>
        {!isUserInfoSubmitted ? (
          <div>
            <UserInfo
              handleChatStart={handleChatStart}
              setUserInfo={setUserInfo}
              userInfo={userInfo}
            />
          </div>
        ) : (
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

                <p
                  className={msg.sender === "bot" ? "chat-bot-msg" : "user-msg"}
                  style={{
                    backgroundColor:
                      msg.sender === "bot" ? theme.botMsgBg : theme.userMsgBg,
                  }}
                >
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
        )}
        {isUserInfoSubmitted && (
          <div className="chatbot-form">
            <div className="chatbot-input">
              <CiCirclePlus className="plus-icon" size={30} />

              <textarea
                ref={textareaRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim()) {
                      sendMessage(input);
                    }
                  }
                }}
                placeholder="Enter Your Message Here ..."
                className={`user-msg-input ${isExpanded ? "expanded" : ""}`}
              ></textarea>
              <BsEmojiSmile size={26} className="emoji-icon" />
            </div>
            <button
              className="user-msg-button"
              onClick={() => input.trim() && sendMessage(input)}
              style={{ backgroundColor: theme.primary }}
            >
              <GoArrowUp size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
