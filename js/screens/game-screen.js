import AbstractView from "../abstract-view";
import StateView from '../components/state';
import LevelView from '../components/level';
import Application from '../application';
import Timer from '../data/timer';


export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.timer = new Timer(this.model.state.time, this.updateStateView, this.stopGame);
    this.levelState = new StateView(this.model.state);
    this.levelView = new LevelView(this.model.melodies, this.model.getCurrentQuestion());


    this.root = document.createElement(`section`);
    this.root.classList.add(`main`, `main--level`);
    this.root.appendChild(this.levelState.element);
    this.root.appendChild(this.levelView.element);
  }

  get element() {
    return this.root;
  }

  init() {

  }

  stopGame() {
    this.timer.stop();
  }

  startGame() {
    this.timer.start();
  }

  updateStateView() {

  }
}
