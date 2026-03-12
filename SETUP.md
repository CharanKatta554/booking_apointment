# Setup Instructions

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup PostgreSQL Database

#### Option A: Using Docker
```bash
docker-compose up -d
```
This will start:
- PostgreSQL on port 5432
- PgAdmin on http://localhost:5050

#### Option B: Local PostgreSQL
Ensure PostgreSQL is running and create database:
```sql
CREATE DATABASE hospital_booking;
```

### 3. Configure Backend

```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit backend/.env with your database URL
# DATABASE_URL=postgresql://user:password@localhost:5432/hospital_booking
```

### 4. Setup Database Schema

```bash
# Install Prisma CLI
npm install -D prisma

# Create migrations
npm run db:push --workspace=backend

# (Optional) Seed database
npm run db:seed --workspace=backend
```

### 5. Start Development Servers

```bash
# Terminal 1 - Backend
npm run backend:dev

# Terminal 2 - User App
npm run user-app:dev

# Terminal 3 - Admin App
npm run admin-app:dev

# Terminal 4 - Hospital App
npm run hospital-app:dev
```

Or all at once:
```bash
npm run dev
```

### Access Applications

- **User App**: http://localhost:3001
- **Admin App**: http://localhost:3002
- **Hospital App**: http://localhost:3003
- **Backend API**: http://localhost:3000
- **PgAdmin** (if using Docker): http://localhost:5050

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000  # Find process using port 3000
taskkill /PID <PID> /F       # Kill the process

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues
- Check PostgreSQL service is running
- Verify DATABASE_URL is correct in .env
- Check credentials match

### Prisma Issues
```bash
npx prisma generate --schema=backend/prisma/schema.prisma
npx prisma db push --schema=backend/prisma/schema.prisma
```

## Project Commands

```bash
# Development
npm run dev                      # All apps
npm run backend:dev             # Backend only
npm run user-app:dev            # User app only
npm run admin-app:dev           # Admin app only
npm run hospital-app:dev        # Hospital app only

# Build
npm run build                   # Build all
npm run backend:build           # Backend only

# Database
npm run db:push                 # Push schema to database
npm run db:migrate              # Run migrations
npm run db:seed                 # Seed database

# Testing
npm run test                    # Test all
```

## Environment Setup

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/hospital_booking
JWT_SECRET=super_secret_key_change_in_production
JWT_EXPIRATION=24h
NODE_ENV=development
PORT=3000

# Twilio (optional)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
```

## Docker Compose Services

### Start Database Container
```bash
docker-compose up -d
```

### Stop Container
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f postgres
```

### Connect to Database
```bash
psql -h localhost -U user -d hospital_booking
```

## Git Setup

```bash
# Initialize git repository
git init

# Add files
git add .

# First commit
git commit -m "Initial commit - Hospital appointment booking system"

# Add remote (if needed)
git remote add origin <repository-url>

# Push
git push -u origin main
```

## Next Steps

1. Complete the authentication implementation (login/register)
2. Add role-based access control (RBAC) guards
3. Implement appointment slot system
4. Add Twilio notification integration
5. Setup email notifications
6. Add payment integration
7. Create comprehensive test suite
8. Deploy to production

---

For more details, see [README.md](../README.md)
