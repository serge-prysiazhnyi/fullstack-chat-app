import { LocalStorageItems } from '../types/sharedTypes';

export const clearLocalStorage = () => {
  localStorage.removeItem(LocalStorageItems.TOKEN);
  localStorage.removeItem(LocalStorageItems.CHAT_USER);
};
