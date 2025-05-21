const players = ["Sniper", "Lina", "Juggernaut", "Pudge", "Drow"];

const eventTypes = ["kill", "death", "tower_destroyed"];

export function generateEvent() {
  const player = players[Math.floor(Math.random() * players.length)];
  let target;

  // Avoid self-targeting
  do {
    target = players[Math.floor(Math.random() * players.length)];
  } while (target === player);

  const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];

  return {
    time: new Date().toLocaleTimeString(),
    player,
    target,
    event,
  };
}
