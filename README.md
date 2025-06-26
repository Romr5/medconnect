#  MedConnect – Online Doctor Appointment & Healthcare Portal

**MedConnect** is a full-stack web application designed to simplify and digitize healthcare workflows. It enables **patients** to book appointments, **doctors** to manage and respond to appointments and prescriptions, and **admins** to oversee the entire clinic operation efficiently.

---

##  Project Structure

```
medconnect-full/
│
├── medconnect/              # Backend - PHP + MySQL
│   ├── api/                 # API endpoints
│   ├── config/              # Database config
│   └── ...                  # Supporting PHP files
│
└── medconnect-client/       # Frontend - Angular
    ├── src/app/
    ├── assets/
    └── ...                  # Angular CLI structure
```

---

##  Core Features

### For Patients

* Register and log in using **OP number**
* Book appointments by selecting a doctor, date, and time
* View upcoming and past appointments
* View/download prescriptions written by doctors

###  For Doctors

* Log in using email and password
* View list of all appointments assigned to them
* Update appointment status (Pending → Approved → Completed)
* Write and manage prescriptions for patients

### For Admins

* Log in with elevated access
* Register new doctors
* View and manage all doctors, patients, and appointments
* Approve or cancel patient appointments
* Delete any user (doctor/patient) if needed

---

##  Technologies Used

| Layer          | Tech Stack                      |
| -------------- | ------------------------------- |
| **Frontend**   | Angular 17, Bootstrap, HTML/CSS |
| **Backend**    | PHP, MySQL, RESTful API         |
| **Database**   | MySQL (via XAMPP)               |
| **Server**     | XAMPP (Apache)                  |
| **Versioning** | Git + GitHub                    |

---

##  Authentication

* Admins & doctors log in via **email/password**
* Patients log in using a unique **OP number**
* Auth is handled via browser **localStorage** (session persistence)
* Routes are protected using **AuthGuards** based on user roles

---

##  Appointment Workflow

1. **Patient books** an appointment → status set to `pending`
2. **Admin approves** it → status becomes `approved`
3. **Doctor marks** it as `completed` after treatment or `cancelled` if needed

---

##  Modules

###  Home Page

* Universal landing page
* Sections for Patients, Doctors, and Admins
* Login/Register options clearly segmented

###  Admin Dashboard

* Pagination-ready tables for doctors and patients
* Doctor registration form
* Appointment overview (with status management)

### Doctor Dashboard

* Appointments list filtered by doctor
* Update status inline (dropdown)
* Button to write prescriptions

### Patient Dashboard

* Book new appointments
* View appointment history
* Access prescriptions

---

## UI Screens (Highlights)

* Modern UI using Bootstrap
* Responsive and mobile-friendly layout
* Profile initials and dynamic user greeting
* Conditional rendering based on role

---

##  Database Schema (Simplified)

### `users` table

\| id | name | email | password | phone | role | specialization | op\_number | ... |

### `appointments` table

\| id | patient\_id | doctor\_id | date | time | status | notes |

### `prescriptions` table

\| id | appointment\_id | content | created\_at |

---

##  Future Enhancements

* Password reset functionality via email
* Token-based authentication (JWT)
* Doctor schedule/calendar integration
* Notifications via SMS or email

---

##  How to Run Locally

### 1. Backend (PHP + MySQL)

* Place `medconnect` in `C:\xampp\htdocs`
* Import the `medconnect.sql` file via phpMyAdmin
* Start Apache & MySQL in XAMPP

### 2. Frontend (Angular)

```bash
cd medconnect-client
npm install
ng serve
```

Visit `http://localhost:4200`

---

## Conclusion

MedConnect is a scalable, modular healthcare management solution that streamlines appointment scheduling, prescription handling, and clinic administration. It demonstrates effective use of modern web development technologies with clean UI and role-based functionalities.
