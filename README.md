# 🧸 TeddyPOS - Modern Teddy Bear Store POS System

A beautiful, responsive, and fully functional Point of Sale system designed specifically for teddy bear and plush toy stores. Built with modern web technologies and featuring a playful, cute design with pastel colors.

## ✨ Features

### 🛒 Point of Sale (POS)
- Intuitive cashier interface with product grid
- Real-time cart management with quantity controls
- Multiple payment methods (Cash, Card, QR Code)
- Product search and category filtering
- Customer selection with loyalty points

### 📊 Dashboard & Analytics
- Beautiful dashboard with key metrics
- Sales overview and statistics
- Low stock alerts
- Featured products showcase
- Quick action buttons for common tasks

### 🔐 Authentication & Roles
- Secure login system
- Role-based access (Admin, Manager, Cashier)
- User management with different permissions

### 🎨 Design System
- Playful, cute design with teddy bear theme
- Pastel color palette (soft pinks, blues, creams)
- Responsive design for mobile, tablet, and desktop
- Smooth animations and transitions
- Custom gradients and shadows

## 🚀 Quick Start

### Demo Credentials
- **Admin**: username: `admin`, password: `password`
- **Cashier**: username: `cashier`, password: `password`

### Local Development

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd teddypos

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Routing**: React Router
- **Icons**: Lucide React
- **Fonts**: Comic Neue (display) + Inter (body)

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/          # Authentication components
│   ├── dashboard/     # Dashboard specific components
│   ├── layout/        # Layout components (Header, Sidebar)
│   └── ui/           # Reusable UI components (shadcn/ui)
├── data/             # Mock data and constants
├── pages/            # Page components
├── stores/           # Zustand state stores
├── types/            # TypeScript type definitions
├── assets/           # Images and static assets
└── lib/              # Utility functions
```

## 🎯 Core Features Implementation

### Authentication System
- JWT-like authentication with persistent storage
- Role-based route protection
- Secure logout functionality

### Cart Management
- Add/remove products with real-time updates
- Quantity adjustments with stock validation
- Tax calculation and discount application
- Multiple checkout payment methods

### Product Management
- Product grid with search and filtering
- Category-based organization
- Stock level tracking
- Low stock alerts

### Dashboard Analytics
- Real-time sales metrics
- Customer statistics
- Inventory alerts
- Quick action buttons

## 🎨 Design System

### Color Palette
- **Primary**: Soft pink (#F8BBD9) - Main brand color
- **Secondary**: Soft blue (#E0F2FE) - Supporting elements
- **Accent**: Soft lavender (#F3E8FF) - Highlights
- **Success**: Mint green (#BBF7D0) - Success states
- **Background**: Cream (#FFFEF7) - Main background

### Typography
- **Display Font**: Comic Neue (playful headings)
- **Body Font**: Inter (readable content)

### Components
- Rounded corners for soft, friendly feel
- Soft shadows with glow effects
- Gradient backgrounds for visual interest
- Smooth animations and transitions

## 🔮 Upcoming Features

- **Product Management**: Full CRUD operations for products
- **Customer Management**: Customer profiles and loyalty system
- **Sales History**: Complete transaction history
- **Reports & Analytics**: Advanced reporting dashboard
- **Online Store**: Customer-facing e-commerce integration
- **Inventory Management**: Stock tracking and supplier management
- **Multi-store Support**: Handle multiple store locations

## 📱 Responsive Design

- **Mobile**: Optimized cashier interface for tablets
- **Desktop**: Full-featured dashboard and management
- **Touch-friendly**: Large buttons and touch targets
- **Accessibility**: WCAG 2.1 compliant design

## 🚀 Deployment

This project can be deployed on any static hosting platform:

- **Vercel**: Recommended for React apps
- **Netlify**: Easy deployment with git integration
- **GitHub Pages**: Free hosting for public repositories

### Build for Production

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💝 Acknowledgments

- Designed with love for teddy bear enthusiasts
- Built with modern web technologies
- Inspired by the joy of cuddly companions

---

Made with 🧸 and ❤️ for boutique toy stores everywhere!
