export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  const storedValue = localStorage.getItem(key);

  if (storedValue === null) {
    return null;
  }

  return JSON.parse(storedValue);
};

