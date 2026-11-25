const storage = localStorage;

export function load<T>(key: string, fallback: T): T {
  try {
    const saved = storage.getItem(key);
    return saved === null ? fallback : (JSON.parse(saved) as T);
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable: data lasts for session only
  }
}
