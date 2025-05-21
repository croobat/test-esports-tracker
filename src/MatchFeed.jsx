export default function MatchFeed({ events }) {
  return (
    <div>
      <h2>📜 Match Events</h2>
      <div
        style={{
          marginBottom: "20px",
          maxHeight: "400px",
          overflowY: "scroll",
        }}
      >
        <ul>
          {events.map((e, i) => (
            <li key={i}>
              [{e.time}] {e.player} {e.event} {e.target && `→ ${e.target}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
