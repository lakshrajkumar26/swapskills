# SkillSwap 🎯  

SkillSwap is a **peer-to-peer learning platform** where users can **learn, teach, and exchange skills** through **real-time collaboration, quizzes, and gamified challenges**.  
Built with the **MERN stack**, it enables fair skill matching, leaderboard tracking, and engaging user interaction 

## Deployment Link https://swapskills-inky.vercel.app/
---

## 🚀 Features  -

- 🔑 **Skill Matching Engine** → Pairs users based on rank, experience, and categories.  
- 💬 **Real-Time Collaboration** → WebSockets for chat, quizzes, and multiplayer interactions.  
- 🛡 **Secure Authentication** → JWT & bcrypt-based user login and session handling.  
- 🏆 **Leaderboards & Points System** → Rewards, entry points, and global ranking.  (upcoming) 
- 📊 **Progress Tracking** → Tracks user matches, ranks, and completed sessions.  (upcoming) 
- 🎮 **Gamified Learning** → Entry-based quiz battles with fair rank-based matching.  (upcoming) 
- 📱 **Responsive UI** → Built with **React.js + TailwindCSS** for a modern experience.
- **videoCalling** -> Directly connects to people  and swap your skills using WebRTC (upcoming)
- **Ratings** -> Rates User according to their skills and performance  (upcoming) 

---

## 🛠 Tech Stack  

- **Frontend** → React.js, TailwindCSS  
- **Backend** → Node.js, Express.js  
- **Database** → MongoDB (Mongoose ODM)  
- **Real-Time** → Socket.io (WebSockets)  
- **Auth & Security** → JWT, bcrypt  
- **Other Tools** → Render (backend), Vercel (frontend), Docker (optional)  

---

## ⚡ Project Workflow  

1. **User Registration/Login** → Secure JWT-based authentication.  
2. **Skill Matchmaking** → Players matched by rank & experience.  
3. **Join/Create Game Room** → Entry points deducted and quiz started.  
4. **Real-Time Quiz Battle** → Socket.io enables instant Q&A sync.  
5. **Winner Rewarded** → Points credited and leaderboard updated.  


📸 Screenshots

<img width="1894" height="906" alt="Screenshot 2025-08-21 001535" src="https://github.com/user-attachments/assets/c2447fe0-819a-43fe-9f7c-15cc4a291bad" />

<img width="1888" height="910" alt="Screenshot 2025-08-21 001619" src="https://github.com/user-attachments/assets/14de4ca6-a709-4776-a112-ab9075559f36" />

<img width="1900" height="903" alt="Screenshot 2025-08-21 001735" src="https://github.com/user-attachments/assets/f206aa09-0729-4d22-9968-f65d1fcdf93a" />

<img width="1895" height="903" alt="Screenshot 2025-08-21 001807" src="https://github.com/user-attachments/assets/4f71d0f8-1f23-4439-a420-bc40ceab009d" />

<img width="1905" height="906" alt="Screenshot 2025-08-21 001825" src="https://github.com/user-attachments/assets/4ba4b6a8-4fc0-4026-b016-65d478055e52" />

<img width="1903" height="1064" alt="Screenshot 2025-08-21 001916" src="https://github.com/user-attachments/assets/06c600fa-ee31-4a93-8c57-6e2f03d50638" />
---

## 📦 Installation  

### Clone the repo  
```bash
git clone https://github.com/your-username/skillswap.git
cd skillswap


📦 Installation
Clone the repo
git clone https://github.com/your-username/skillswap.git
cd skillswap

Backend Setup
cd backend
npm install
npm run dev

Frontend Setup
cd frontend
npm install
npm start

Environment Variables

Create .env files in both backend/ and frontend/ with keys like:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
SOCKET_SERVER=http://localhost:8080





👨‍💻 Author

Laksh Raj Kumar
