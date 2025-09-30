import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatBot from "./components/chatbot/ChatBot";
import ChatbotCustomizePage from "./pages/ChatbotCustomizePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ChatBot
              title="Customer Support"
              welcomeMsg="Hi! Welcome to our service. How can I help you today?"
            />
          }
        />

        <Route path="/customize" element={<ChatbotCustomizePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
