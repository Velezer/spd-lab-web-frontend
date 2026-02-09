# SPD Lab Web Frontend

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive web application built with React and Vite, featuring a comprehensive admin panel and a user-friendly marketplace. This project provides a complete e-commerce solution with product management, order processing, and user authentication.

## 🚀 Features

### Admin Panel
- **Dashboard**: Overview of key metrics and quick access to main functions
- **Product Management**: Add, edit, delete, and search products with image uploads
- **Order Management**: View and update order statuses
- **Profile Management**: Admin user profile and account settings

### Marketplace
- **Product Catalog**: Browse products with search and filtering
- **Shopping Cart**: Add/remove items, view cart summary
- **Checkout Process**: Secure order placement
- **User Authentication**: Login and registration
- **Order History**: View past orders and order details

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Linting**: ESLint

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/spd-lab-web-frontend.git
   cd spd-lab-web-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🏗️ Project Structure

```
src/
├── admin/
│   ├── components/
│   │   └── Sidebar.jsx
│   └── pages/
│       ├── AdminLayout.jsx
│       ├── Dashboard.jsx
│       ├── Products.jsx
│       ├── Orders.jsx
│       ├── AdminProfile.jsx
│       └── OrderDetail.jsx
├── marketplace/
│   ├── component/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── ProductList.jsx
│   └── page/
│       ├── Cart.jsx
│       ├── Checkout.jsx
│       ├── Login.jsx
│       ├── OrderDetail.jsx
│       ├── Orders.jsx
│       ├── ProductDetail.jsx
│       ├── Profile.jsx
│       └── Register.jsx
├── api/
│   ├── AuthClient.js
│   ├── OrderClient.js
│   └── ProductClient.js
├── App.jsx
├── index.css
└── main.jsx
```

## 📱 Usage

### Admin Panel
Navigate to `/admin` to access the admin panel. Use the sidebar to switch between different management sections.

### Marketplace
The main marketplace is accessible at the root URL `/`. Users can browse products, add to cart, and complete purchases.

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">
  <p>Built with ❤️ using React and Vite</p>
  <p>
    <a href="#spd-lab-web-frontend">Back to top</a>
  </p>
</div>
