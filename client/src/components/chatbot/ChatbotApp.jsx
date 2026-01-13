import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdClose, MdOutlineMessage } from "react-icons/md"; 
import { BiSolidMessage } from "react-icons/bi";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { companyInfo } from "./CompanyInfo";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);
  const [showChatbot, setshowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    const userMessage = history[history.length - 1].text.toLowerCase();
    const info = companyInfo.toLowerCase();

    const keywordResponses = [
      {
        keywords: ["create", "make", "start resume", "build resume"],
        response:
          "To create your resume, just pick a template, fill in your information (personal details, experience, education, skills), and watch the live preview update in real-time.",
      },
      {
        keywords: ["update", "edit", "change", "modify"],
        response:
          "To update your resume, simply return to the editor, make your changes, and your live preview will automatically refresh — no need to start over!",
      },
      {
        keywords: ["download", "save", "export", "pdf"],
        response:
          "When you're ready, click 'Download as PDF' to instantly get a polished, print-ready version of your resume.",
      },
      {
        keywords: ["ats", "applicant tracking", "ats friendly"],
        response:
          "All our templates are ATS-friendly — meaning they’re optimized for Applicant Tracking Systems used by recruiters, ensuring your resume gets noticed.",
      },
      {
        keywords: ["free", "price", "cost", "charge"],
        response:
          "Yes! resume. is completely free to use. You can build, edit, and download resumes without paying anything.",
      },
      {
        keywords: ["mobile", "phone", "tablet", "responsive"],
        response:
          "Yes! resume. works perfectly on mobile devices and tablets. You can edit or create resumes anywhere, anytime.",
      },
      {
        keywords: ["signup", "login", "account"],
        response:
          "Currently, you can use resume. without creating an account. We're working on adding login and save features soon!",
      },
    ];

    for (const item of keywordResponses) {
      if (item.keywords.some((word) => userMessage.includes(word))) {
        updateHistory(item.response);
        return;
      }
    }

    if (info.includes(userMessage)) {
      updateHistory("Here's what I found in our details:\n\n" + companyInfo);
      return;
    }

    // Format history for the backend API
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      text,
    }));

    try {
      // Call backend API instead of Google API directly
      const response = await fetch("/api/ai/chat-public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: formattedHistory }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      const apiResponseText = data.response
        ?.replace(/\*\*(.*?)\*\*/g, "$1")
        .trim() || "Sorry, I didn't understand that.";

      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className="chatbot-app">
      <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
        {/* 🔘 Floating Button - changed icon */}
        <button
          onClick={() => setshowChatbot((prev) => !prev)}
          id="chatbot-toggler"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1E3A8A] text-white shadow-lg hover:bg-[#2563EB] transition"
        >
          {showChatbot ? <MdClose size={28} /> : <BiSolidMessage size={28} />}
        </button>

        {/* 💬 Chatbot Popup */}
        <div className="chatbot-popup">
          <div className="chat-header flex items-center justify-between">
            <div className="header-info flex items-center gap-2">
              <ChatbotIcon />
              <h2 className="logo-text">Chatbot</h2>
            </div>
            <button onClick={() => setshowChatbot((prev) => !prev)}>
              <MdKeyboardArrowDown size={28} />
            </button>
          </div>

          <div ref={chatBodyRef} className="chat-body">
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Hey there! <br /> How can I help you?
              </p>
            </div>

            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
