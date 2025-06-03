import React, { createContext, useEffect } from 'react';
import { runChat } from '../config/gemini';

const Context = createContext();

const ContextProvider = (props) => {
  
  useEffect(() => {
    async function fetchAnswer() {
      try {
        const res = await runChat("What is Taj Mahal?");
        console.log('Gemini response:', res);
      } catch (err) {
        console.error('Error calling runChat:', err);
      }
    }
    fetchAnswer();
  }, []);

  const contextValue = {};

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
}

export default ContextProvider;
