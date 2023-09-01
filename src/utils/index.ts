export function rand(max = 1, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
