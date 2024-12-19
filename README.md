Instrucțiuni Detaliate pentru Pornirea Proiectului

1. Cerințe Preliminare
Asigură-te că ai următoarele instalate:
•	Node.js (versiune recomandată: v16 sau mai mare).
•	PostgreSQL configurat și funcțional.
•	Stripe Account pentru cheile API.
2. Configurarea Backend-ului
1.	Clonează proiectul:
bash
Copy code
git clone https://github.com/username/project.git
cd project/backend
2.	Instalează dependențele:
bash
Copy code
npm install
3.	Configurează fișierul .env:
Creează un fișier .env în directorul backend cu următorul conținut:
env
Copy code
PORT=3001
DATABASE_URL=postgresql://username:password@localhost:5432/db_name
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
4.	Initializează baza de date:
o	Rulează migrațiile pentru a crea tabelele:
bash
Copy code
npx prisma migrate dev
5.	Pornește serverul backend:
bash
Copy code
npm start
1.	Navighează în directorul frontend:
bash
Copy code
cd ../frontend
2.	Instalează dependențele:
bash
Copy code
npm install
3.	Configurează fișierul .env:
Creează un fișier .env în directorul frontend cu următorul conținut:
env
Copy code
REACT_APP_API_URL=http://localhost:3001
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
4.	Pornește aplicația frontend:
bash
Copy code
npm run dev
5.	Accesează aplicația în browser:
