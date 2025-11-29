# MediConnect-BD Backend (MySQL)

Quick notes to run the backend locally using MySQL.

1) Create a `.env` file in the `backend/` folder with these variables:

```
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_CONN_LIMIT=10
PORT=5000
JWT_SECRET=your_jwt_secret
```

2) Install dependencies and run:

Windows PowerShell commands:

```powershell
cd backend
npm install
# development (auto-restarts):
npm run dev
# or build + run:
npm run build
npm start
```

3) What happens on start
- The server creates a MySQL connection pool and verifies connection.
- `createTables()` will attempt to create the minimal required tables (`users`, `doctors`, `ambulances`, `appointments`) if they do not exist.

4) Notes & recommendations
- The backend uses a MySQL connection pool (`mysql2/promise`). Controllers use the pool for queries. For transactional work the code obtains a dedicated connection from the pool and releases it when done.
- If you plan to deploy, secure your `.env` and consider using a managed DB and connection pooling settings tuned to your environment.

If you want, I can change the pool shutdown behavior to gracefully close on process exit and add example seed data.
