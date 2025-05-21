import React, { useEffect, useState } from "react";
import { generateEvent } from "./utils";
import MatchFeed from "./MatchFeed";
import PlayerTracker from "./PlayerTracker";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = generateEvent();
      setEvents((prev) => [newEvent, ...prev]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Live Match Feed</h1>

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
