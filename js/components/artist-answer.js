import {createElementFromString} from '../utils';

export const INPUT_NAME = `answer`;

export default (answer, id) => {
  const artistAnswer = `
  <div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${id}" name="${INPUT_NAME}" value="val-${id}"/>
    <label class="main-answer" for="answer-${id}">
      <img class="main-answer-preview" src="${answer.image}"
           alt="${answer.artist}" width="134" height="134">
      ${answer.artist}
    </label>
  </div>`;

  return createElementFromString(artistAnswer);
};

