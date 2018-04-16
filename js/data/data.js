export const initialState = {
  question: 0,
  attempts: 3,
  time: 300,
  user: {
    points: 0,
    fastPoints: 0,
    restNotes: 3,
    restTime: 300
  }
};

export const INPUT_NAME = `answer`;

export const statistics = [1, 4, 5, 8];

export const numerals = {
  mistakes: [`ошибку`, `ошибки`, `ошибок`],
  points: [`балл`, `балла`, `баллов`],
  fastPoints: [`быстрый`, `быстрых`, `быстрых`],
  minutes: [`минуту`, `минуты`, `минут`],
  seconds: [`секунду`, `секунды`, `секунд`]
};

export const genres = {
  'Rock': `инди-рок`,
  'Jazz': `джаз`,
  'Country': `кантри`,
  'Pop': `поп-музыка`,
  'Folk': `фолк`,
  'R&B': `R&B`,
  'Electronic': `электронная музыка`
};

export const result = {
  WIN: {
    title: `Вы - настоящий меломан!`,
    button: `Сыграть ещё раз`
  },
  LOSE: {
    title: [`Увы и ах!`, `Какая жалость!`, `Это фиаско!`],
    button: `Попробовать ещё раз`
  }
};

export const melodies = [
  {
    artist: `Пелагея`,
    name: `Не для тебя`,
    image: `https://avatars.yandex.net/get-music-content/34131/865593e3.p.160603/s200x200`,
    src: `https://myzcloud.me/song/dl/636594516620011335/cce7ea16b80a7ce9b632a4e7b8124f8a/5630543`,
    genre: `Folk`
  },
  {
    artist: `Краснознаменная дивизия имени моей бабушки`,
    name: `Таити`,
    image: `https://avatars.yandex.net/get-music-content/42108/47a06401.p.519187/s200x200`,
    src: `https://myzcloud.me/song/dl/636594514038446843/7e27418a95a60559a316cbe1a765d399/34732350`,
    genre: `Rock`
  },
  {
    artist: `Lorde`,
    name: `Royals`,
    image: `https://avatars.yandex.net/get-music-content/97284/cd60c411.p.1654436/s200x200`,
    src: `https://myzcloud.me/song/dl/636594515775991200/c1ac2312a2e3ae6e8e2701a5fe527d52/15503620`,
    genre: `Pop`
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

export const currentState = {
  question: 0,
  attempts: 3,
  time: 300,
  user: {
    points: 10, // Для теста, потом сброшу
    fastPoints: 3, // Для теста, потом сброшу
    restNotes: 2, // Для теста, потом сброшу
    restTime: 123 // Для теста, потом сброшу
  }
};

// Начальная структура того, как будут выглядеть вопросы
export const questions = [
  {
    type: `artist`,
    variants: new Set([0, 1, 2]),
    answer: 1
  },
  {
    type: `genre`,
    variants: new Set([0, 1, 2, 3]),
    answer: `Rock`
  },
  {
    type: `artist`,
    variants: new Set([3, 4, 5]),
    answer: 4
  },
  {
    type: `genre`,
    variants: new Set([5, 6, 7, 8]),
    answer: `Pop`
  },
  {
    type: `artist`,
    variants: new Set([6, 7, 8]),
    answer: 7
  },
  {
    type: `genre`,
    variants: new Set([1, 2, 3, 4]),
    answer: `Jazz`
  },
  {
    type: `artist`,
    variants: new Set([3, 6, 8]),
    answer: 6
  },
  {
    type: `genre`,
    variants: new Set([5, 6, 7, 8]),
    answer: `Country`
  },
  {
    type: `artist`,
    variants: new Set([4, 5, 7]),
    answer: 5
  },
  {
    type: `genre`,
    variants: new Set([3, 4, 5, 8]),
    answer: `Electronic`
  }
];
