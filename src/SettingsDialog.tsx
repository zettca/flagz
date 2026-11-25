import { createSignal, For } from "solid-js";
import {
  clampFlags,
  CONTINENTS,
  MAX_FLAGS,
  MIN_FLAGS,
  type Settings,
} from "./data/settings";

const parseSettings = (form: HTMLFormElement): Settings => {
  const data = new FormData(form);
  return {
    numFlags: clampFlags(Number(data.get("numFlags"))),
    continents: data.getAll("continents") as string[],
    ignoreGuessed: data.has("ignoreGuessed"),
    ignoreMini: data.has("ignoreMini"),
  };
};

function FlagsSlider(props: { value: number }) {
  const [value, setValue] = createSignal(props.value);

  // form.reset() fires no input event, so re-read the slider after a reset
  const syncOnReset = (input: HTMLInputElement) =>
    queueMicrotask(() =>
      input.form?.addEventListener("reset", () =>
        queueMicrotask(() => setValue(input.valueAsNumber)),
      ),
    );

  return (
    <label class="flex flex-col gap-2">
      Number of flags: {value()}
      <input
        ref={syncOnReset}
        type="range"
        name="numFlags"
        min={MIN_FLAGS}
        max={MAX_FLAGS}
        step={1}
        defaultValue={props.value}
        onInput={(e) => setValue(e.currentTarget.valueAsNumber)}
      />
    </label>
  );
}

export function SettingsDialog(props: {
  ref: HTMLDialogElement | ((el: HTMLDialogElement) => void);
  settings: Settings;
  guessed: number;
  total: number;
  canReset: boolean;
  onSave: (settings: Settings) => void;
  onReset: () => void;
}) {
  let formRef!: HTMLFormElement;

  return (
    <dialog
      ref={props.ref}
      class="rounded"
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      // Discards unsaved edits: controls go back to the saved settings (their defaults)
      onClose={() => formRef.reset()}
    >
      <form
        ref={formRef}
        method="dialog"
        class="flex flex-col gap-4"
        onSubmit={(e) => props.onSave(parseSettings(e.currentTarget))}
      >
        <h2>Settings</h2>
        <FlagsSlider value={props.settings.numFlags} />
        <fieldset class="flex flex-wrap gap-x-4 gap-y-1 rounded">
          <legend>Continents (none = all)</legend>
          <For each={CONTINENTS}>
            {(continent) => (
              <label class="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="continents"
                  value={continent}
                  defaultChecked={props.settings.continents.includes(continent)}
                />
                {continent}
              </label>
            )}
          </For>
        </fieldset>
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            name="ignoreGuessed"
            defaultChecked={props.settings.ignoreGuessed}
          />
          Skip flags already guessed correctly
        </label>
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            name="ignoreMini"
            defaultChecked={props.settings.ignoreMini}
          />
          Skip very small countries
        </label>
        <div class="flex items-center justify-between gap-4">
          <span>
            Guessed: {props.guessed} / {props.total}
          </span>
          <button
            type="button"
            class="button px-4 py-1"
            disabled={!props.canReset}
            onClick={props.onReset}
          >
            Reset
          </button>
        </div>
        <div class="flex gap-4">
          <button
            type="button"
            class="button flex-1 px-8 py-2"
            onClick={(e) => e.currentTarget.closest("dialog")?.close()}
          >
            Cancel
          </button>
          <button type="submit" class="button flex-1 px-8 py-2">
            Save
          </button>
        </div>
      </form>
    </dialog>
  );
}
