import { createContext, useState } from 'react';
import { runChat } from '../config/gemini';

const Context = createContext({
  previousPrompts: [],
  setPreviousPrompts: () => {},
  fetchAnswer: () => {},
  setRecentPrompts: () => {},
  recentPrompts: "",
  showResult: false,
  loading: false,
  resultData: "",
  input: "",
  setInput: () => {},
  onSent: () => {},
});

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [lastCallTime, setLastCallTime] = useState(0);

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  }

  const fetchAnswer = async (prompt) => {
    const now = Date.now();
    if (now - lastCallTime < 10000) {
      console.warn("You're sending too fast. Please wait a few seconds.");
      return;
    }
    setLastCallTime(now);

    try {
      setResultData("");
      setLoading(true);
      setShowResult(true);
      const query = prompt !== undefined ? prompt : input;

      // Add to previous prompts
      setPreviousPrompts((prev) => [...prev, query]);
      setRecentPrompts(query);

      // Run chat with query
      const response = await runChat(query);
      console.log(response);
      setResultData(response);
      setInput("");
        
      
    } catch (err) {
      console.error('Error calling runChat:', err);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    fetchAnswer,
    setRecentPrompts,
    recentPrompts,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    onSent: (prompt) => fetchAnswer(prompt) // 💡 key fix
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export { Context };
export default ContextProvider;
