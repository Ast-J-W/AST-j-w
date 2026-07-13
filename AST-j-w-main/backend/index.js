const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API de biblioteca de videojuegos funcionando');
});

app.get('/juegos', (req, res) => {
  try {
    const juegos = db.prepare('SELECT * FROM juegos').all();
    res.json(juegos);
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/juegos', (req, res) => {
  try {
    const { titulo, genero, precio } = req.body;
    if (!titulo || !genero || precio === undefined) return res.status(400).json({ error: 'Faltan campos obligatorios' });
    if (precio < 0) return res.status(400).json({ error: 'El precio no puede ser negativo' });

    const result = db.prepare('INSERT INTO juegos (titulo, genero, precio) VALUES (?, ?, ?)').run(titulo, genero, precio);
    res.status(201).json({ id: result.lastInsertRowid, titulo, genero, precio });
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.put('/juegos/:id', (req, res) => {
  try {
    const { titulo, genero, precio } = req.body;
    if (!titulo || !genero || precio === undefined) return res.status(400).json({ error: 'Faltan campos obligatorios' });
    if (precio < 0) return res.status(400).json({ error: 'El precio no puede ser negativo' });

    const info = db.prepare('UPDATE juegos SET titulo = ?, genero = ?, precio = ? WHERE id = ?').run(titulo, genero, precio, req.params.id);
    if (info.changes === 0) return res.status(404).json({ error: 'Juego no encontrado' });

    res.json({ mensaje: 'Juego actualizado' });
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.delete('/juegos/:id', (req, res) => {
  try {
    const info = db.prepare('DELETE FROM juegos WHERE id = ?').run(req.params.id);
    if (info.changes === 0) return res.status(404).json({ error: 'Juego no encontrado' });

    res.json({ mensaje: 'Juego eliminado' });
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/resenas', (req, res) => {
  try {
    const resenas = db.prepare('SELECT * FROM resenas').all();
    res.json(resenas);
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/resenas', (req, res) => {
  try {
    const { juego_id, autor, calificacion, comentario } = req.body;
    if (!juego_id || !autor || calificacion === undefined || !comentario) return res.status(400).json({ error: 'Faltan campos obligatorios' });
    if (calificacion < 1 || calificacion > 5) return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });

    const juego = db.prepare('SELECT id FROM juegos WHERE id = ?').get(juego_id);
    if (!juego) return res.status(404).json({ error: 'El juego asociado no existe' });

    const duplicada = db.prepare('SELECT id FROM resenas WHERE juego_id = ? AND autor = ?').get(juego_id, autor);
    if (duplicada) return res.status(409).json({ error: 'El usuario ya publicó una reseña para este juego' });

    const result = db.prepare('INSERT INTO resenas (juego_id, autor, calificacion, comentario) VALUES (?, ?, ?, ?)').run(juego_id, autor, calificacion, comentario);
    res.status(201).json({ id: result.lastInsertRowid, juego_id, autor, calificacion, comentario });
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.put('/resenas/:id', (req, res) => {
  try {
    const { juego_id, autor, calificacion, comentario } = req.body;
    const { id } = req.params;

    if (!juego_id || !autor || calificacion === undefined || !comentario) return res.status(400).json({ error: 'Faltan campos obligatorios' });
    if (calificacion < 1 || calificacion > 5) return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });

    const actual = db.prepare('SELECT id FROM resenas WHERE id = ?').get(id);
    if (!actual) return res.status(404).json({ error: 'Reseña no encontrada' });

    const juego = db.prepare('SELECT id FROM juegos WHERE id = ?').get(juego_id);
    if (!juego) return res.status(404).json({ error: 'El juego asociado no existe' });

    const duplicada = db.prepare('SELECT id FROM resenas WHERE juego_id = ? AND autor = ? AND id != ?').get(juego_id, autor, id);
    if (duplicada) return res.status(409).json({ error: 'Ya existe otra reseña de este autor para el mismo juego' });

    db.prepare('UPDATE resenas SET juego_id = ?, autor = ?, calificacion = ?, comentario = ? WHERE id = ?').run(juego_id, autor, calificacion, comentario, id);
    res.json({ mensaje: 'Reseña actualizada' });
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.delete('/resenas/:id', (req, res) => {
  try {
    const info = db.prepare('DELETE FROM resenas WHERE id = ?').run(req.params.id);
    if (info.changes === 0) return res.status(404).json({ error: 'Reseña no encontrada' });

    res.json({ mensaje: 'Reseña eliminada' });
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));