# FixItNow 🔧
**"Your Trusted Home Service Platform"**

---

## Project Overview

FixItNow is a backend API for a home services marketplace. Customers can browse available services (plumbing, electrical, cleaning, painting, etc.), book qualified technicians, and leave reviews. Technicians can create service profiles, manage their availability, and handle job bookings. Admins oversee the platform, manage users, and moderate service categories.

---

## Roles & Permissions

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| **Customer** | Users who book home services | Browse services, book technicians, track bookings, leave reviews |
| **Technician** | Service professionals | Create profile, set availability, view/manage bookings, complete jobs |
| **Admin** | Platform moderators | Manage all users, oversee all bookings, manage service categories |

> 💡 **Note**: Users select their role during registration.

---



## Features

### Public Features
- Browse all available services and technicians
- Search and filter by service type, location, rating, and price
- View technician profiles with service details and reviews

### Customer Features
- Register and login as customer
- Book a technician for a specific service and time slot
- **Make payments via Stripe or SSLCommerz after booking is accepted**
- **View payment history and payment status**
- Track booking status
- Leave reviews after job completion
- Manage profile

### Technician Features
- Register and login as technician
- Create and update service profile (skills, experience, pricing)
- Set availability time slots
- View incoming bookings
- Accept or decline bookings
- Mark jobs as in-progress or completed

### Admin Features
- View all users (customers and technicians)
- Manage user status (ban/unban)
- View all bookings
- Manage service categories

---

## API Endpoints

> ⚠️ **Note**: These endpoints are examples. You may add, edit, or remove endpoints based on your implementation needs.

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user (customer/technician) |
| POST | `/api/auth/login` | Login user, return JWT |
| GET | `/api/auth/me` | Get current authenticated user |

### Services & Technicians (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | Get all services with filters (type, location, rating) |
| GET | `/api/technicians` | Get all technicians with filters |
| GET | `/api/technicians/:id` | Get technician profile with reviews |
| GET | `/api/categories` | Get all service categories |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create new booking (customer) |
| GET | `/api/bookings` | Get user's bookings |
| GET | `/api/bookings/:id` | Get booking details |

### Payments (Stripe / SSLCommerz)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/create` | Create a payment intent/session for an accepted booking |
| POST | `/api/payments/confirm` | Confirm/verify payment (webhook or callback) |
| GET | `/api/payments` | Get user's payment history |
| GET | `/api/payments/:id` | Get payment details |

### Technician Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/technician/profile` | Update technician profile |
| PUT | `/api/technician/availability` | Update availability slots |
| GET | `/api/technician/bookings` | Get technician's bookings |
| PATCH | `/api/technician/bookings/:id` | Update booking status (accept/decline/complete) |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reviews` | Create review (after job completion) |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users |
| PATCH | `/api/admin/users/:id` | Update user status (ban/unban) |
| GET | `/api/admin/bookings` | Get all bookings |
| GET | `/api/admin/categories` | Get all categories |
| POST | `/api/admin/categories` | Create new service category |

---

## Database Tables

Design your own schema for the following tables:

- **Users** - Store user information, authentication details, and role
- **TechnicianProfiles** - Technician-specific information (linked to Users)
- **Categories** - Service categories (plumbing, electrical, cleaning, painting, etc.)
- **Services** - Specific services offered by technicians
- **Bookings** - Job bookings between customers and technicians
- **Payments** - Payment transactions (transactionId, bookingId, amount, method, provider [Stripe/SSLCommerz], status [pending/completed/failed], paidAt, etc.)
- **Reviews** - Customer reviews for technicians

> 💡 *Think about what fields each table needs based on the features above.*

---

## Flow Diagrams

### 🔧 Customer Journey

```
                              ┌──────────────┐
                              │   Register   │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │   Browse     │
                              │  Services    │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │    View      │
                              │ Technician   │
                              │   Profile    │
                              └──────────────┘
                                     │
                                     ▼
                               ┌──────────────┐
                               │    Book      │
                               │  Technician  │
                               └──────────────┘
                                      │
                                      ▼
                               ┌──────────────┐
                               │  Make Payment│
                               │(Stripe/SSLC) │
                               └──────────────┘
                                      │
                                      ▼
                               ┌──────────────┐
                               │   Track      │
                               │   Booking    │
                               └──────────────┘
                                      │
                                      ▼
                               ┌──────────────┐
                               │ Leave Review │
                               └──────────────┘
```

### 🛠️ Technician Journey

```
                              ┌──────────────┐
                              │   Register   │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │Create Profile│
                              │ & Services   │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │    Set       │
                              │ Availability │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │   Accept/    │
                              │  Decline     │
                              │  Bookings    │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ Complete Job │
                              └──────────────┘
```

### 📊 Booking Status

```
                              ┌──────────────┐
                              │  REQUESTED   │
                              └──────────────┘
                               /            \
                              /              \
                      (technician)     (technician)
                        accepts         declines
                            /                \
                           ▼                  ▼
                    ┌──────────────┐   ┌──────────────┐
                    │   ACCEPTED   │   │   DECLINED   │
                    └──────────────┘   └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    PAID      │
                    │  (Stripe/    │
                    │  SSLCommerz) │
                    └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ IN_PROGRESS  │
                    └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  COMPLETED   │
                    └──────────────┘
```

> 🔧 **Note**: Customers can cancel a booking at any point before it reaches IN_PROGRESS status.

---



## Project Structure

```text
.
├── prisma
│   ├── migrations
│   └── schema
│       ├── booking.prisma
│       ├── category.prisma
│       ├── enums.prisma
│       ├── payment.prisma
│       ├── review.prisma
│       ├── schema.prisma
│       ├── service.prisma
│       ├── technicianProfile.prisma
│       └── user.prisma
│
└── src
    ├── app.ts
    ├── server.ts
    │
    ├── config
    │   └── index.ts
    │
    ├── lib
    │   ├── prisma.ts
    │   ├── sslcommerz.ts
    │   └── stripe.ts
    │
    ├── middlewares
    │   ├── auth.ts
    │   ├── globalErrorHandler.ts
    │   ├── notFound.ts
    │   └── roleGuard.ts
    │
    ├── modules
    │   ├── admin
    │   │   ├── admin.controller.ts
    │   │   ├── admin.route.ts
    │   │   └── admin.service.ts
    │   │
    │   ├── auth
    │   │   ├── auth.controller.ts
    │   │   ├── auth.interface.ts
    │   │   ├── auth.route.ts
    │   │   └── auth.service.ts
    │   │
    │   ├── booking
    │   │   ├── booking.controller.ts
    │   │   ├── booking.interface.ts
    │   │   ├── booking.route.ts
    │   │   └── booking.service.ts
    │   │
    │   ├── category
    │   │   ├── category.controller.ts
    │   │   ├── category.interface.ts
    │   │   ├── category.route.ts
    │   │   └── category.service.ts
    │   │
    │   ├── payment
    │   │   ├── payment.controller.ts
    │   │   ├── payment.interface.ts
    │   │   ├── payment.route.ts
    │   │   ├── payment.service.ts
    │   │   └── payment.utils.ts
    │   │
    │   ├── review
    │   │   ├── review.controller.ts
    │   │   ├── review.interface.ts
    │   │   ├── review.route.ts
    │   │   └── review.service.ts
    │   │
    │   ├── service
    │   │   ├── service.controller.ts
    │   │   ├── service.interface.ts
    │   │   ├── service.route.ts
    │   │   └── service.service.ts
    │   │
    │   ├── technician
    │   │   ├── technician.controller.ts
    │   │   ├── technician.interface.ts
    │   │   ├── technician.route.ts
    │   │   └── technician.service.ts
    │   │
    │   └── user
    │       ├── user.controller.ts
    │       ├── user.interface.ts
    │       ├── user.route.ts
    │       └── user.service.ts
    │
    └── utils
        ├── catchAsync.ts
        ├── jwt.ts
        ├── pagination.ts
        ├── sendResponse.ts
        └── validateRequest.ts
```
