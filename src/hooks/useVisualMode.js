import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode);
      setHistory(history => [...history, newMode]);
    } else {
      setMode(newMode);
      setHistory(history => {
        history.pop();
        return [...history, newMode];
      });
    };
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(history => {
        const prevHistory = [...history].slice(0, history.length - 1);
        setMode(prevHistory[prevHistory.length - 1]);
        return prevHistory
      });
    }
  }

  return { mode, transition, back };
}

