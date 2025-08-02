# SkillSwap Platform - User Story #6: Browse, Search, and Filter Skills

A modern, responsive web application that allows learners to browse, search, and filter available skills to find the perfect learning opportunities. Built with React frontend, Node.js backend, and MySQL database.

## 🚀 Features

### Core Functionality (User Story #6)
- **Advanced Search**: Real-time search with debouncing across skills, teachers, and categories
- **Smart Filtering**: Filter by category, skill level, session type, and price range
- **Category Navigation**: Visual category filters with skill counts and icons
- **Sorting Options**: Sort by newest, price, rating, popularity, and name
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Results**: Instant updates as you type and change filters

### Technical Features
- **Modern UI**: Beautiful, animated interface with Framer Motion
- **Pagination**: Efficient data loading with smart pagination
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Graceful error states with retry options
- **Performance**: Optimized API calls and efficient data fetching
- **Accessibility**: Keyboard navigation and screen reader support

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icons
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Elegant notification system
- **Custom CSS** - Tailwind-inspired utility classes

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL2** - MySQL database driver with promises
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Rate Limiting** - API protection
- **Environment Variables** - Configuration management

### Database
- **MySQL** - Relational database
- **Structured Schema** - Normalized tables for skills, categories, and users
- **Sample Data** - Rich dataset for demonstration

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MySQL** (v8 or higher)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd SkillSwapUserStory-6
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (frontend + backend)
npm run install-all
```

### 3. Database Setup

#### Option A: Default Setup (Recommended)
```bash
# Start MySQL service
sudo service mysql start  # Linux
# or
brew services start mysql  # macOS

# Create database and tables with sample data
cd backend
npm run setup-db
```

#### Option B: Custom Database Setup
1. Create a MySQL database named `skillswap_db`
2. Update `backend/.env` with your database credentials
3. Run the setup script: `npm run setup-db`

### 4. Configure Environment Variables
```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit backend/.env with your settings:
# DB_HOST=localhost
# DB_USER=your_mysql_username
# DB_PASSWORD=your_mysql_password
# DB_NAME=skillswap_db
# DB_PORT=3306
# PORT=5000
```

### 5. Start the Application
```bash
# Start both frontend and backend simultaneously
npm run dev

# Or start individually:
# Backend (Port 5000)
npm run server

# Frontend (Port 3000)
npm run client
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

## 📊 Database Schema

### Categories Table
- `id` - Primary key
- `name` - Category name (Programming, Design, etc.)
- `description` - Category description
- `icon` - Icon identifier
- `color` - Category color code

### Users Table (Teachers)
- `id` - Primary key
- `name` - Teacher name
- `email` - Contact email
- `avatar` - Profile image URL
- `bio` - Teacher biography
- `rating` - Average rating (0-5)
- `total_reviews` - Number of reviews
- `is_verified` - Verification status
- `location` - Geographic location
- `languages` - Spoken languages (JSON)

### Skills Table
- `id` - Primary key
- `title` - Skill title
- `description` - Detailed description
- `category_id` - Foreign key to categories
- `teacher_id` - Foreign key to users
- `skill_level` - Beginner/Intermediate/Advanced
- `duration_hours` - Total course duration
- `price_per_hour` - Hourly rate
- `tags` - Skill tags (JSON)
- `prerequisites` - Required knowledge
- `learning_outcomes` - What students will learn
- `session_type` - One-on-One/Group/Workshop
- `max_students` - Maximum class size
- `available_slots` - Available time slots (JSON)
- `rating` - Average skill rating
- `total_enrollments` - Number of students
- `is_active` - Active status

## 🔌 API Endpoints

### Skills
- `GET /api/skills` - Get all skills with filters and pagination
- `GET /api/skills/:id` - Get specific skill details
- `GET /api/skills/categories` - Get all categories with skill counts
- `GET /api/skills/filter-options` - Get available filter options

### Query Parameters for `/api/skills`
- `search` - Search term for title, description, tags, or teacher name
- `category` - Filter by category name
- `skill_level` - Filter by skill level (Beginner/Intermediate/Advanced)
- `session_type` - Filter by session type
- `min_price` - Minimum price filter
- `max_price` - Maximum price filter
- `sort_by` - Sort field (created_at, price_per_hour, rating, etc.)
- `sort_order` - Sort direction (ASC/DESC)
- `page` - Page number for pagination
- `limit` - Items per page

## 🎨 UI Features

### Search & Discovery
- **Hero Section**: Compelling header with search prominence
- **Category Pills**: Visual category navigation with counts
- **Advanced Filters**: Collapsible filter panel with multiple options
- **Search Suggestions**: Real-time search feedback

### Skill Cards
- **Rich Information**: Title, description, teacher info, rating, price
- **Visual Hierarchy**: Clean layout with proper spacing
- **Interactive States**: Hover effects and click animations
- **Responsive Design**: Adapts to different screen sizes

### User Experience
- **Loading States**: Skeleton screens during data fetching
- **Empty States**: Helpful messages when no results found
- **Error States**: Clear error messages with retry options
- **Smooth Animations**: Framer Motion for fluid interactions

## 🚀 Sample Data

The application includes comprehensive sample data:
- **8 Categories**: Programming, Design, Business, Languages, Music, Photography, Fitness, Cooking
- **6 Teachers**: Diverse instructors with realistic profiles
- **14 Skills**: Varied learning opportunities across all categories
- **Rich Content**: Detailed descriptions, tags, prerequisites, and outcomes

## 🔧 Development

### Available Scripts
```bash
# Development
npm run dev          # Start both frontend and backend
npm run server       # Start backend only
npm run client       # Start frontend only

# Database
npm run setup-db     # Create database and insert sample data

# Installation
npm run install-all  # Install all dependencies
```

### Project Structure
```
SkillSwapUserStory-6/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   ├── scripts/         # Database setup scripts
│   ├── .env             # Environment variables
│   └── server.js        # Express server
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   └── package.json
└── package.json         # Root package.json
```

## 🎯 User Story Implementation

This project specifically implements **User Story #6**:

> "As a Learner, I can browse, search, and filter available skills, so that I can quickly find the right learning opportunities that fit my preferences and schedule."

### Key Features Delivered:
✅ **Browse Skills**: Grid and list view of all available skills  
✅ **Search Functionality**: Real-time search across multiple fields  
✅ **Advanced Filtering**: Category, level, type, and price filters  
✅ **Sorting Options**: Multiple sorting criteria  
✅ **Responsive Design**: Works on all device sizes  
✅ **Performance**: Fast, efficient data loading  
✅ **User Experience**: Intuitive, modern interface  

## 🔮 Future Enhancements

While this implementation focuses on User Story #6, it provides a solid foundation for other stories:
- User authentication and profiles
- Skill detail pages with booking
- Teacher dashboards and management
- Real-time messaging
- Video session integration
- Review and rating systems
- Payment processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**Database Connection Failed**
- Ensure MySQL is running
- Check credentials in `backend/.env`
- Verify database exists

**Port Already in Use**
- Change port in `backend/.env` (PORT=5001)
- Kill existing processes: `lsof -ti:3000 | xargs kill`

**Dependencies Not Installing**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall
- Check Node.js version compatibility

**API Requests Failing**
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Ensure proxy is configured in frontend package.json

For more help, check the console logs or create an issue.

---

**Built with ❤️ for the SkillSwap Platform**