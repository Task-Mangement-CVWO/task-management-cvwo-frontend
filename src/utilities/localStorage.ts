export function getLocalStorageValue(key: string): string | null {
  const res = localStorage.getItem(key);
  return res ? res : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setLocalStorageValue(key: string, value: any) {
  localStorage.setItem(key, value);
}

export function removeLocalStorageValue(key: string) {
  localStorage.removeItem(key);
}
