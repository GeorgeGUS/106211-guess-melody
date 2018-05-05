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
  return JSON.stringify(data).match(new RegExp(`"${type}":".+?"`, `g`))
      .map((it) => JSON.parse(`{${it}}`)[type]);
};

const preloadSong = (src) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    try {
      audio.addEventListener(`canplaythrough`, resolve);
    } catch (e) {
      reject(e);
    }

    audio.src = src;
    audio.load();
  });
};

const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    try {
      image.addEventListener(`load`, resolve);
    } catch (e) {
      reject(e);
    }
    image.src = src;
  });
};

export default class Loader {
  static async loadData() {
    const response = await fetch(`${SERVER_URL}/questions`);
    checkResponseStatus(response);
    const responseData = await response.json();
    return adaptData(responseData);
  }

  static async preloadResources(data) {
    const songs = getUrlsByType(data, SourseType.AUDIO).map((src) => preloadSong(src));
    const images = getUrlsByType(data, SourseType.IMAGE).map((src) => preloadImage(src));
    const elements = [...songs, ...images];
    // console.log(elements);
    return await Promise.all(elements);
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
