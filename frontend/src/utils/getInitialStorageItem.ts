export const getInitialStorageItem = (key: string) => {
  const savedItem = localStorage.getItem(key);

  if (!!savedItem && typeof savedItem === 'string') {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  return null;
};
