import {INITIAL_STATE, melodies, questions, result, statistics} from "../data/data";
import {calcScoring} from "./scoring";

const getQuestion = (state) => questions[state.question];

export default class GameModel {
  constructor() {
    this.restart();
  }

  get melodies() {
    return melodies;
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
    const points = calcScoring(this._state.this._answers, this._state.restAttempts);
    this.updateStateProp({points});
  }

  nextQuestion() {

  }

  getCurrentQuestion() {
    return getQuestion(this._state);
  }

  restart() {
    this._state = INITIAL_STATE;
    this._answers = [];
  }

  tick() {
    this.updateStateProp({restTime: this._state.restTime - 1});
  }
}
