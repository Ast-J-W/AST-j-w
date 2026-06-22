const express = require('express');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API de biblioteca de videojuegos funcionando');
});

/* =========================
   API 1: Juegos
========================= */

app.get('/juegos', (req, res) => {
  try {
    const juegos = db.prepare('SELECT * FROM juegos').all();
    res.json(juegos);
  } catch (error) {
    console.error('Error en GET /juegos:', error.message);
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
});

app.post('/juegos', (req, res) => {
  try {
    const { titulo, genero, precio } = req.body;

    if (!titulo || !genero || precio === undefined) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (precio < 0) {
      return res.status(400).json({ error: 'El precio no puede ser negativo' });
    }

    const result = db
      .prepare('INSERT INTO juegos (titulo, genero, precio) VALUES (?, ?, ?)')
      .run(titulo, genero, precio);

    res.status(201).json({
      id: result.lastInsertRowid,
      titulo,
      genero,
      precio
    });
  } catch (error) {
    console.error('Error en POST /juegos:', error.message);
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
});

app.put('/juegos/:id', (req, res) => {
  try {
    const { titulo, genero, precio } = req.body;

    if (!titulo || !genero || precio === undefined) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (precio < 0) {
      return res.status(400).json({ error: 'El precio no puede ser negativo' });
    }

    const info = db
      .prepare('UPDATE juegos SET titulo = ?, genero = ?, precio = ? WHERE id = ?')
      .run(titulo, genero, precio, req.params.id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    res.json({ mensaje: 'Juego actualizado' });
  } catch (error) {
    console.error('Error en PUT /juegos/:id:', error.message);
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
});

app.delete('/juegos/:id', (req, res) => {
  try {
    const info = db.prepare('DELETE FROM juegos WHERE id = ?').run(req.params.id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    res.json({ mensaje: 'Juego eliminado' });
  } catch (error) {
    console.error('Error en DELETE /juegos/:id:', error.message);
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
});

/* =========================
   API 2: Reseñas
========================= */

app.get('/resenas', (req, res) => {
  try {
    const resenas = db.prepare('SELECT * FROM resenas').all();
    res.json(resenas);
  } catch (error) {
    console.error('Error en GET /resenas:', error.message);
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
});

app.post('/resenas', (req, res) => {
  try {
    const { juego_id, autor, calificacion, comentario } = req.body || {};

    if (!juego_id || !autor || calificacion === undefined || !comentario) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });
    }

    const juego = db.prepare('SELECT * FROM juegos WHERE id = ?').get(juego_id);

    if (!juego) {
      return res.status(404).json({ error: 'El juego asociado no existe' });
    }

    const resenaExistente = db
      .prepare('SELECT * FROM resenas WHERE juego_id = ? AND autor = ?')
      .get(juego_id, autor);

    if (resenaExistente) {
      return res.status(409).json({
        error: 'El usuario ya publicó una reseña para este juego'
      });
    }

    const result = db
      .prepare('INSERT INTO resenas (juego_id, autor, calificacion, comentario) VALUES (?, ?, ?, ?)')
      .run(juego_id, autor, calificacion, comentario);

    res.status(201).json({
      id: result.lastInsertRowid,
      juego_id,
      autor,
      calificacion,
      comentario
    });
  } catch (error) {
    console.error('Error en POST /resenas:', error.message);
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
});

app.put('/resenas/:id', (req, res) => {
  try {
    const { juego_id, autor, calificacion, comentario } = req.body;

    if (!juego_id || !autor || calificacion === undefined || !comentario) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });
    }

    const juego = db.prepare('SELECT * FROM juegos WHERE id = ?').get(juego_id);

    if (!juego) {
      return res.status(404).json({ error: 'El juego asociado no existe' });
    }

    const resenaDuplicada = db
      .prepare('SELECT * FROM resenas WHERE juego_id = ? AND autor = ? AND id != ?')
      .get(juego_id, autor, req.params.id);

    if (resenaDuplicada) {
      return res.status(409).json({
        error: 'Ya existe otra reseña de este autor para el mismo juego'
      });
    }

    const info = db
      .prepare('UPDATE resenas SET juego_id = ?, autor = ?, calificacion = ?, comentario = ? WHERE id = ?')
      .run(juego_id, autor, calificacion, comentario, req.params.id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    res.json({ mensaje: 'Reseña actualizada' });
  } catch (error) {
    console.error('Error en PUT /resenas/:id:', error.message);
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
});

app.delete('/resenas/:id', (req, res) => {
  try {
    const info = db.prepare('DELETE FROM resenas WHERE id = ?').run(req.params.id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    res.json({ mensaje: 'Reseña eliminada' });
  } catch (error) {
    console.error('Error en DELETE /resenas/:id:', error.message);
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
});

app.listen(3000, () => {
  console.log('API corriendo en http://localhost:3000');
});
