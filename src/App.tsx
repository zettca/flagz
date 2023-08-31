import { createSignal } from "solid-js";

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <main
      style={{
        display: "flex",
        height: "100%",
        "place-items": "center",
        "place-content": "center",
      }}
    >
      <button onClick={() => setCount((c) => c + 1)}>count is {count()}</button>
    </main>
  );
}

export default App;
