export const setItem = (value, key) => localStorage.setItem(key, JSON.stringify(value));

export const getItem = (key) => JSON.parse(localStorage.getItem(key));
