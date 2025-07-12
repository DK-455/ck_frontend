# 🧁 Cake Shop Ordering System

A full-stack online cake ordering system with React frontend, Go backend, and Docker Compose for deployment.

## 🏗️ Architecture

```
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ React Frontend│    │ Go Backend    │    │ PostgreSQL    │
│ (Port 3000)   │◄──►│ (Port 8080)   │◄──►│ (Port 5432)   │
└───────────────┘    └───────────────┘    └───────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Go 1.21+
- Node.js 18+
- Python 3 (optional, for scripts)

### Project Structure
```
cake-shop-system/
├── backend/                  # Go API server
│   ├── internal/
│   │   ├── database/         # DB connection & seeding
│   │   ├── handlers/         # API handlers
│   │   └── models/           # DB models
│   ├── main.go
│   ├── Dockerfile
│   └── docker-compose.yml    # Backend + DB only
├── frontend/                 # React application
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── docker-compose.yml    # Frontend only
├── README.md
└── seed_cakes.py             # (Optional) Python seed script
```

## 🐳 Running with Docker Compose

### Backend + Database (from backend directory)
```bash
cd backend
sudo docker-compose up -d
```
- Backend: http://localhost:8080
- Database: localhost:5432

### Frontend (from frontend directory)
```bash
cd frontend
sudo docker-compose up -d
```
- Frontend: http://localhost:3000

## 🧹 Reset Cakes Table (Truncate & Seed)
**If you want to clear old cakes and reseed with default cakes:**

1. **Truncate cakes table:**
   ```bash
   sudo docker exec -it postgres-db psql -U postgres -d cakeshop -c "TRUNCATE TABLE cakes RESTART IDENTITY CASCADE;"
   ```
   *(If your container is named differently, use that name instead of `postgres-db`)*

2. **Restart backend container:**
   ```bash
   cd backend
   sudo docker-compose restart backend
   ```
   This will auto-seed 10 cakes with real images and unique prices.

## 🛠️ Tech Stack
| Component | Technology |
|-----------|------------|
| Frontend  | React 18, Tailwind CSS |
| Backend   | Go 1.21, Gin, GORM    |
| Database  | PostgreSQL            |
| DevOps    | Docker, Docker Compose|

## 📋 Features
- Browse cakes (with images, price, description)
- Add to cart, update quantity, remove from cart
- Place order, view order status
- Admin: Add/edit/delete cakes, manage orders

## 🔧 API Endpoints (Backend)
- `GET /api/cakes` - List all cakes
- `POST /api/cakes` - Add new cake (admin)
- `GET /api/orders` - List all orders (admin)
- `POST /api/orders` - Place new order

## 🧑‍💻 Development
- Backend: `cd backend && go run main.go`
- Frontend: `cd frontend && npm start`

## 🧁 Seeding Cakes (Go only)
- Backend auto-seeds 10 cakes on startup if table is empty (see `backend/internal/database/database.go`)
- To reseed, truncate the table and restart backend (see above)

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License
MIT License - see LICENSE file for details # ck_frontend
