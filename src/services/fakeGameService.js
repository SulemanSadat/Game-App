import * as genresAPI from "./fakeGenreService";

const games = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Action",
    genre: { _id: "5b21ca3eeb7f6fbccd471815", name: "Action" },
    version: 2.4,
    os: "Android",
  },
  {
    _id: "5b21ca3eeb7sdggcd471815",
    title: "Metal Squad",
    genre: { _id: "5b21ca3eeb7sdggcd471815", name: "Strategy" },
    version: 2.4,
    os: "Android",
  },
  {
    _id: "5b21ca3egagf6fbccd471815",
    title: "Modern Combat 4",
    genre: { _id: "5b21ca3egagf6fbccd471815", name: "Action" },
    version: 0.4,
    os: "IOS",
  },
  {
    _id: "5b21ca3eeasgcd471815",
    title: "OffRoad Drive Desert",
    genre: { _id: "5b21ca3eeasgcd471815", name: "Strategy" },
    version: 1.4,
    os: "IOS",
  },
  {
    _id: "5b21asgdsdaccd471815",
    title: "Punch Boxing ",
    genre: { _id: "5b21asgdsdaccd471815", name: "Action" },
    version: 1.4,
    os: "Android",
  },
  {
    _id: "5b21c1815",
    title: "Score Hero",
    genre: { _id: "5b21c1815", name: "Strategy" },
    version: 2.1,
    os: "Android",
  },
  {
    _id: "5b2815",
    title: "Prison break",
    genre: { _id: "5b2815", name: "Strategy" },
    version: 2.2,
    os: "IOS",
  },

];

export function getGames() {
  return games;
}

export function getGame(id) {
  return games.find(m => m._id === id);
}

export function saveGame(game) {
  let gameInDb = games.find(m => m._id === game._id) || {};
  gameInDb.title = game.title;
  gameInDb.genre = genresAPI.genres.find(g => g._id === game.genreId);
  gameInDb.version = game.version;
  gameInDb.os = game.os;

  if (!gameInDb._id) {
    gameInDb._id = Date.now().toString;
    games.push(gameInDb);
  }

  return gameInDb;
}

export function deleteGame(id) {
  let gameInDb = games.find(m => m._id === id);
  games.splice(games.indexOf(gameInDb), 1);
  return gameInDb;
}
