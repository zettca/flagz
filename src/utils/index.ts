export function rand(max = 1, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function range(n: number) {
  return [...Array(n).keys()];
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Shuffles array using Fisher-Yates shuffle algoritm */
export function shuffleArray<T>(array: T[]): T[] {
  return array.reduceRight(
    (acc, _, i) => {
      const j = rand(i);
      [acc[i], acc[j]] = [acc[j], acc[i]];
      return acc;
    },
    [...array]
  );
}

const audioContext = new AudioContext();

export function playSound(frequencies: number[], duration = 0.2) {
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
  { inc = 100, times = 3, duration = 0.1 } = {}
) {
  const frequencies = range(times).map((i) => frequency + inc * i);
  playSound(frequencies, duration);
}

const sounds = {
  success:
    "data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYwLjMuMTAwAAAAAAAAAAAAAAD/+0DAAAAAAAAAAAAAAAAAAAAAAABJbmZvAAAADwAAAAoAAATLADs7Ozs7Ozs7O1FRUVFRUVFRUVFnZ2dnZ2dnZ2dnfX19fX19fX19fZKSkpKSkpKSkpKoqKioqKioqKiovr6+vr6+vr6+vtTU1NTU1NTU1NTq6urq6urq6urq/////////////wAAAABMYXZjNjAuMy4AAAAAAAAAAAAAAAAkAsAAAAAAAAAEy19zMKkAAAAAAP/7EMQAAAPwVRM0EwAIvIst0xeAAJYQADAAAAABZwAyAAC7RGOeneWTJ6QAARIACJJhabXP9///taACYYQRFr5GwEGM+wXAP7m5LGVMb/H4m6VI+pAT8UXrE5n5NBYWgo5DcvoAACTA//sSxAICRRRVRbwdgACTimYcNm5BAUAAAL/88y3qtl//VsxFyYwXmMPIjQZY30PWohKYLJHWjVNlTYCAC3fT3PtyQsyKh7qAN0XogHrcMpej12gwUBXYzh31NbnbWmoBh/AuAAAAuFRY//sQxAUARORTMUQ81ACWC+Io9JgI51FaKFahryRWiRVWFjpXyTSTCBvFWMWA9kAqp82ABCANAIycILTNHUjkknLojSZ0RhaLQTMDXZ609isjDEUz0CG2hQrA0AAAACGQlK0MDjRAhBr/+xLECABE6F0Q5iTAiJiL4iD0mBR0nmSUimkoUnC6gYWyaLDWrC9HGF3Z48AZAiFengkaEyE4dORtJA04C7LwjptmmWwezzU0Uiw8D4WgpIQg6hYJAAAJGqxF8CNYLQiqDJEbc8lp5x7/+xDECwBEeF8SxhjHAHKL4+gwjYQ+sdJStejETci4OxNkLAn5pOgA0B1qCZ+inSwJG2hFUdyIsFWdRrRBDwa1UOBAAAAGWSCmKRJLMVNYmXEW2KOulpyYvbailaCd2BJaKcBBAmxKoP/7EsQUAERIXxbjDFYggouiFGSYALLRo1AydRJs6QwdKkB1zbFQcLdP36OW559pGghYLIwAAACiBfWHNDA2gvYKuMaPODIGOzhIhYdh98dhBAqQSAQZRM8lp1yUtNk2iUJcO9Ti7Tc0u//7EMQcgEPsSRtEjELIhAtioGMYBcO5eSgyS6J1AgMAAD9oOPYqbUWBck5I3nIp79Op0S1kHWIJQVZqALsKQKUwkgDDYNNDJIuOCmOPhSJErcw8+Q7Mjmo4olyjaMk/RZxa1apIoYAA//sSxCWCRHRfEMekwACLDCIYlJgAIDFYmiFyCOINUNRJC6DEzNiYwYObhGCgE1IUQCAEo1sqDLMWJOeUQMjcssq9j1O1ncNeFgylDwACO4gqALCZJo4AAASSaqvESTbj9Czjbilhrsxh//sQxCwAxAxbFsSIZCh8jCLgkwy8mbHRnM6JZaaUAAAgKAAwuAcOvKl8rZOtFpZIsSGNQEGNxgqCo0WUk2VqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xLENYBEGFMbgwhwKIII36iTDDmqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=",
  error:
    "data:audio/mpeg;base64,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",
};

export async function playAudio(type: keyof typeof sounds) {
  const sound = new Audio(sounds[type]);
  await sound.play();
}
