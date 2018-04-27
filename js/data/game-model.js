import {INITIAL_STATE, statistics} from "../data/data";
import {calcScoring} from "./scoring";
import {printResults} from "./results";

export const adaptData = (data) => {
  return data.map((question) => {
    let adapted;
    if (question.type === `artist`) {
      const variants = [];
      for (const it of question.answers) {
        variants.push({
          artist: it.title,
          image: it.image
        });
      }
      const answer = question.answers.findIndex((a) => a.isCorrect);
      adapted = {
        type: question.type,
        title: question.question,
        variants,
        melody: question.src,
        answer
      };
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
    }
    return adapted;
  });
};

export default class GameModel {
  constructor(questions) {
    this.restart();
    this.statistics = statistics;
    this.questions = questions;
  }

  get state() {
    return this._state;
  }

  updateStateProp(prop) {
    if (this._state.hasOwnProperty(Object.keys(prop))) {
      this._state = Object.assign({}, this._state, prop);
    } else {
      throw new Error(`Set only game state property`);
    }
  }

  setGameState(verdict, time) {
    this._answers.push({success: verdict, time});
    this.updateStateProp({answers: this._answers});

    if (!verdict && this._state.restAttempts >= 0) {
      this.updateStateProp({restAttempts: this._state.restAttempts - 1});
    }
    const points = calcScoring(this._answers, this._state.restAttempts);
    this.updateStateProp({points});
  }

  hasNextQuestion() {
    return this._state.points !== null && this._state.question < this.questions.length - 1;
  }

  getCurrentQuestion() {
    return this.questions[this._state.question];
  }

  getNextQuestion() {
    this.updateStateProp({question: this._state.question + 1});
    return this.getCurrentQuestion();
  }

  getStats() {
    return printResults(this.statistics, this._state);
  }

  restart() {
    this._answers = [];
    this._state = INITIAL_STATE;
    this.updateStateProp({answers: this._answers});
  }

  updateStats() {
    if (this._state.points !== null) {
      this.statistics.push(this._state.points);
    }
  }

  setRestTime(restTime) {
    this.updateStateProp({restTime});
  }
}
