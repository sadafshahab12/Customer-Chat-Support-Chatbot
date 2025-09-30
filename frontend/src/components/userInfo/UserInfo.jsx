const UserInfo = ({ handleChatStart, setUserInfo, userInfo }) => {
  return (
    <div className="pre-chat-form">
      <h2>Welcome</h2>
      <p>Please enter your details to start the chat</p>
      <input
        type="text"
        placeholder="Your Name"
        value={userInfo.name}
        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        className="userInfo-name"
      />
      <input
        type="email"
        placeholder="Your Email"
        value={UserInfo.email}
        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        className="userInfo-email"
      />
      <button onClick={() => handleChatStart()}>Start Chat</button>
    </div>
  );
};

export default UserInfo;
