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
        (event) => event.player === player && event.event === "death",
      );

      const playerDeaths = events.filter(
        (event) => event.target === player && event.event === "death",
      );

      const playerTowers = events.filter(
        (event) => event.player === player && event.event === "tower_destroyed",
      );

      const playerEvents = events.filter((event) => event.player === player);

      const kda =
        playerDeaths.length === 0
          ? playerKills.length
          : (playerKills.length / playerDeaths.length).toFixed(2);

      const playerGold = playerEvents.reduce(
        (acc, value) => acc + value.gold,
        0,
      );

      updatedStats[player] = {
        name: player,
        kills: playerKills.length,
        deaths: playerDeaths.length,
        towersDestroyed: playerTowers.length,
        netWorth: playerGold,
        kda,
      };
    });

    setPlayerStats(updatedStats);
  }, [events]);

  return (
    <div>
      <h2>🧍 Player Tracker</h2>

      <table>
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
        {players.map((player) => {
          const stats = playerStats[player];

          return (
            <tr key={player}>
              <td>{stats.name}</td>
              <td>{stats.kills}</td>
              <td>{stats.deaths}</td>
              <td>{stats.towersDestroyed}</td>
              <td>{stats.netWorth}$</td>
              <td>{stats.kda}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
