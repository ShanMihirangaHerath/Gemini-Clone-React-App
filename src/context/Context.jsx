import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Function to append text with a delay for animation effect
  const delayPara = (index, nextWord) => {
    if (!nextWord) return; // Ensure no invalid text is appended
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt = input) => {
    if (!prompt.trim()) return; // Prevent sending empty prompts

    // Reset states for new input
    setResultData("");
    setLoading(true);
    setShowResult(true);

    try {
      // Add prompt to history and update the recent prompt
      setPrevPrompts((prev) => [...prev, prompt]);
      setRecentPrompt(prompt);

      // Fetch the response
      const response = await run(prompt);
      if (!response)
        throw new Error("Received an empty response from the `run` function.");

      // Format the response
      const responseArray = response.split("**");
      const formattedResponse = responseArray
        .map((chunk, i) => (i % 2 === 1 ? `<b>${chunk}</b>` : chunk))
        .join("")
        .replace(/\*/g, "</br>");
      const responseWords = formattedResponse.split(" ");

      // Animate the response word by word
      responseWords.forEach((word, index) => {
        delayPara(index, `${word} `);
      });
    } catch (error) {
      console.error("Error in onSent:", error.message || error);
      setResultData("Failed to fetch a response. Please try again.");
    } finally {
      setLoading(false);
      setInput(""); // Clear the input field after processing
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
