import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleSend = () => {
    if (input.trim()) {
      onSent();
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>NovaMind</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hey, ShanDev.</span>
              </p>
              <p>
                Welcome to NovaMind workspace!
                <br />
                How can I help you today?
              </p>
            </div>
            <div className="cards">
              {[
                {
                  text: "Suggest beautiful places to visit.",
                  icon: assets.compass_icon,
                },
                { text: "Summarize: urban planning.", icon: assets.bulb_icon },
                {
                  text: "Team bonding activities for work.",
                  icon: assets.message_icon,
                },
                {
                  text: "Improve readability of code.",
                  icon: assets.code_icon,
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="card"
                  onClick={() => setInput(card.text)}
                >
                  <p>{card.text}</p>
                  <img src={card.icon} alt="Card Icon" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-content">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <p>Loading...</p>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter your request..."
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              <img
                onClick={handleSend}
                src={assets.send_icon}
                alt="Send Icon"
              />
            </div>
          </div>
          <p className="bottom-info">
            <span>Powered by NovaMind AI | </span>
            <span>Version 1.0.0 | </span>
            <span>Made by ShanDev</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
