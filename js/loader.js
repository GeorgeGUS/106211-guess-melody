/* eslint-disable no-console */

const SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = 127367003;

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
  return data.map((question, iq) => {
    let adapted;
    if (question.type === `artist`) {
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
      // TODO: remove
      console.log(`${iq + 1}. Right answer - ${adapted.answer}`);

    } else if (question.type === `genre`) {
      const variants = question.answers.map((a, i) => {
        return Object.assign({}, a, {id: i});
      });
      adapted = {
        type: question.type,
        title: question.question,
        variants,
        answer: question.genre
      };
      // TODO: remove
      const rightAnswers = Array.from(adapted.variants).filter((variant) => {
        return variant.genre === adapted.answer;
      }).map((rightAnswer) => rightAnswer.id);
      console.log(`${iq + 1}. Right answer - ${rightAnswers.join()}`);

    }
    return adapted;
  });
};

export default class Loader {
  static async loadData() {
    const response = await fetch(`${SERVER_URL}/questions`);
    checkResponseStatus(response);
    const responseData = await response.json();
    return adaptData(responseData);
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
