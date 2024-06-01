import { Index, createSignal } from "solid-js";

import { delay, rand } from "./utils";
import { getCountries } from "./data/countries";

const numCountries = 4;

export default function App() {
  const [colors, setColors] = createSignal<Record<number, string>>({});
  const [countries, setCountries] = createSignal(getCountries(numCountries));
  const [answerIndex, setAnswerIndex] = createSignal(rand(numCountries - 1));
  const [loading, setLoading] = createSignal(false);

  let audioCorrectRef: HTMLAudioElement;
  let audioWrongRef: HTMLAudioElement;

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
    <main class="flex gap-8 h-full px-8 flex-col flex-justify-end">
      <audio ref={audioCorrectRef!} src="./sounds/correct.mp3" preload="auto" />
      <audio ref={audioWrongRef!} src="./sounds/wrong.mp3" preload="auto" />
      <img
        src={cc().flagUrl}
        alt={alt()}
        height="60%"
        width="auto"
        aria-live="polite"
        class="m-auto max-w-full object-contain"
      />
      <form
        class="text-xl"
        onSubmit={async (event) => {
          event.preventDefault();
          const clickedButton = event.submitter as HTMLButtonElement;
          const pickedIndex = Number(clickedButton.value);
          const isCorrect = pickedIndex === answerIndex();

          setColors({
            [answerIndex()]: "green",
            [pickedIndex]: isCorrect ? "green" : "red",
          });
          const audioEl = isCorrect ? audioCorrectRef : audioWrongRef;
          await audioEl.play();
          await nextGame({ delayStart: isCorrect ? 1000 : 2000 });
          setColors([]);
        }}
      >
        <fieldset
          disabled={loading()}
          class="flex flex-wrap rounded gap-4 mb-8 mx-16"
        >
          <legend>Guess the country</legend>
          <Index each={countries()}>
            {(c, i) => (
              <button
                class="text-lg flex-half px-8 py-4 button"
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
