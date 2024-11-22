import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  // Function to load a selected prompt
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        {/* Toggle Sidebar */}
        <img
          src={assets.menu_icon}
          alt="Menu"
          className="menu-icon"
          onClick={() => setExtended(!extended)}
        />

        {/* New Chat */}
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="New Chat" className="plus-icon" />
          {extended && <p>New Chat</p>}
        </div>

        {/* Recent Prompts */}
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index} // Added `key` prop
                onClick={() => loadPrompt(item)}
                className="recent-entry"
              >
                <img
                  src={assets.message_icon}
                  alt="Message"
                  className="user-icon"
                />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar Bottom Section */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help" className="history-icon" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="History" className="history-icon" />
          {extended && <p>History</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings" className="history-icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
