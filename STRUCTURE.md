# Hospital Appointment Booking - Project Structure

## Directory Layout

```
booking_apointment/
├── backend/                              # NestJS Backend API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/                    # Authentication module
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── dto/
│   │   │   │       └── auth.dto.ts
│   │   │   ├── users/                   # Users module
│   │   │   │   ├── users.module.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   ├── users.controller.ts
│   │   │   │   └── dto/
│   │   │   ├── hospitals/               # Hospitals module
│   │   │   │   ├── hospitals.module.ts
│   │   │   │   ├── hospitals.service.ts
│   │   │   │   ├── hospitals.controller.ts
│   │   │   │   └── dto/
│   │   │   │       └── hospital.dto.ts
│   │   │   ├── appointments/            # Appointments module
│   │   │   │   ├── appointments.module.ts
│   │   │   │   ├── appointments.service.ts
│   │   │   │   ├── appointments.controller.ts
│   │   │   │   └── dto/
│   │   │   │       └── appointment.dto.ts
│   │   │   ├── admin/                   # Admin module
│   │   │   │   ├── admin.module.ts
│   │   │   │   ├── admin.service.ts
│   │   │   │   └── admin.controller.ts
│   │   │   ├── notifications/           # Notifications module
│   │   │   │   ├── notifications.module.ts
│   │   │   │   └── notifications.service.ts
│   │   │   └── config/                  # Configuration module
│   │   │       └── config.module.ts
│   │   ├── common/
│   │   │   ├── guards/
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   └── roles.guard.ts
│   │   │   ├── decorators/
│   │   │   │   └── roles.decorator.ts
│   │   │   ├── exceptions/
│   │   │   │   └── api.exception.ts
│   │   │   ├── filters/
│   │   │   │   └── http-exception.filter.ts
│   │   │   └── prisma.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma                # Database schema
│   │   ├── seed.ts                      # Seed script
│   │   └── migrations/                  # Database migrations
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── .env.example
│   └── .gitignore
│
├── apps/                                 # React Frontend Applications
│   ├── user-app/                         # User Application (Port 3001)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── HospitalDetails.tsx
│   │   │   │   ├── BookingForm.tsx
│   │   │   │   └── MyAppointments.tsx
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   ├── index.css
│   │   │   └── App.css
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── package.json
│   │   └── .gitignore
│   │
│   ├── admin-app/                        # Admin Application (Port 3002)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   └── AddHospital.tsx
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   ├── index.css
│   │   │   └── App.css
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── package.json
│   │   └── .gitignore
│   │
│   └── hospital-app/                     # Hospital Dashboard (Port 3003)
│       ├── src/
│       │   ├── pages/
│       │   │   ├── Dashboard.tsx
│       │   │   └── AppointmentHistory.tsx
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   ├── index.css
│       │   └── App.css
│       ├── index.html
│       ├── vite.config.ts
│       ├── tsconfig.json
│       ├── package.json
│       └── .gitignore
│
├── package.json                          # Root monorepo package.json
├── README.md                             # Project documentation
├── SETUP.md                             # Setup instructions
├── STRUCTURE.md                         # This file
├── docker-compose.yml                   # Docker configuration
├── .gitignore
└── .github/
    └── copilot-instructions.md          # Project specifications
```

## Module Descriptions

### Authentication Module (`auth`)
- JWT-based authentication
- Login and registration
- JWT strategy for Passport
- Token generation and validation

### Users Module (`users`)
- User CRUD operations
- User profile management
- Find users by email or phone

### Hospitals Module (`hospitals`)
- Hospital management
- Filter by city
- Hospital details with appointments

### Appointments Module (`appointments`)
- Create appointments
- Get user appointments
- Get hospital appointments
- Appointment status tracking

### Admin Module (`admin`)
- Hospital CRUD operations
- Admin-only endpoints
- Hospital management

### Notifications Module (`notifications`)
- Twilio SMS integration
- WhatsApp integration
- Appointment confirmation notifications
- Hospital credential delivery

## Frontend Application Structure

### User App
- Browse hospitals
- Filter by city
- Book appointments
- View appointment history
- Mobile responsive

### Admin App
- View all hospitals
- Add new hospital
- Edit hospital details
- Delete hospitals
- Send credentials to hospitals

### Hospital App
- View today's appointments
- View appointment history
- Grouped by date
- Status tracking

## Database Models

### Relationships
```
User (ADMIN, HOSPITAL, USER)
  ├── Hospital (one-to-one)
  └── Appointment (one-to-many)

Hospital
  ├── User (many-to-one)
  └── Appointment (one-to-many)

Appointment
  ├── User (many-to-one)
  └── Hospital (many-to-one)
```

## Development Workflow

1. Backend development → NestJS modules
2. Database changes → Prisma migrations
3. Frontend components → React pages
4. API integration → Axios calls
5. Styling → CSS with mobile-first approach

## Build Artifacts

- Backend: `backend/dist/` - Compiled NestJS application
- User App: `apps/user-app/dist/` - Production build
- Admin App: `apps/admin-app/dist/` - Production build
- Hospital App: `apps/hospital-app/dist/` - Production build

## Environment Files

- `backend/.env` - Backend configuration
- Root `.env` files can be created for frontend apps if needed

## Dependencies

### Backend
- `@nestjs/*` - NestJS framework
- `@prisma/client` - Prisma ORM client
- `passport-jwt` - JWT authentication
- `twilio` - SMS/WhatsApp notifications
- `bcrypt` - Password hashing
- `class-validator` - Input validation

### Frontend
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `vite` - Build tool
- `typescript` - Type safety

## Testing Structure (Future)

```
backend/
├── test/
│   ├── auth.spec.ts
│   ├── users.spec.ts
│   ├── hospitals.spec.ts
│   └── appointments.spec.ts

apps/*/
├── src/__tests__/
│   ├── pages/
│   ├── components/
│   └── utils/
```

---

See [README.md](./README.md) for setup and usage instructions.
