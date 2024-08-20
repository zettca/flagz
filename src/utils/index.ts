export function rand(max = 1, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function range(n: number) {
  return [...Array(n).keys()];
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Shuffles array using Fisher-Yates shuffle algorithm */
export function shuffleArray<T>(array: T[]): T[] {
  return array.reduceRight(
    (acc, _, i) => {
      const j = rand(i);
      [acc[i], acc[j]] = [acc[j], acc[i]];
      return acc;
    },
    [...array],
  );
}

export function playSound(frequencies: number[], duration = 0.2) {
  const audioContext = new AudioContext();

  function playFrequency(frequency: number, startTime: number) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }

  frequencies.forEach((frequency, i) => {
    playFrequency(frequency, audioContext.currentTime + i * duration);
  });
}

export function playSeqSound(
  frequency: number,
  { inc = 100, times = 3, duration = 0.1 } = {},
) {
  const frequencies = range(times).map((i) => frequency + inc * i);
  playSound(frequencies, duration);
}

const sounds = {
  success: "./sounds/correct.mp3",
  error: "./sounds/wrong.mp3",
};

export async function playAudio(type: keyof typeof sounds) {
  const sound = new Audio(sounds[type]);
  await sound.play();
}
