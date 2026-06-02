const Database = require('better-sqlite3');

const db = new Database('datos.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS juegos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    genero TEXT NOT NULL,
    precio INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS resenas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    juego_id INTEGER NOT NULL,
    autor TEXT NOT NULL,
    calificacion INTEGER NOT NULL,
    comentario TEXT NOT NULL,
    FOREIGN KEY (juego_id) REFERENCES juegos(id)
  );
`);

module.exports = db;