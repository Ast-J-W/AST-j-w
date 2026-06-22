# Deuda Técnica, Code Smells y Mejoras de Diseño

## 1. Code smells / deuda técnica identificada

| ID    | Ubicación                       | Descripción del problema                                                                                                                                                                                                                                       | Propuesta de mejora                                                                                                                |
| ----- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| DT-01 | `backend/index.js`              | Las rutas, validaciones y acceso a datos están concentrados en un único archivo. Esto dificulta la mantenibilidad y hace más complejo modificar o ampliar la API.                                                                                              | Separar el backend en capas de rutas, controladores, servicios y repositorios.                                                     |
| DT-02 | Endpoints de juegos y reseñas   | El sistema permite crear, modificar y eliminar información sin autenticación real de usuarios. En la historia se considera un usuario registrado, pero actualmente se usa el campo `autor` como dato enviado manualmente.                                      | Incorporar middleware de autenticación y autorización para operaciones restringidas, asociando cada reseña al usuario autenticado. |
| DT-03 | `backend/db.js` y `datos.db`    | La base de datos se crea con `CREATE TABLE IF NOT EXISTS`, lo que permite iniciar el sistema fácilmente, pero no gestiona cambios de esquema si la tabla ya existía previamente. Esto puede provocar desalineación entre una base antigua y el esquema actual. | Incorporar migraciones o un script de reinicialización controlado para actualizar el esquema de la base de datos de forma segura.  |
| DT-04 | Endpoints `POST` y `PUT`        | Las validaciones principales existen, pero están escritas manualmente dentro de cada endpoint. Esto genera repetición y dificulta reutilizar reglas de validación.                                                                                             | Agregar middleware de validación o una librería especializada para centralizar y reutilizar las validaciones.                      |
| DT-05 | Manejo de errores en `index.js` | El manejo de errores se repite en cada endpoint mediante bloques `try/catch`, lo que genera código duplicado.                                                                                                                                                  | Implementar un middleware centralizado de manejo de errores para evitar duplicación y estandarizar respuestas.                     |
| DT-06 | Pruebas de endpoints            | Las pruebas se realizan manualmente con Bruno, pero no existen pruebas automatizadas que se ejecuten de forma repetible.                                                                                                                                       | Agregar pruebas automatizadas con herramientas como Jest o Supertest para validar los endpoints principales.                       |

## 2. Mejoras de diseño futuras

* Separar el backend en una arquitectura por capas: rutas, controladores, servicios y repositorios.
* Implementar autenticación real para usuarios registrados.
* Relacionar las reseñas con usuarios autenticados en lugar de depender solo del campo `autor`.
* Incorporar migraciones o scripts de inicialización para la base de datos.
* Centralizar las validaciones en middleware reutilizable.
* Agregar pruebas automatizadas para los endpoints de juegos y reseñas.
* Centralizar el manejo de errores para entregar respuestas más consistentes.

