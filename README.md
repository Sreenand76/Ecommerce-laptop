# E-commerce Laptop Store Platform

This project is a fully functional E-commerce Laptop Store Platform built during my CodeSoft Internship. It allows users to browse and purchase laptops with dynamic pricing based on their selected specifications.

---

## 🛠️ Technologies Used

### Frontend:
- **React.js**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling and responsiveness.

### Backend:
- **Spring Boot**: Framework for creating Java-based web applications and RESTful APIs.
- **PostgreSQL**: Relational database for storing product and user data.

### Containerization:
- **Docker**: Ensures seamless and consistent deployment across all environments.

### Authentication & Security:
- **JWT (JSON Web Tokens)**: Provides secure authentication and role-based authorization for API endpoints.

---

## 🎯 Key Features

- **Dynamic Pricing Model**: Laptop prices are automatically adjusted based on user-selected specifications (e.g., RAM, storage, etc.).
- **Responsive Design**: Ensures an optimal and consistent user experience across mobile and desktop devices.
- **JWT Authentication and Authorization**: Secure user login, session management, and role-based access to protected APIs.
- **Dockerized Backend**: Simplifies deployment by containerizing the backend, ensuring consistency across different environments.

---

## 🔮 Future Scope

- Implement a recommendation system based on user preferences.
- Integrate payment gateway (e.g., Stripe or PayPal).

---

## 🚀 Live Demo

⚠️ The live demo link currently seems to be non-functional. If you're facing deployment issues, consider checking:
- Vercel logs for errors.
- Docker container status and configurations.
- Ensure the backend API is properly deployed and connected to the frontend.

Once fixed, you can provide the working link here:  
[Live Demo](https://prismtech7-laptops.vercel.app/)

---

## 📂 Project Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/Sreenand76/Ecommerce-laptop.git
cd Ecommerce-laptop
```
### **2. Setup the Frontend**
```bash
cd ecommerce-frontend
npm install
npm run dev
```
### **3. Setup the Backend**
```bash
cd ecommerce-backend
mvn clean install
mvn spring-boot:run
```

