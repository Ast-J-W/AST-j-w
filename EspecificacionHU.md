## Especificación de Historia de Usuario
### US-08: Publicación de reseñas

Como usuario registrado, quiero publicar reseñas sobre videojuegos, para compartir mi opinión y calificación con otros usuarios de la plataforma.

### Descripción

Esta historia de usuario permite gestionar reseñas asociadas a videojuegos existentes. El sistema permite crear, consultar, actualizar y eliminar reseñas. Cada reseña debe incluir el identificador del videojuego, autor, calificación y comentario.

La funcionalidad también valida que la calificación esté dentro del rango permitido, que el videojuego asociado exista y que un mismo autor no publique más de una reseña para el mismo videojuego.

### Flujo principal

1. El usuario selecciona o indica un videojuego existente.
2. El usuario ingresa los datos de la reseña: juego_id, autor, calificacion y comentario.
3. El sistema valida que los campos obligatorios estén completos.
4. El sistema valida que la calificación esté entre 1 y 5.
5. El sistema valida que el videojuego asociado exista.
6. El sistema verifica que el mismo autor no tenga una reseña previa para el mismo videojuego.
7. Si todas las validaciones se cumplen, el sistema guarda la reseña.
8. El sistema permite consultar, actualizar o eliminar reseñas existentes.

### Criterios de aceptación

- CA1: El sistema debe permitir crear una reseña asociada a un videojuego existente.
- CA2: La reseña debe incluir juego_id, autor, calificacion y comentario.
- CA3: La calificación debe aceptarse solo si está entre 1 y 5.
- CA4: Si faltan campos obligatorios, el sistema debe responder con error 400.
- CA5: Si el videojuego asociado no existe, el sistema debe responder con error 404.
- CA6: Si el mismo autor intenta publicar más de una reseña para el mismo videojuego, el sistema debe responder con error 409.
- CA7: El sistema debe permitir consultar, actualizar y eliminar reseñas existentes.
- CA8: Si la reseña no existe, el sistema debe responder con error 404 al actualizar o eliminar.
- CA9: Si al actualizar una reseña se genera duplicidad de autor y videojuego, el sistema debe responder con error 409.

### Definition of Done

1. La historia tiene criterios de aceptación claros y testeables.
2. Se implementa la funcionalidad en backend con Node.js y Express.
3. La información se almacena con persistencia en SQLite.
4. Se implementan endpoints para crear, consultar, actualizar y eliminar reseñas.
5. Se validan los campos obligatorios.
6. Se valida que la calificación esté entre 1 y 5.
7. Se valida que el videojuego asociado exista.
8. Se evita que un mismo autor publique más de una reseña para el mismo videojuego.
9. Se evita que al actualizar una reseña se genere una duplicidad de autor y videojuego.
10. Se agregan pruebas para creación, consulta, actualización y eliminación.
11. Se prueban casos exitosos y casos de error.
12. El desarrollo se realiza en una rama propia.
13. Se crea Pull Request asociado al issue correspondiente.
14. El código es revisado antes de integrarse.
15. La funcionalidad queda integrada en la rama principal main.
