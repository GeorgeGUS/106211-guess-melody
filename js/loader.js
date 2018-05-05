import Storage from "./storage";

const SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = 127367003;

export const QuestionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

export const SourseType = {
  AUDIO: `src`,
  IMAGE: `url`
};

const checkResponseStatus = (response) => {
  if (response.ok) {
    return response;
  } else if (response.status === 404) {
    throw new Error(`Данные не удалось загрузить,<br> ошибка ${response.status}`);
  } else {
    throw new Error(`Произошла ошибка ${response.status} ${response.statusText}`);
  }
};

const adaptData = (data) => {
  return data.map((question) => {
    let adapted;
    if (question.type === QuestionType.ARTIST) {
      const variants = question.answers.map((it) => {
        return {
          artist: it.title,
          image: it.image
        };
      });
      adapted = {
        type: question.type,
        title: question.question,
        variants,
        melody: question.src,
        answer: question.answers.findIndex((a) => a.isCorrect)
      };

    } else if (question.type === QuestionType.GENRE) {
      const variants = question.answers.map((a, i) => {
        return Object.assign({}, a, {id: i});
      });
      adapted = {
        type: question.type,
        title: question.question,
        variants,
        answer: question.genre
      };
    }
    return adapted;
  });
};

const getUrlsByType = (data, type) => {
  const sortedUrls = JSON.stringify(data).match(new RegExp(`"${type}":".+?"`, `g`));
  const urls = new Set();
  for (const it of sortedUrls) {
    urls.add(JSON.parse(`{${it}}`)[type]);
  }
  return Array.from(urls);
};

export default class Loader {
  static async loadData() {
    const response = await fetch(`${SERVER_URL}/questions`);
    checkResponseStatus(response);
    const responseData = await response.json();
    return adaptData(responseData);
  }

  static async preloadResources(data) {
    const storage = new Storage();
    const images = getUrlsByType(data, SourseType.IMAGE).map((src) => storage.preloadImage(src));
    const songs = getUrlsByType(data, SourseType.AUDIO).map((src) => storage.preloadSong(src));
    const promises = [...images, ...songs];
    await Promise.all(promises);

    return storage.storedElements;
  }

  static async loadStats() {
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}`);
    checkResponseStatus(response);
    return await response.json();
  }

  static async saveStats(data) {
    const settings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}`, settings);
    return checkResponseStatus(response);
  }
}
