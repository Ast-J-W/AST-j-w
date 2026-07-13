const Database = require('better-sqlite3');

const db = new Database('datos.db');
db.pragma('foreign_keys = ON');
db.exec(`
CREATE TABLE IF NOT EXISTS juegos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  genero TEXT NOT NULL,
  precio INTEGER NOT NULL CHECK (precio >= 0)
);

CREATE TABLE IF NOT EXISTS resenas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  juego_id INTEGER NOT NULL,
  autor TEXT NOT NULL,
  calificacion INTEGER NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
  comentario TEXT NOT NULL,
  UNIQUE (juego_id, autor),
  FOREIGN KEY (juego_id) REFERENCES juegos(id) ON DELETE CASCADE
);
`);

module.exports = db;
