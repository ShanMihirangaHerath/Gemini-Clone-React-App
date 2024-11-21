import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async () => {
    if (!input.trim()) return; // Prevent empty prompts
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    try {
      const response = await run(input);
      if (!response) throw new Error("Empty response from run function");

      // Parse and format response
      const responseArray = response.split("**");
      let newResponse = ""; // Initialize to avoid 'undefined' concatenation
      for (let x = 0; x < responseArray.length; x++) {
        if (x % 2 === 1) {
          newResponse += "<b>" + responseArray[x] + "</b>";
        } else {
          newResponse += responseArray[x];
        }
      }

      const formattedResponse = newResponse.replace(/\*/g, "</br>");
      const responseWords = formattedResponse.split(" ");

      // Animate words with delay
      responseWords.forEach((word, index) => {
        delayPara(index, word + " ");
      });

      // Update prompt history
      setPrevPrompts((prev) => [...prev, input]);
    } catch (error) {
      console.error("Error in onSent:", error);
      setResultData("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
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
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
