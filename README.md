# Microservicio de Gestión de Tareas

Microservicio RESTful para gestionar tareas. Construido con **NestJS**, **MongoDB**, **BullMQ** y **Docker**.

## Tecnologías

- **Lenguaje**: TypeScript (NestJS)
- **Base de Datos**: MongoDB
- **Cola de trabajos**: Redis + BullMQ
- **Contenedores**: Docker & Docker Compose
- **Documentación**: Swagger / OpenAPI
- **Versión Node**: v20.18.0

## 📦 Funcionalidades de la API

|Método|Endpoint|Descripción
|`POST`|`/tasks`|Crear una nueva tarea
|`GET`|`/tasks`|Obtener todas las tareas
|`GET`|`/tasks/:id`| btener una tarea por su ID
|`PUT`| `/tasks/:id`| Reemplazar completamente una tarea
|`PATCH`| `/tasks/:id`| Actualizar parcialmente una tarea
|`DELETE`| `/tasks/:id`| Eliminar una tarea
|`GET`|`/tasks/status/:status`|Obtener tareas por estado
|`POST`|`/tasks/:id/schedule`| Programar una tarea asíncrono

## 🧠 Campos de la Tarea

json
{
"title": "string (requerido)",
"description": "string (opcional)",
"status": "pending | in_progress | completed (opcional)",
"assigned_to": "string (opcional)",
"due_date": "ISO 8601 date (opcional)"
}

## ⚙️ Instalación (Modo local)

### 1. Clonar repositorio

git clone https://github.com/tuusuario/task-manager-api.git
cd task-manager-api

Si se está usando Docker, **no necesita ejecutarl manualmente npm install**, porque ya se ejecuta dentro del contenedor en el `Dockerfile`:

### 1.1 Instalar dependencias si no es con docker

npm install

### 2. Crear archivo `.env`

MONGO_URI=mongodb://mongo:27017/tasks
REDIS_HOST=redis
REDIS_PORT=6379

## Dockerización

### Requisitos

- Docker
- Docker Compose

### Levantar todo el sistema (API + MongoDB + Redis)

docker-compose up --build

Esto expone:

- API REST en: http://localhost:3000/tasks
- Swagger UI en: http://localhost:3000/api
- MongoDB en: mongodb://localhost:27017
- Redis en: localhost:6379

## Documentación Swagger

Disponible en: [http://localhost:3000/api](http://localhost:3000/api)

Incluye:

- Definición completa de los endpoints
- Esquemas de entrada y salida
- Parametrización de rutas

## 📬 Programar notificaciones con BullMQ

Para programar una tarea futura:

POST /tasks/:id/schedule

Esto agrega un trabajo a la cola `taskQueue`, que será procesado por un Worker:

@Processor('taskQueue')
export class TaskQueueProcessor {
@Process('notify')
async handleNotification(job: Job) {
console.log(`🔔 Notificando sobre la tarea ${job.data.taskId}`);
}
}

---

## 🧪 Pruebas rápidas con curl

## Crear una nueva tarea

curl -X POST http://localhost:3000/tasks \
 -H "Content-Type: application/json" \
 -d '{
"title": "Escribir documentación",
"description": "Completar el README del proyecto",
"assigned_to": "daniel",
"due_date": "2025-08-10T10:00:00Z"
}'

## Obtener todas las tareas

curl http://localhost:3000/tasks

## Obtener una tarea por su ID

curl http://localhost:3000/tasks/<TAREA_ID>

## Actualizar completamente una tarea (PUT)

curl -X PUT http://localhost:3000/tasks/<TAREA_ID> \
 -H "Content-Type: application/json" \
 -d '{
"title": "Actualizar todo",
"description": "Se cambió todo",
"status": "in_progress",
"assigned_to": "lucas",
"due_date": "2025-08-12T15:00:00Z"
}'

## Actualizar parcialmente una tarea (PATCH)

curl -X PATCH http://localhost:3000/tasks/<TAREA_ID> \
 -H "Content-Type: application/json" \
 -d '{ "status": "completed" }'

## Eliminar una tarea

curl -X DELETE http://localhost:3000/tasks/<TAREA_ID>

## Obtener tareas por estado (pending, in_progress, completed)

curl http://localhost:3000/tasks/status/pending

## Programar trabajo asíncrono para una tarea (cola BullMQ)

curl -X POST http://localhost:3000/tasks/<TAREA_ID>/schedule
