1. копіювати .env
   cp api/.env.example api/.env

2. підняти докер (база + бек)
   docker compose up --build

API http://localhost:3000
Swagger http://localhost:3000/docs

3. Frontend
   cd client
   npx http-server . -p 5500
4. створені користувач
   admin@gmail.com | admin123
   user@gmail.com | user123
