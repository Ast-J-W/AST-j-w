# Diagrama de Componentes con dependencias e interfaces

```mermaid id="u0digq"
flowchart LR
    C[Cliente API<br/>Bruno / Navegador]

    subgraph B[Backend Node.js / Express]
        API[API Express<br/>index.js]
        RJ[Componente Rutas Juegos<br/>/juegos]
        RR[Componente Rutas Reseñas<br/>/resenas]
        VJ[Validaciones Juegos<br/>campos obligatorios y precio]
        VR[Validaciones Reseñas<br/>campos, calificación, juego existente y duplicados]
        DBJS[Acceso a Datos<br/>db.js<br/>conexión y creación de tablas]
    end

    D[(SQLite<br/>datos.db<br/>CHECK, UNIQUE y FOREIGN KEY)]

    C -->|Interfaz HTTP / JSON| API
    API --> RJ
    API --> RR
    RJ --> VJ
    RR --> VR
    VJ -->|usa| DBJS
    VR -->|usa| DBJS
    DBJS -->|consultas SQL| D
```
