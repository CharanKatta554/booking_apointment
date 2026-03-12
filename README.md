# Hospital Appointment Booking System

A scalable, mobile-friendly hospital appointment booking platform built with **NestJS**, **React**, and **PostgreSQL**.

## Project Structure

This is a **monorepo project** with the following structure:

```
├── backend/                    # NestJS Backend API
│   ├── src/
│   │   ├── modules/           # Feature modules
│   │   ├── common/            # Common utilities (Prisma, Guards, etc.)
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/                # Database schema and migrations
│   ├── package.json
│   └── tsconfig.json
│
├── apps/                       # Frontend React Applications
│   ├── user-app/              # User Application
│   ├── admin-app/             # Admin Dashboard
│   └── hospital-app/          # Hospital Dashboard
│
├── package.json               # Root monorepo package.json
└── README.md
```

## Features

### 1. User Application
- Browse hospitals by city
- View hospital details
- Book appointments online
- View appointment history (upcoming & past)
- Mobile-friendly responsive design

### 2. Admin Application
- Add, edit, delete hospitals
- View all hospitals
- Send credentials to hospitals via SMS/WhatsApp

### 3. Hospital Dashboard
- View today's appointments
- View detailed appointment information
- View appointment history grouped by date
- Real-time updates

## Tech Stack

### Backend
- **Node.js** - Runtime
- **NestJS** - Backend framework
- **PostgreSQL** - Database
- **Prisma ORM** - Database ORM
- **JWT** - Authentication
- **Twilio** - SMS & WhatsApp notifications

### Frontend
- **React 18** - UI Framework
- **Vite** - Build tool
- **TypeScript** - Language
- **Axios** - HTTP client
- **React Router** - Navigation

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL 12+
- Twilio account (optional, for notifications)

### 1. Clone Repository
```bash
git clone <repo-url>
cd booking_apointment
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Backend Setup

#### Create Environment File
```bash
cp backend/.env.example backend/.env
```

Update `backend/.env` with your values:
```
DATABASE_URL=postgresql://user:password@localhost:5432/hospital_booking
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=24h
PORT=3000
NODE_ENV=development

TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
```

#### Setup Database
```bash
# Generate Prisma client
npm run db:generate --workspace=backend

# Run migrations
npm run db:migrate --workspace=backend

# Seed database (optional)
npm run db:seed --workspace=backend
```

### 4. Start Applications

#### Backend (Port 3000)
```bash
npm run backend:dev
```

#### User App (Port 3001)
```bash
npm run user-app:dev
```

#### Admin App (Port 3002)
```bash
npm run admin-app:dev
```

#### Hospital App (Port 3003)
```bash
npm run hospital-app:dev
```

Or start all together:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID

### Hospitals
- `GET /hospitals` - Get all hospitals
- `GET /hospitals?city=Mumbai` - Get hospitals by city
- `GET /hospitals/:id` - Get hospital details

### Appointments
- `POST /appointments` - Create appointment
- `GET /appointments/user/:userId` - Get user appointments
- `GET /appointments/hospital/:hospitalId` - Get hospital appointments

### Admin
- `POST /admin/hospitals` - Create hospital
- `GET /admin/hospitals` - Get all hospitals
- `PUT /admin/hospitals/:id` - Update hospital
- `DELETE /admin/hospitals/:id` - Delete hospital

## Database Schema

### User Model
- id, email, password, name, phone, role, isActive, createdAt, updatedAt

### Hospital Model
- id, name, address, city, pincode, opFee, phone, email, isActive, userId, createdAt, updatedAt

### Appointment Model
- id, firstName, lastName, phone, address, status, notes, userId, hospitalId, createdAt, updatedAt

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
JWT_EXPIRATION=24h
NODE_ENV=development
PORT=3000
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
```

## Development Guidelines

### Code Structure
- Use **NestJS modules** for feature organization
- Follow **clean architecture** principles
- Use **DTOs** for input validation
- Implement **error handling** consistently
- Use **environment variables** for configuration

### Database
- Use **Prisma** for all database queries
- Create migrations for schema changes
- Use proper **relationships** and constraints

### Frontend
- Follow **mobile-first** responsive design
- Use **React hooks** for state management
- Implement **proper error handling**
- Use **Axios** for API communication

## Troubleshooting

### Database Connection Error
- Check PostgreSQL is running
- Verify DATABASE_URL is correct

### Port Already in Use
- Change port in vite.config.ts
- Or kill process using the port

### Prisma Issues
- Run `npm install` in backend
- Run `npx prisma generate`

## Future Enhancements

- [ ] Appointment slots system
- [ ] Payment integration (Stripe)
- [ ] Doctor selection
- [ ] Push notifications
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Appointment reminders
- [ ] Rating & review system

## License

MIT

## Support

For questions or issues, please open an issue on GitHub.
