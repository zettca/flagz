import { Index, createSignal } from "solid-js";

import { delay, rand } from "./utils";
import { getCountries } from "./data/countries";

import "./App.css";

const numCountries = 4;

function App() {
  const [colors, setColors] = createSignal<Record<number, string>>({});
  const [countries, setCountries] = createSignal(getCountries(numCountries));
  const [answerIndex, setAnswerIndex] = createSignal(rand(numCountries - 1));

  const nextGame = () => {
    const newCountries = getCountries(numCountries);
    setAnswerIndex(rand(numCountries - 1));
    setCountries(newCountries);
  };

  return (
    <main>
      <img src={countries()?.[answerIndex()].flagUrl} alt="Flag 🧐" />
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const clickedButton = event.submitter as HTMLButtonElement;
          const pickedIndex = Number(clickedButton.value);
          const isCorrect = pickedIndex === answerIndex();

          setColors({
            [answerIndex()]: "green",
            [pickedIndex]: isCorrect ? "green" : "red",
          });
          await delay(1000);
          nextGame();
          setColors([]);
        }}
      >
        <fieldset>
          <legend>Guess the country</legend>
          <Index each={countries()}>
            {(c, i) => (
              <button
                value={String(i)}
                style={{ "background-color": colors()[i] }}
              >
                {c().name}
              </button>
            )}
          </Index>
        </fieldset>
      </form>
    </main>
  );
}

export default App;
