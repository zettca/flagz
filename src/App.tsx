import { createSignal, For } from "solid-js";
import { filterCountries, getGame } from "./data/countries";
import {
  guessedCodes,
  loadProgress,
  recordAnswer,
  saveProgress,
  type Progress,
} from "./data/progress";
import {
  loadSettings,
  saveSettings,
  type Settings,
} from "./data/settings";
import { SettingsDialog } from "./SettingsDialog";
import { delay } from "./utils";

const buildGame = (settings: Settings, progress: Progress) =>
  getGame(settings.numFlags, {
    continents: settings.continents,
    ignoreMini: settings.ignoreMini,
    excludeCodes: settings.ignoreGuessed ? guessedCodes(progress) : undefined,
  });

export default function App() {
  const [settings, setSettings] = createSignal(loadSettings());
  const [progress, setProgress] = createSignal(loadProgress());
  const [colors, setColors] = createSignal<Record<number, string>>({});
  const initialGame = buildGame(settings(), progress());
  const [countries, setCountries] = createSignal(initialGame.countries);
  const [answerIndex, setAnswerIndex] = createSignal(initialGame.answerIndex);
  const [loading, setLoading] = createSignal(false);

  let audioCorrectRef!: HTMLAudioElement;
  let audioWrongRef!: HTMLAudioElement;
  let settingsRef!: HTMLDialogElement;

  const filtered = () => filterCountries(settings());
  const guessedCount = () => {
    const guessed = guessedCodes(progress());
    return filtered().filter((c) => guessed.has(c.code)).length;
  };

  /** Signal writes are batched, so callers pass fresh values that may not be readable yet */
  const nextGame = async ({
    delayStart = 200,
    progress: currentProgress = progress(),
    settings: currentSettings = settings(),
  }: {
    delayStart?: number;
    progress?: Progress;
    settings?: Settings;
  } = {}) => {
    const game = buildGame(currentSettings, currentProgress);

    // preload image before waiting for new game
    setLoading(true);
    new Image().src = game.countries[game.answerIndex].flagUrl;
    await delay(delayStart);

    setAnswerIndex(game.answerIndex);
    setCountries(game.countries);
    setLoading(false);
  };

  const updateSettings = async (next: Settings) => {
    setSettings(next);
    saveSettings(next);
    setColors({});
    await nextGame({ delayStart: 0, settings: next });
  };

  const resetProgress = async () => {
    setProgress({});
    saveProgress({});
    setColors({});
    await nextGame({ delayStart: 0, progress: {} });
  };

  /** Correct country */
  const cc = () => countries()[answerIndex()];
  const alt = () => cc().alt.replace(cc().name, "THIS COUNTRY");

  return (
    <main class="flex gap-8 h-full px-8 flex-col flex-justify-end">
      <audio ref={audioCorrectRef} src="./sounds/correct.mp3" preload="auto" />
      <audio ref={audioWrongRef} src="./sounds/wrong.mp3" preload="auto" />
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

          const newProgress = recordAnswer(progress(), cc().code, isCorrect);
          setProgress(newProgress);
          saveProgress(newProgress);

          setColors({
            [answerIndex()]: "green",
            [pickedIndex]: isCorrect ? "green" : "red",
          });
          const audioEl = isCorrect ? audioCorrectRef : audioWrongRef;
          await audioEl.play();
          await nextGame({
            delayStart: isCorrect ? 1000 : 2000,
            progress: newProgress,
          });
          setColors([]);
        }}
      >
        <fieldset
          disabled={loading()}
          class="flex flex-wrap rounded gap-4 mb-8 mx-16"
        >
          <legend>Guess the country</legend>
          <For each={countries()} keyed={false}>
            {(c, i) => (
              <button
                class="text-lg flex-half px-8 py-4 button"
                value={String(i)}
                style={{ "background-color": colors()[i] }}
              >
                {c().name}
              </button>
            )}
          </For>
        </fieldset>
      </form>
      <button
        type="button"
        class="button absolute top-4 right-4 px-4 py-2"
        onClick={() => settingsRef.showModal()}
      >
        ⚙ Settings
      </button>
      <SettingsDialog
        ref={settingsRef}
        settings={settings()}
        guessed={guessedCount()}
        total={filtered().length}
        canReset={Object.keys(progress()).length > 0}
        onSave={updateSettings}
        onReset={resetProgress}
      />
    </main>
  );
}
