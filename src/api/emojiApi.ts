import axios from 'axios';

// описание данных, которые приходят с сервера
export interface IEmojiItem {
  emoji: string;
  title: string;
  keywords: string;
}

const API_URL = 'http://localhost:3000/api/emojis';

// получаем эмодзи с сервера, query - поисковый текст
export const getEmojis = async (query: string = ''): Promise<IEmojiItem[]> => {
  const response = await axios.get<IEmojiItem[]>(API_URL, {
    params: { q: query },
  });
  return response.data;
};
