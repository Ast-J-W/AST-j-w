# Casos de Prueba -- US-08

| ID    | Qué se debe hacer (acción / entrada)                                                                 | Salida esperada                                                                     |
| ----- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| CP-01 | Enviar `POST /juegos` con `titulo`, `genero` y `precio` válidos                                      | Respuesta 201 con juego creado y `id` asignado                                      |
| CP-02 | Enviar `POST /resenas` con `juego_id` existente, `autor`, `calificacion` válida y `comentario`       | Respuesta 201 con reseña creada                                                     |
| CP-03 | Enviar `POST /resenas` sin uno o más campos obligatorios                                             | Respuesta 400 con mensaje `Faltan campos obligatorios`                              |
| CP-04 | Enviar `POST /resenas` con `calificacion` fuera de rango, por ejemplo 6                              | Respuesta 400 con mensaje `La calificación debe estar entre 1 y 5`                  |
| CP-05 | Enviar `POST /resenas` con `juego_id` inexistente, por ejemplo 9999                                  | Respuesta 404 con mensaje `El juego asociado no existe`                             |
| CP-06 | Enviar nuevamente `POST /resenas` con el mismo `juego_id` y el mismo `autor` de una reseña ya creada | Respuesta 409 con mensaje `El usuario ya publicó una reseña para este juego`        |
| CP-07 | Enviar `GET /resenas`                                                                                | Respuesta 200 con la lista de reseñas existentes                                    |
| CP-08 | Enviar `PUT /resenas/1` con `juego_id`, `autor`, `calificacion` y `comentario` válidos               | Respuesta 200 con mensaje `Reseña actualizada`                                      |
| CP-09 | Enviar `PUT /resenas/1` con `calificacion` fuera de rango, por ejemplo 0 o 6                         | Respuesta 400 con mensaje `La calificación debe estar entre 1 y 5`                  |
| CP-10 | Enviar `PUT /resenas/1` con un `juego_id` inexistente                                                | Respuesta 404 con mensaje `El juego asociado no existe`                             |
| CP-11 | Enviar `PUT /resenas/1` usando un `juego_id` y `autor` que ya existen en otra reseña                 | Respuesta 409 con mensaje `Ya existe otra reseña de este autor para el mismo juego` |
| CP-12 | Enviar `DELETE /resenas/1` para una reseña existente                                                 | Respuesta 200 con mensaje `Reseña eliminada`                                        |
| CP-13 | Enviar `PUT /resenas/9999` o `DELETE /resenas/9999`                                                  | Respuesta 404 con mensaje `Reseña no encontrada`                                    |

