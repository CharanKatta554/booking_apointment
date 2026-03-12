# Copilot Instructions – Hospital Online OP Booking Web App

## Project Overview
Build a **mobile-friendly hospital OP (Outpatient) booking web application**.  
The system contains **three roles/apps**:

1. **User App**
2. **Admin App**
3. **Hospital Dashboard App**

The goal is to allow users to **book hospital OP appointments online**, and hospitals to **manage bookings** through their dashboard.

---

# Tech Stack

## Backend
- Node.js
- NestJS
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Twilio (SMS + WhatsApp notifications)

## Frontend
- React
- Mobile-first responsive design
- REST API communication

---

# Architecture

Use **modular architecture**.

### Backend Modules
- Auth Module
- User Module
- Admin Module
- Hospital Module
- Appointment Module
- Notification Module (Twilio)

### Database
PostgreSQL using **Prisma ORM**

---

# Roles

### 1. User
- Register / Login
- Browse hospitals
- Book appointments
- View appointment history

### 2. Admin
- Manage hospitals
- Create hospital accounts
- Send credentials to hospital

### 3. Hospital
- View daily appointments
- View appointment history

---

# User Application

## Login
User logs in using credentials.

Use **JWT authentication**.

---

## Home Page

Display:

- Health tips
- City selection dropdown (top middle)
- Hospitals list based on selected city

Example UI Flow:
Home Page

Health Tips Section

[ Select City ▼ ]

Hospitals List

Apollo Hospital

City Care Hospital

Sunrise Hospital


---

## Hospital Selection

When user selects a hospital:

Show hospital details and **Book Appointment button**


Hospital Details Page

Hospital Name
Address
OP Fee
Phone Number

[ Book Appointment ]


---

## Appointment Booking Form

Fields:

- First Name
- Last Name
- Phone Number
- Address

Submit form to backend.


POST /appointments


Store booking in database.

Send booking data to **hospital dashboard**.

---

## My Appointments Tab

Add **Book Appointments tab** in user home screen.

Show:

- Upcoming appointments
- Past appointments

Example:


My Appointments

Apollo Hospital | 12 Mar | Booked

City Care | 08 Mar | Completed


---

# Admin Application

Admin login using admin credentials.

---

## Admin Dashboard

Show:

- All hospitals list
- Add hospital button


Admin Dashboard

Hospitals

Add Hospital


---

## Add Hospital Form

Fields:

- Hospital Name
- Address
- City
- Pincode
- OP Fee
- Phone Number

Example API:


POST /admin/hospitals


---

## Hospital Account Creation

When admin creates a hospital:

Automatically:

1. Create hospital user account
2. Assign role = `hospital`
3. Generate login credentials

Send credentials to hospital phone number using:

- Twilio SMS
- Twilio WhatsApp

Example message:


Welcome to Hospital OP Booking System

Login Credentials:
Email: hospital@email.com

Password: XXXXX


---

## Hospital Management Features

Admin can:

- Add hospital
- Update hospital
- Delete hospital
- View hospital details

API examples:


GET /admin/hospitals
PUT /admin/hospitals/:id
DELETE /admin/hospitals/:id


---

# Hospital Dashboard

Hospital logs in using hospital credentials.

---

## Hospital Home Screen

Show **today's bookings**.

Example:


Today's Appointments

John Doe
Phone: 9999999999
Time: 10:30 AM

Ram Kumar
Phone: 8888888888
Time: 11:00 AM


---

## Appointment History Tab

Show past bookings.


History

10 Mar – 12 Appointments

09 Mar – 8 Appointments


---

# Booking Flow


User
↓
Select City
↓
Select Hospital
↓
Book Appointment
↓
Save to Database
↓
Send to Hospital Dashboard


---

# Database Models (Prisma)

Example schema:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  phone     String
  role      Role
  password  String
}

model Hospital {
  id        Int      @id @default(autoincrement())
  name      String
  address   String
  city      String
  pincode   String
  opFee     Float
  phone     String
}

model Appointment {
  id          Int      @id @default(autoincrement())
  firstName   String
  lastName    String
  phone       String
  address     String
  hospitalId  Int
  createdAt   DateTime @default(now())
}
Security

Use:

JWT authentication

Role-based access control

Roles:

admin
hospital
user
API Structure

Example:

/auth
/users
/hospitals
/admin
/appointments
Copilot Coding Guidelines

When generating code:

Use NestJS best practices

Follow clean architecture

Use Prisma for database queries

Validate inputs using DTOs

Use TypeScript

Use RESTful APIs

Keep services reusable

Implement error handling

Use environment variables for secrets

Follow mobile-first UI for React components

Future Improvements

Possible features:

Appointment slot system

Payment integration

Doctor selection

Notifications

Push notifications

Analytics dashboard

Goal

Build a scalable hospital appointment booking platform where:

Users easily book OP appointments

Hospitals manage bookings

Admin manages hospitals

---

✅ If you want, I can also give you a **complete system design (database schema + API list + folder structure + architecture)** so you can build this **like a production startup app**.