import {INITIAL_STATE, melodies, questions, result, statistics} from "./data/data";
import {showScreen} from './utils';
import {calcScoring} from './data/scoring';
import {printResults} from "./data/results";
import StateView from './components/state';
import LevelView from "./components/level";
import ResultScreen from './screens/result-screen';

let gameState = INITIAL_STATE;
let answers = [];
let levelState = new StateView(gameState);

/**
 * Запись новых свойств в объект состояния игры
 * @param {Object} prop - обновляемое свойство
 */
const updateGameStateProp = (prop) => {
  if (gameState.hasOwnProperty(Object.keys(prop))) {
    gameState = Object.assign({}, gameState, prop);
  } else {
    throw new Error(`Set only game state property`);
  }
};

/**
 * Задать новое состояние игры
 * @param {boolean} verdict - заключение о правильности ответа
 * @param {number} time - текущее время, заданное таймером
 */
const setGameState = (verdict, time) => {
  answers.push({success: verdict, time});
  updateGameStateProp({answers});

  if (!verdict && gameState.restAttempts >= 0) {
    updateGameStateProp({restAttempts: gameState.restAttempts - 1});
  }
  const points = calcScoring(gameState.answers, gameState.restAttempts);
  updateGameStateProp({points});
};

/**
 * Запустить игру с первого вопроса
 */
export const startNewGame = () => {
  gameState = Object.assign({}, INITIAL_STATE);
  answers = [];
  levelState = new StateView(gameState);
  const levelScreen = new LevelView(melodies, questions[0], levelState);
  showScreen(levelScreen.element);

  levelScreen.onAnswer = (question, answer) => {
    processUserAnswer(question, answer);
  };
};

/**
 * Обновить экран
 * @param {Object} state
 * @return {Object} levelScreen
 */
const updateScreen = (state) => {
  const levelScreen = new LevelView(melodies, questions[gameState.question], new StateView(state));
  showScreen(levelScreen.element);
  return levelScreen;
};

/**
 * Показать экран со следующим вопросом
 */
const showNextLevel = () => {
  updateGameStateProp({question: ++gameState.question});
  const levelScreen = updateScreen(gameState);
  levelScreen.onAnswer = (question, answer) => {
    processUserAnswer(question, answer);
  };
};

/**
 * Показать экран с результатом игры
 */
const showResultScreen = () => {
  const stats = printResults(statistics, gameState);
  const resultScreen = gameState.points === null ?
    new ResultScreen(result.LOSE, stats)
    :
    new ResultScreen(result.WIN, stats);
  showScreen(resultScreen.element);

  if (gameState.points !== null) {
    statistics.push(gameState.points);
  }

  resultScreen.onRestartClick = () => {
    startNewGame();
  };
};

/**
 * Обработка ответов пользователя
 * @param {Object} question - Текущий вопрос
 * @param {number|Array} answer - Ответ пользователя в виде числа или массива
 */
const processUserAnswer = (question, answer) => {
  let verdict = false;
  if (question.type === `artist`) {
    verdict = answer === question.answer;
  } else {
    const rightAnswers = Array.from(question.variants).filter((i) => melodies[i].genre === question.answer);
    verdict = rightAnswers.every((a, i) => a === answer[i]);
  }

  setGameState(verdict, Math.floor(Math.random() * 60));

  if (gameState.points !== null && gameState.question < questions.length - 1) {
    showNextLevel();
  } else {
    showResultScreen();
  }
};
