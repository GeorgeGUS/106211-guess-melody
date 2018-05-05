import WelcomeScreen from './screens/welcome-screen';
import GameModel from './data/game-model';
import GameScreen from './screens/game-screen';
import ResultScreen from './screens/result-screen';
import ErrorScreen from "./screens/error-screen";
import Loader from "./loader";
import LoadingScreen from "./screens/loading-screen";

/**
 * Рендер экран приложения
 * @param {Node} element - Элемент экрана
 */
export const showScreen = (element) => {
  const mainScreen = document.querySelector(`.app .main`);
  mainScreen.parentNode.replaceChild(element, mainScreen);
};

let questions = [];
let resources = [];

/** Класс для управления экранами игры */
export default class Application {
  static async start() {
    try {
      Application.showLoading();
      questions = await Loader.loadData();
      resources = await Loader.preloadResources(questions);
      Application.showWelcome();
    } catch (e) {
      Application.showError(e);
    }
  }

  static showWelcome() {
    console.log(questions);
    console.log(resources);
    const welcome = new WelcomeScreen();
    showScreen(welcome.element);
  }

  static showGame() {
    const gameScreen = new GameScreen(new GameModel(questions, resources));
    showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static async showStats(state) {
    Application.showLoading();
    const stats = GameModel.getStats(state);
    if (stats.isWin) {
      const result = {
        points: stats.points,
        time: stats.time
      };

      try {
        await Loader.saveStats(result);
        const data = await Loader.loadStats();
        const newStats = GameModel.getStats(state, data);
        showScreen(new ResultScreen(newStats).element);
      } catch (e) {
        Application.showError(e);
      }

    } else {
      showScreen(new ResultScreen(stats).element);
    }
  }

  static showLoading() {
    showScreen(new LoadingScreen().element);
  }

  static showError(message) {
    showScreen(new ErrorScreen(message).element);
  }
}
