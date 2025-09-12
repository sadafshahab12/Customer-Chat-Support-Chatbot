<div className="user">
  <p className="user-msg">I want to know about your services.</p>
  <p className="user-date">
    <GoClock size={12} />
    {new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </p>
</div>;

{
  <div className="chatbot-msg-part">
    <RiRobot2Line size={40} className="chatbot-icon" />
    <p className="chat-bot-msg">
      {" "}
      Hello! 👋 I’m your AI assistant. How can I help you today?
    </p>
    <p className="chatbot-date">
      <GoClock size={12} />
      {new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </p>
  </div>;
}
