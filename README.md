# AST-j-w

## Descripción del Sistema

El proyecto consiste en el diseño y desarrollo de una plataforma de videojuegos orientada al usuario, que combina un ecosistema de juegos personalizados con una arquitectura que integra recepción de feedback y soporte técnico, permitiendo que la evolución del catálogo sea impulsada directamente por la comunidad.

## Historias de Usuario

| ID   | Nombre                          | Issue  | 
|------|---------------------------------|--------| 
| US-01 | Registro de usuario                | [#1](https://github.com/Ast-J-W/AST-j-w/issues/4)   | 
| US-02 | Inicio de sesión                   | [#2](https://github.com/Ast-J-W/AST-j-w/issues/5)   |
| US-03 | Visualización del catálogo         | [#3](https://github.com/Ast-J-W/AST-j-w/issues/6)   |  
| US-04 | Búsqueda y filtrado de videojuegos | [#4](https://github.com/Ast-J-W/AST-j-w/issues/7)   |  
| US-05 | Compra/adquisición de videojuegos  | [#5](https://github.com/Ast-J-W/AST-j-w/issues/8)   |  
| US-06 | Biblioteca personal                | [#6](https://github.com/Ast-J-W/AST-j-w/issues/9)   |  
| US-07 | Registro de actividad de juego     | [#7](https://github.com/Ast-J-W/AST-j-w/issues/10)  |  
| US-08 | Publicación de reseñas             | [#8](https://github.com/Ast-J-W/AST-j-w/issues/11)  |
| US-09 | Feedback sobre videojuegos         | [#9](https://github.com/Ast-J-W/AST-j-w/issues/12)  |  
| US-10 | Soporte técnico                    | [#10](https://github.com/Ast-J-W/AST-j-w/issues/13) |  

## Requisitos Extrafuncionales

Ver [ReqExtrafuncionales.md](https://github.com/Ast-J-W/AST-j-w/blob/main/ReqExtrafuncionales.md)

## Entidades del Dominio
```mermaid
classDiagram

class Desarrollador {
    +int id_desarrollador
    +string nom_desarrollador
    +string pais
    +string correo_contacto
}

class Juego {
    +int id_juego
    +string titulo
    +decimal precio
    +string genero
    +date f_lanzamiento
}

class Usuario {
    +int id_usuario
    +string nombre
    +string apellido
    +string nombre_completo
    +date f_nacimiento
    +int edad
}

class Correo {
    +string correo
}

class Cuenta {
    +int id_cuenta
    +string nombre_usuario
    +date f_creacion
    +string estado_cuenta
}

class CuentaBase {
    +boolean publicidad
    +int limite_amigos
    +boolean soporte_basico
}

class CuentaPlus {
    +decimal descuento
    +date f_suscripcion
    +date f_fin_suscripcion
    +boolean acceso_comunidad
}

class Biblioteca {
    +date f_adquisicion
    +string estado_instalacion
    +int horas_jugadas
}

class Reseña {
    +int nro_resena
    +int f_resena
    +int calificacion
    +string comentario
}

Desarrollador "1" --> "0..*" Juego : publica

Usuario "1" --> "1" Cuenta : posee

Cuenta <|-- CuentaBase
Cuenta <|-- CuentaPlus

Usuario "1" --> "0..*" Correo : tiene

Usuario "1" --> "0..*" Biblioteca : posee
Juego "1" --> "0..*" Biblioteca : pertenece a

Juego "1" --> "0..*" Reseña : recibe
Usuario "1" --> "0..*" Reseña : escribe
```

## Diseño Arquitectónico

Ver [Arquitectura.md](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/blob/main/Arquitectura.md)

## Responsabilidades del equipo 

| Integrante | Rol | Ítems de la rúbrica a cargo | 
|------------|-----|----------------------------| 
| Martín Loyola | Product Owner | 1.1 Mejora dehistoria de usuarios con clarita review | 
| Jesús Carvajal | Scrum Master  | 2.1 Desarrollo de un HU en backend (APIs) |
