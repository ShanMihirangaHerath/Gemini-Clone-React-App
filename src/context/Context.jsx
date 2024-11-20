import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPromts, setPrevPromts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async () => {
    if (!input.trim()) return; // Prevent empty prompts
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    try {
      const response = await run(input);
      setResultData(response);
      setPrevPromts((prev) => [...prev, input]); // Save prompt history
    } catch (error) {
      console.error("Error in onSent:", error);
      setResultData("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPromts,
    setPrevPromts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
