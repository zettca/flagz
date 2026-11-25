import { load, save } from "./storage";

export type Progress = Record<string, { correct: number; wrong: number }>;

const PROGRESS_KEY = "flagz:progress";

export const loadProgress = () => load<Progress>(PROGRESS_KEY, {});
export const saveProgress = (progress: Progress) =>
  save(PROGRESS_KEY, progress);

export const recordAnswer = (
  progress: Progress,
  code: string,
  isCorrect: boolean,
): Progress => {
  const prev = progress[code] ?? { correct: 0, wrong: 0 };
  return {
    ...progress,
    [code]: {
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
    },
  };
};

export const guessedCodes = (progress: Progress) =>
  new Set(
    Object.entries(progress)
      .filter(([, p]) => p.correct > 0)
      .map(([code]) => code),
  );
