import "./ChatBotCustomizeForm.css";
const ChatbotCustomizeForm = () => {
  return (
    <form>
      <h1 className="form-head">Customize Your Chatbot</h1>
      <div className="chatbot-basic-info">
        <h1 className="chatbot-basic-info-head">ChatBot Basic Info</h1>
        <div>
          <label htmlFor="title">Chatbot Title/ Name</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Your Chatbot Title..."
          />
          <small className="desc-field">
            This name will appear at the top of your chatbot
          </small>
        </div>
        <div>
          <label htmlFor="wel-msg">Welcome Message</label>
          <input
            type="text"
            id="wel-msg"
            placeholder="Write chatbot welcome message here"
          />
          <small className="desc-field">
            This is the first message users will see when they open the chatbot.
          </small>
        </div>
        <div>
          <label htmlFor="lang">Language</label>
          <input type="text" placeholder="write your language here..." />
          <small className="desc-field">
            Select the main language your chatbot will use to interact with
            users.
          </small>
        </div>
      </div>
      <div className="chatbot-theme">
        <h1 className="chatbot-theme-head">Chat Bot Theme</h1>
        <div>
          <label htmlFor="header-bg">Header Background Color</label>
          <input type="color" id="header-bg" />
          <small className="desc-field">
            Sets the background color of the chatbot’s header.
          </small>
        </div>
        <div>
          <label htmlFor="bot-msg-bg">Bot Message Background</label>
          <input type="color" id="bot-msg-bg" />
          <small className="desc-field">
            Color for the chatbot’s message bubbles.
          </small>
        </div>
        <div>
          <label htmlFor="user-msg-bg">User Message Background</label>
          <input type="color" id="user-msg-bg" />
          <small className="desc-field">
            Color for the user’s message bubbles.
          </small>
        </div>
        <div>
          <label htmlFor="msg-button-bg">Send Message Button Color</label>
          <input type="color" id="msg-button-bg" />
          <small className="desc-field">
            Color of the send message button.
          </small>
        </div>
        <div>
          <label htmlFor="logo">Logo / Branding</label>
          <input type="file" id="logo" accept="image/*" hidden />
          <small className="desc-field">
            Upload your brand’s logo to display inside the chatbot.
          </small>
        </div>
      </div>
      <div className="optional-features">
        <h1 className="optional-features-head">Optional Features</h1>
        <div>
          <label htmlFor="enable-emoji">Enable Emoji</label>
          <input type="checkbox" id="enable-emoji" />
          <small className="desc-field">
            Allow users to send emojis in their messages.
          </small>
        </div>
        <div>
          <label htmlFor="enable-attachment">
            Enable Attachments / File Upload
          </label>
          <input type="checkbox" id="enable-attachment" />

          <small className="desc-field">
            Enable file sharing inside the chatbot.
          </small>
        </div>
        <div>
          <label htmlFor="chatbot-icon">Upload Chatbot Avatar (Icon)</label>
          <input type="file" accept="image/*" id="chatbot-icon" hidden />
          <small className="desc-field">
            Set a profile picture for your chatbot that appears next to its
            messages.
          </small>
        </div>
      </div>
    </form>
  );
};

export default ChatbotCustomizeForm;
