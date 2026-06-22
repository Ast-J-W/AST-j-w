# Modelo de Dominio - US-08

```mermaid id="c4ngdk"
classDiagram
    class Juego {
        +id
        +titulo
        +genero
        +precio
    }

    class Resena {
        +id
        +juego_id
        +autor
        +calificacion
        +comentario
    }

    Juego "1" --> "0..*" Resena : recibe

    note for Resena "Restricciones:\ncalificacion entre 1 y 5\nUNIQUE(juego_id, autor)"
    note for Juego "Restricción:\nprecio mayor o igual a 0"
```
