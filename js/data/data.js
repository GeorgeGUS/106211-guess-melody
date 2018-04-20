export const INITIAL_STATE = Object.freeze({
  question: 0,
  answers: [],
  attempts: 3,
  time: 300,
  points: 0,
  restAttempts: 3,
  restTime: 300
});


export const statistics = [1, 4, 5, 8];

export const numerals = {
  mistakes: [`ошибку`, `ошибки`, `ошибок`],
  points: [`балл`, `балла`, `баллов`],
  fastPoints: [`быстрый`, `быстрых`, `быстрых`],
  minutes: [`минуту`, `минуты`, `минут`],
  seconds: [`секунду`, `секунды`, `секунд`]
};

export const result = {
  WIN: {
    titles: [`Вы - настоящий меломан!`, `Мне бы вашу удачу!`],
    button: `Сыграть ещё раз`
  },
  LOSE: {
    titles: [`Увы и ах!`, `Какая жалость!`, `Это фиаско!`],
    button: `Попробовать ещё раз`
  }
};

export const melodies = [
  {
    artist: `Пелагея`,
    name: `Не для тебя`,
    image: `https://avatars.yandex.net/get-music-content/34131/865593e3.p.160603/s200x200`,
    src: `https://instaud.io/_/239d.mp3`,
    genre: `Folk`
  },
  {
    artist: `Краснознаменная дивизия имени моей бабушки`,
    name: `Таити`,
    image: `https://avatars.yandex.net/get-music-content/42108/47a06401.p.519187/s200x200`,
    src: `https://instaud.io/_/239b.mp3`,
    genre: `Rock`
  },
  {
    artist: `Lorde`,
    name: `Royals`,
    image: `https://avatars.yandex.net/get-music-content/97284/cd60c411.p.1654436/s200x200`,
    src: `https://instaud.io/_/239c.mp3`,
    genre: `Pop`
  },
  {
    artist: `The Weeknd ft. Duft Punk`,
    name: `I Feel It Coming`,
    image: `https://cdn-85d.myzcloud.me/img/68/13012763/33614481.jpg`,
    src: `https://instaud.io/_/239e.mp3`,
    genre: `R&B`
  },
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=6feb0654949ef64c`,
    genre: `Electronic`
  }
];

// Начальная структура того, как будут выглядеть вопросы
export const questions = [
  {
    type: `artist`,
    variants: new Set([0, 1, 2]),
    answer: 2
  },
  {
    type: `genre`,
    variants: new Set([1, 3, 5, 7]),
    answer: `Rock`
  },
  {
    type: `artist`,
    variants: new Set([3, 4, 5]),
    answer: 4
  },
  {
    type: `genre`,
    variants: new Set([2, 4, 6, 8]),
    answer: `Pop`
  },
  {
    type: `artist`,
    variants: new Set([6, 7, 8]),
    answer: 6
  },
  {
    type: `genre`,
    variants: new Set([1, 2, 3, 4]),
    answer: `Jazz`
  },
  {
    type: `artist`,
    variants: new Set([4, 6, 8]),
    answer: 8
  },
  {
    type: `genre`,
    variants: new Set([4, 6, 7, 8]),
    answer: `R&B`
  },
  {
    type: `artist`,
    variants: new Set([3, 5, 7]),
    answer: 7
  },
  {
    type: `genre`,
    variants: new Set([3, 4, 5, 9]),
    answer: `Electronic`
  }
];
