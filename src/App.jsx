import React, { useEffect, useState, useRef } from "react";
import { generateEvent } from "./utils";
import MatchFeed from "./MatchFeed";
import PlayerTracker from "./PlayerTracker";

function App() {
  const [events, setEvents] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const cachedEvents = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = generateEvent();
      if (isPaused) {
        cachedEvents.current.push(newEvent);
      } else {
        setEvents((prev) => [newEvent, ...prev]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePauseToggle = () => {
    if (isPaused) {
      const eventsToAdd = [...cachedEvents.current].reverse();
      setEvents((prev) => [...eventsToAdd, ...prev]);
      cachedEvents.current = [];
    }
    setIsPaused(!isPaused);
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        margin: "0 auto",
      }}
    >
      <h1>Live Match Feed</h1>
      <button
        onClick={handlePauseToggle}
        style={{
          padding: "8px 16px",
          marginBottom: "20px",
          cursor: "pointer",
          backgroundColor: isPaused ? "#4CAF50" : "#f44336",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        {isPaused ? "▶️ Resume" : "⏸️ Pause"}
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          gap: "20px",
        }}
      >
        <MatchFeed events={events} />
        <PlayerTracker events={events} />
      </div>
    </div>
  );
}

export default App;
