import StateView from '../components/state';
import LevelView from '../components/level';
import Application from '../application';
import Timer from '../data/timer';


export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.time = this.model.state.restTime;
    this.timer = new Timer(this.time,
        this.onTimerTick.bind(this),
        this.onTimerEnd.bind(this));
    this._startTime = this.timer.currentTime;

    this.levelState = new StateView(this.model.state);
    this.levelView = new LevelView(this.model.melodies, this.model.getCurrentQuestion());

    this.root = document.createElement(`section`);
    this.root.classList.add(`main`, `main--level`);
    this.root.appendChild(this.levelState.element);
    this.root.appendChild(this.levelView.element);


    this.levelView.onLevelLoaded = () => {
      this._startTime = this.timer.currentTime;
    };
  }

  get element() {
    return this.root;
  }

  startGame() {
    this.showFirstQuestion();
    this.timer.start();
  }

  onTimerTick(time) {
    this.updateStateTime(time);
  }

  onTimerEnd() {
    this.showResultScreen();
  }

  setStartTimeForAnswer() {
    this._startTime = this.timer.currentTime;
  }

  processUserAnswer(question, answer) {
    let verdict = false;
    if (question.type === `artist`) {
      verdict = answer === question.answer;
    } else {
      verdict = this.model.rightGenreAnswers.every((a, i) => a === answer[i]);
    }

    const timeForAnswer = this._startTime - this.timer.currentTime;
    this.model.setGameState(verdict, timeForAnswer);

    if (this.model.hasNextQuestion()) {
      this.showNextQuestion();
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

  showFirstQuestion() {
    this.levelView.onLevelLoaded = this.setStartTimeForAnswer.bind(this);
    this.levelView.onAnswer = this.processUserAnswer.bind(this);
  }

  showNextQuestion() {
    this.updateStateView();
    const nextQuestion = new LevelView(this.model.melodies, this.model.getNextQuestion());
    nextQuestion.onLevelLoaded = this.setStartTimeForAnswer.bind(this);
    nextQuestion.onAnswer = this.processUserAnswer.bind(this);
    this.updateLevelView(nextQuestion);
  }

  showResultScreen() {
    this.timer.stop();
    const stats = this.model.getStats();
    this.model.updateStats();
    Application.showStats(stats);
  }
}
