# 🐾 PetsHelp – Pet Care Services Marketplace (Frontend)

## 🚀 Project Description

**PetsHelp** is an online marketplace where pet owners can easily find and
connect with verified specialists offering various services for their beloved
pets. Initially focused on cats and dogs, the platform allows professionals to
list offerings like temporary care, grooming, home visits, walking, vaccination,
and more. Future updates will include support for other types of pets.

This is the **frontend** part of the PetsHelp application, built with React,
TypeScript, Tailwind CSS, and state-managed via Redux Toolkit. It includes
modern form validation, accessibility enhancements, and a responsive,
user-friendly interface.

---

## ✨ Key Features

- **Home page** - filter services by pet type, size, district, and service
  category.
- **Search results** - view a list of specialists with experience, ratings,
  photos, badges, and more.
- **Specialist profile** - see experience, reviews, pet photos, a list of
  offered services, and approximate prices.
- **Order form** - submit service requests via a guided form (date, time, place,
  description).
- **Review system** - rate and review professionals after service completion.
- **Specialist onboarding** - professionals can register and manage their
  services and pricing.
- **Legal pages** - Terms of Service and Privacy Policy.
- **Admin panel** _(managed in a separate repository)_ - planned functionality
  includes managing categories, verifying specialists, and moderating content.

---

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first styling
- **React Router DOM** - Routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Redux Toolkit** - State management
- **Date-fns** - Date manipulation
- **Lottie-react** - Animations
- **React IMask** - Input masking
- **React Error Boundary** - Error handling
- **Clsx** - Conditional classNames utility

---

## 👷‍♀️ Local Setup Instructions

These steps are intended for anyone who wants to run the frontend project
locally. No coding experience is required.

### ✅ Requirements

Before starting, please ensure you have the following installed:

1. **Code Editor (choose one):**

   - [VS Code (Recommended)](https://code.visualstudio.com/)
   - [WebStorm (Optional)](https://www.jetbrains.com/webstorm/)

2. **Node.js** - runtime to run the project

   - Download and install the latest **LTS** version from:
     [https://nodejs.org](https://nodejs.org)
   - After installation, open a terminal and verify:
     ```bash
     node -v
     npm -v
     ```

3. **Git** - version control tool used to download (clone) the project source
   code to your local machine and collaborate on changes.

   - Download from:
     [https://git-scm.com/downloads](https://git-scm.com/downloads)

---

### 📦 Clone the Repository

Open a terminal or command prompt and run:

```bash
git clone git@github.com:petHelpMarketplace/frontend.git
```

Or via HTTPS:

```bash
git clone https://github.com/petHelpMarketplace/frontend.git
```

Then navigate into the project folder:

```bash
cd frontend
```

Make sure you switch to the development branch:

```bash
git checkout dev
```

### 📥 Install Dependencies

Run this command in the terminal (inside the frontend folder):

```bash
npm install
```

This will download all required packages.

### ▶️ Run the App Locally

Once installation is complete, run:

```bash
npm run dev
```

This will start the local development server.

- The app will usually be available at: http://localhost:5173

- Open it in your browser to start testing.

### 📄 Legal Pages

- **/terms** — Terms of Service
- **/privacy** — Privacy Policy

These pages are accessible in the app and are required for legal compliance.

<!-- TODO: Add contact information or GitHub team link for support. -->

### 📫 Contact

If you encounter any issues or have feedback, please open an issue at  
👉 [GitHub Issues](https://github.com/petHelpMarketplace/frontend/issues)

For general inquiries, feel free to reach out via email: teamchl0325@gmail.com
