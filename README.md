# TeleMed


# 🏥 TeleMed - Comprehensive Telemedicine & Predictive Health IoT Ecosystem

TeleMed is a production-grade, type-safe Virtual Health Platform built using Node.js, Express, TypeScript, and MongoDB. Engineered as a highly scalable virtual healthcare solution, TeleMed provides a secure core logistics layer for patient routing, automated appointment slot micro-generation, real-time consultation streaming architectures, and multi-role biometric IoT ingestion.

---

## ⚡ High-Tier Architectural Highlights

*   **Stateless Cryptographic Authentication**: Dual-token separation utilizing short-lived JWT Access keys paired with state-tracked, 40-character Opaque Refresh Tokens.
*   **XSS & CSRF Vault Defenses**: Token payloads travel exclusively via browser-enforced, encrypted `HttpOnly` cookie configurations with strict site-origin matching.
*   **The Slot-Generator Engine**: High-frequency loop processing using `.padStart()` string normalization that chops a medical professional's availability into distinct, bookable 30-minute block records.
*   **Concurrency Double-Booking Immunity**: Strict compound database indexes (`{ unique: true }`) on the `IAvailability` collection ensuring zero schedule overlapping at a millisecond tier.
*   **Next-Gen Telemedicine Roadmap**: Structural scaffolding optimized to support real-time **Socket.io** chat events and **WebRTC** peer-to-peer secure video consultation streams.
*   **Biometric IoT Ingestion Framework**: Normalization paths planned to handle incoming healthcare biometrics (heart rate, glucose metrics) with strict role-based data isolation.
*   **Defensive Test Implementation**: Automated endpoint and unit validation workflows compiled locally with **Jest**, **ts-jest**, and **Supertest** harnesses.

---

## 📁 System Architecture

```text
📦 src/
 ├── 📁 models/        # Strict Mongoose schemas, TypeScript interfaces & relational models
 ├── 📁 controllers/   # High-performance REST application business logic
 ├── 📁 middlewares/   # JWT encryption engines & Role-Based Access Control (RBAC) guardrails
 ├── 📁 routes/        # Clean RESTful route trees separating public, patient, and clinical domains
 └── 📁 tests/         # Automated validation workflows (Unit and Integration testing layers)
```

---

## ⚙️ Prerequisites & Environmental Configurations

Ensure you have **Node.js (v18+)** and a local **MongoDB instance** running before initialization.

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/telemed_db
JWT_SECRET=your_ultra_secure_short_lived_access_key
COOKIE_SECURE=false # Toggle to true when deploying over live HTTPS lines
```

---

## 🚀 Local Installation & Verification

1. **Clone the Infrastructure Repo**
   ```bash
   git clone https://github.com
   cd telemed-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Execute Automated Verification Suite (Jest)**
   ```bash
   npm run test
   ```

4. **Launch Application In Development Mode**
   ```bash
   npm run dev
   ```
   The engine will initialize and mount connections on `http://localhost:5000`.

---

## 🗺️ REST API Endpoint Index

### 🔓 Public Access & Authentication Routing
*   `POST /api/patients/register` — Creates a new patient profile, securely salting and hashing passwords via Bcrypt.
*   `POST /api/patients/login` — Verifies credentials, delivers a short access token in JSON body, and sets an `HttpOnly` refresh token cookie.
*   `POST /api/patients/refresh` — Standard REST POST endpoint parsing incoming cookies to deliver a fresh access token seamlessly.
*   `POST /api/doctors/register` — Registers a medical professional and assigns an immutable MongoDB `_id`.

### 🔒 Protected Clinical Operations (Requires `Authorization: Bearer <token>`)
*   `POST /api/doctors/set-availability` — Allows verified doctors to pass their `_id`, a date, and hours to invoke the automated time-slot generator engine.
*   `GET /api/patients/search-slots` — Evaluates a doctor's `_id` and a target date to execute a `$gte` and `$lte` range filter, returning unbooked windows.
*   `POST /api/patients/book-appointment` — Bridges a specific patient and slot `_id` to build a single source of truth appointment record, locking the availability slot.
*   `POST /api/patients/logout` — Destroys active token records from the database whitelist and explicitly clears the client browser cookies.

---

## 🛠️ Technology Stack & Tooling

*   **Runtime Environment**: Node.js
*   **Language Layer**: TypeScript (Strictly Configured via compiler option mapping)
*   **Web Framework**: Express
*   **Object Modeling Layer**: Mongoose / MongoDB Native Driver Contexts
*   **Security Suite**: JSONWebToken, BcryptJS, Crypto
*   **Testing Harness**: Jest, ts-jest, Supertest
