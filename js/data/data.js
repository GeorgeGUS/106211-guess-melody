export const initialState = {
  currentScreen: 0,
  attempts: 3,
  time: 300,
  user: {
    points: 0,
    fastPoints: 0,
    restNotes: 3,
    restTime: 300
  }
};

export const currentState = {
  currentScreen: 0,
  attempts: 3,
  time: 300,
  user: {
    points: 0,
    fastPoints: 0,
    restNotes: 3,
    restTime: 300
  }
};

export const statistics = [1, 4, 5, 8];

export const kindOfGame = [`artist`, `genre`];

export const screens = [`welcome`, kindOfGame, `result`];

export const questions = {
  artist: new Map([
    [``, ``],
    [``, ``],
    [``, ``],
    [``, ``],
    [``, ``]
  ]),
  genre: new Map([
    [``, ``],
    [``, ``],
    [``, ``],
    [``, ``],
    [``, ``]
  ])
};

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
    src: `https://cs9-2v4.vkuseraudio.net/p6/c82f817a9e5e0f.mp3?extra=ccpesYIdZZCXVPLR0bcTGSH1qsjC-JLvdR_H3JT-qYNwOLyG3Qw8ItzftklkBfww1lb_6hkb8HiXSgOv89TomzrTssJnqilcK1DwcWl7hijyV6DRONgUB6yPTbnt8Bb6rhYIt3WZJx8`,
    genre: `Folk`
  },
  {
    artist: `Краснознаменная дивизия имени моей бабушки`,
    name: `Таити`,
    image: `https://avatars.yandex.net/get-music-content/42108/47a06401.p.519187/s200x200`,
    src: `https://cs9-4v4.vkuseraudio.net/p24/e2550ce69ef3f7.mp3?extra=qI0zdFEL_CoutWtPHI046NV4WleDMF5qSmErNxlGeHwiWdgR5wPpzVbIjjhYqRfxmdNI5S4xZ01GWOsrylOXvz6roC1kqcMeAF4-tkgn-iNlnl7zdyP5BCilrikVztp1tT5bGcy8xX0`,
    genre: `Rock`
  },
  {
    artist: `Lorde`,
    name: `Royals`,
    image: `https://avatars.yandex.net/get-music-content/97284/cd60c411.p.1654436/s200x200`,
    src: `https://cs9-15v4.vkuseraudio.net/p14/aa8b0315e25aac.mp3?extra=xkbrEN58rP8iV9-tBblxlYtLa-T24m1p-bHPvJhonCA4uIpKE2x0H17f6a1HdhpDx4-g1WpQZMaANSuO8mjji8AvxbuSBwvz2ogoSke1jPd9Pw1txnobFznhAh7M79EE204-ikped5Rdxw`,
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
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];
