import { useState, useEffect } from "react";

const players = ["Sniper", "Lina", "Juggernaut", "Pudge", "Drow"];

export default function PlayerTracker({ events }) {
  const [playerStats, setPlayerStats] = useState({
    Sniper: {
      name: "Sniper",
      kills: 0,
      deaths: 0,
      towersDestroyed: 0,
      netWorth: 0,
      kda: 0.0,
    },
    Lina: {
      name: "Lina",
      kills: 0,
      deaths: 0,
      towersDestroyed: 0,
      netWorth: 0,
      kda: 0.0,
    },
    Juggernaut: {
      name: "Juggernaut",
      kills: 0,
      deaths: 0,
      towersDestroyed: 0,
      netWorth: 0,
      kda: 0.0,
    },
    Pudge: {
      name: "Pudge",
      kills: 0,
      deaths: 0,
      towersDestroyed: 0,
      netWorth: 0,
      kda: 0.0,
    },
    Drow: {
      name: "Drow",
      kills: 0,
      deaths: 0,
      towersDestroyed: 0,
      netWorth: 0,
      kda: 0.0,
    },
  });

  useEffect(() => {
    const updatedStats = {};

    players.forEach((player) => {
      const playerKills = events.filter(
        (event) =>
          (event.player === player && event.event === "kill") ||
          (event.target === player && event.event === "death"),
      );

      const playerDeaths = events.filter(
        (event) =>
          (event.target === player && event.event === "kill") ||
          (event.player === player && event.event === "death"),
      );

      const playerTowers = events.filter(
        (event) => event.player === player && event.event === "tower_destroyed",
      );

      const kda =
        playerDeaths.length === 0
          ? playerKills.length
          : (playerKills.length / playerDeaths.length).toFixed(2);

      const playerGold = events.reduce((acc, event) => {
        // Kills give 10 gold to the killer
        if (event.player === player && event.event === "kill") {
          acc += 10;
        }
        // Deaths give 10 gold to the target
        if (event.target === player && event.event === "death") {
          acc += 10;
        }
        // Tower destructions give 20 gold to the destroyer
        if (event.player === player && event.event === "tower_destroyed") {
          acc += 20;
        }
        return acc;
      }, 0);

      updatedStats[player] = {
        name: player,
        kills: playerKills.length,
        deaths: playerDeaths.length,
        towersDestroyed: playerTowers.length,
        netWorth: playerGold,
        kda: parseFloat(kda),
      };
    });

    setPlayerStats(updatedStats);
  }, [events]);

  // Find player with highest KDA
  const topKdaPlayer = Object.values(playerStats).reduce((prev, current) =>
    prev.kda > current.kda ? prev : current,
  );

  return (
    <div>
      <h2>🧍 Player Tracker</h2>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Kills</th>
            <th>Deaths</th>
            <th>Towers</th>
            <th>Net Worth</th>
            <th>KDA</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            const stats = playerStats[player];
            const isTopKda = stats.name === topKdaPlayer.name;

            return (
              <tr
                key={player}
                style={{
                  backgroundColor: isTopKda ? "papayawhip" : "transparent",
                  color: isTopKda ? "black" : "inherit",
                  fontWeight: isTopKda ? "bold" : "normal",
                }}
              >
                <td>{stats.name}</td>
                <td>{stats.kills}</td>
                <td>{stats.deaths}</td>
                <td>{stats.towersDestroyed}</td>
                <td>{stats.netWorth}$</td>
                <td>{stats.kda}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
