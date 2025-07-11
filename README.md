# codeArena-
#  CodeArena – Plataforma de Retos de Programación  CodeArena es una aplicación web diseñada para gestionar retos de programación. Incluye autenticación con roles, administración segura de retos (solo admins), y envío de soluciones por parte de los usuarios.
---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB (con Mongoose)
- Docker & Docker Compose
- JWT (autenticación)
- Helmet, Rate Limit, XSS Sanitizer (seguridad)
- Express Validator (validaciones)

---

##  Estructura del proyecto
codeArena/
├── Dockerfile
├── docker-compose.yml
├── .env
├── server.js
├── src/
│ └── app.js
├── shared/
│ └── config/db.js
│ └── middlewares/...
├── services/
│ ├── auth/
│ ├── challenge/
│ ├── submission/
│ └── ...otros

Requisitos
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- (Opcional: Node.js para desarrollo local)

##  Variables de entorno

Crea un archivo `.env` en la raíz con el siguiente contenido:

```env
MONGODB_URI=mongodb://mongo:(tu ruta)/codearena
PORT=4000
JWT_SECRET=supersecreto123 (no lo compartas)

🧠 Autor
Esteban Castellanos
Desarrollador autodidacta.
18 años. Aprendiendo y creando con pasión.
¡Gracias por leer!
