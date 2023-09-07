import { Index, createSignal } from "solid-js";

import { delay, playAudio, rand } from "./utils";
import { getCountries } from "./data/countries";

import "./App.css";

const numCountries = 4;

export default function App() {
  const [colors, setColors] = createSignal<Record<number, string>>({});
  const [countries, setCountries] = createSignal(getCountries(numCountries));
  const [answerIndex, setAnswerIndex] = createSignal(rand(numCountries - 1));
  const [loading, setLoading] = createSignal(false);

  const nextGame = async ({ delayStart = 200 }) => {
    const newCountries = getCountries(numCountries);
    const newAnswerIdx = rand(numCountries - 1);

    // preload image before waiting for new game
    setLoading(true);
    new Image().src = newCountries[newAnswerIdx].flagUrl;
    await delay(delayStart);

    setAnswerIndex(newAnswerIdx);
    setCountries(newCountries);
    setLoading(false);
  };

  /** Correct country */
  const cc = () => countries()[answerIndex()];
  const alt = () => cc().alt.replace(cc().name, "COUNTRY");

  return (
    <main>
      <img
        src={cc().flagUrl}
        alt={alt()}
        height="60%"
        width="auto"
        aria-live="polite"
      />
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
          // playSeqSound(isCorrect ? 700 : 400, { inc: isCorrect ? 80 : -80 });
          playAudio(isCorrect ? "success" : "error");
          await nextGame({ delayStart: isCorrect ? 1000 : 2000 });
          setColors([]);
        }}
      >
        <fieldset disabled={loading()}>
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
