import StateView from '../components/state';
import LevelView from '../components/level';
import Application from '../application';
import Timer from '../data/timer';


export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.time = this.model.state.time;
    this.timer = new Timer(this.time, this.updateStateTime.bind(this), this.stopGame);
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

  stopGame() {
    this.timer.stop();
    this.showResultScreen();
  }

  startGame() {
    this.showNextLevel();
    this.timer.start();
  }

  processUserAnswer(question, answer) {
    let verdict = false;
    if (question.type === `artist`) {
      verdict = answer === question.answer;
    } else {
      verdict = this.model.rightGenreAnswers.every((a, i) => a === answer[i]);
    }

    // TODO: Не забыть заменить рандомное время на возвращаемое таймером
    this.model.setGameState(verdict, Math.floor(Math.random() * 60));

    if (this.model.hasNextQuestion()) {
      this.showNextLevel();
    } else {
      this.showResultScreen();
    }
  }

  updateStateView() {
    const stateView = new StateView(this.model.state);
    this.root.replaceChild(stateView.element, this.levelState.element);
    this.levelState = stateView;
  }

  updateStateTime(time) {
    this.model.setRestTime(time);
    this.updateStateView();
  }

  updateLevelView(view) {
    this.root.replaceChild(view.element, this.levelView.element);
    this.levelView = view;
  }

  showNextLevel() {
    this.updateStateView();
    const nextLevel = new LevelView(this.model.melodies, this.model.getCurrentQuestion());
    nextLevel.onAnswer = this.processUserAnswer.bind(this);
    this.model.nextQuestion();
    this.updateLevelView(nextLevel);
  }

  showResultScreen() {
    const stats = this.model.getStats();
    this.model.updateStats();
    Application.showStats(stats);
  }
}
