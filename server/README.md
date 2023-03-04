# Scenerygram server

## Installation

1. Clone the top-level `scenerygram` repo to your local machine
2. Navigate to the `/server` directory
3. Run `nvm use` to use this project's version of node, then install dependencies using `npm install`
4. Create `.env` file with the following environment variables:

```
  PORT=5000
  SCENERYGRAM_CLIENT_URL=http://localhost:5173

  JWT_SECRET_KEY=<SECRET_KEY_STRING>
  BCRYPT_SALT_ROUNDS=<ANY_INTEGER_VALUE>

  PG_URL=<YOUR_POSTGRES_DATABASE_URL>
  PG_HOST=<YOUR_POSTGRES_DATABASE_HOST>
  PG_PORT=<YOUR_POSTGRES_DATABASE_PORT>
  PG_USERNAME=<YOUR_POSTGRES_DATABASE_USERNAME>
  PG_PASSWORD=<YOUR_POSTGRES_DATABASE_PASSWORD>
  PG_DATABASE=<YOUR_POSTGRES_DATABASE_NAME>

  TYPEORM_MIGRATION_DIR=src/migrations/*.ts
```

5. Run migrations using `npm run db:migrate`
6. Start the server using `npm run dev`
