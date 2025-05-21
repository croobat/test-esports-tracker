const players = ["Sniper", "Lina", "Juggernaut", "Pudge", "Drow"];

const eventTypes = ["kill", "death", "tower_destroyed"];

export function generateEvent() {
  const player = players[Math.floor(Math.random() * players.length)];
  const target = players[Math.floor(Math.random() * players.length)];
  const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const gold = event === "kill" ? 10 : event === "tower_destroyed" ? 20 : 0;

  return {
    time: new Date().toLocaleTimeString(),
    player,
    target,
    event,
    gold,
  };
}
