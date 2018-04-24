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
    this.levelView.onAnswer = this.processUserAnswer.bind(this);
  }

  showNextQuestion() {
    this.updateStateView();
    const nextQuestion = new LevelView(this.model.melodies, this.model.getNextQuestion());
    nextQuestion.onAnswer = this.processUserAnswer.bind(this);
    this.updateLevelView(nextQuestion);
  }

  showResultScreen() {
    const stats = this.model.getStats();
    this.model.updateStats();
    Application.showStats(stats);
  }
}
