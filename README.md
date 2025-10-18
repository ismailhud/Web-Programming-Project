# Parking Management System - Web Programming Project

A comprehensive web-based parking management system built with modern web technologies. This system allows users to manage parking zones, spots, reservations, vehicles, and user accounts through an intuitive single-page application (SPA) interface.

## Features

- **User Management**: Registration, login, and profile management for customers and administrators
- **Zone Management**: Create and manage parking zones with different types and pricing
- **Spot Management**: Individual parking spot tracking with status updates
- **Reservation System**: Real-time parking spot reservations with time-based pricing
- **Vehicle Management**: Register and manage multiple vehicles per user
- **Dashboard**: Real-time overview of parking statistics and recent activity
- **Responsive Design**: Mobile-friendly interface that works on all devices

## Project Structure

```
Web-Programming-Project/
├─ backend/
│  ├─ routes/              ← API route handlers
│  │  └─ placeholder.txt
│  ├─ services/            ← Business logic layer
│  │  └─ placeholder.txt
│  └─ dao/                 ← Data Access Objects
│     └─ placeholder.txt
│
├─ frontend/
│  ├─ css/
│  │  └─ style.css         ← Main stylesheet
│  ├─ js/
│  │  └─ main.js           ← SPA JavaScript functionality
│  ├─ assets/
│  │  └─ images/           ← Logos & static images
│  └─ views/
│     ├─ index.html        ← SPA shell (loads CSS/JS once)
│     ├─ dashboard.html    ← Dashboard page
│     ├─ login.html        ← Login page
│     ├─ register.html     ← Registration page
│     ├─ zones.html        ← Zone management
│     ├─ spots.html        ← Parking spot management
│     ├─ reservations.html ← Reservation management
│     ├─ vehicles.html     ← Vehicle management
│     └─ users.html        ← User management (admin)
│
├─ ERD.md                  ← Database schema design
├─ README.md               ← Project documentation
├─ .gitignore             ← Git ignore rules
├─ .htaccess              ← Apache URL rewriting rules
└─ Web-Programming-Project.code-workspace ← VS Code workspace

```

## Technology Stack

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox and grid
- **Vanilla JavaScript**: SPA routing and dynamic content loading
- **Responsive Design**: Mobile-first approach

### Backend (To be implemented)
- **Node.js**: Server runtime
- **Express.js**: Web application framework
- **MySQL/PostgreSQL**: Database management
- **RESTful API**: Clean API architecture

### Configuration
- **.htaccess**: Apache URL rewriting for clean URLs and auto-redirect from root to main application

## Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Web server (Apache, Nginx, or development server)
- Database server (MySQL/PostgreSQL for backend)
- Node.js (for backend development)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ismailhud/Web-Programming-Project.git
   cd Web-Programming-Project
   ```

2. **Set up the frontend**
   - Place the project in your web server directory (e.g., `htdocs` for XAMPP)
   - Access the application via `http://localhost/IsmailHuduti/Web-Programming-Project/Web-Programming-Project/frontend/views/index.html`
   - Alternative: `http://localhost/IsmailHuduti/Web-Programming-Project/Web-Programming-Project/` (redirects automatically via .htaccess)

3. **Database Setup**
   - Review the ERD.md file for database schema
   - Create the database tables according to the Entity Relationship Diagram
   - Configure database connection in backend files (when implemented)

4. **Backend Setup** (Future implementation)
   ```bash
   cd backend
   npm install
   npm start
   ```

### Running the Application

#### Development Mode
1. Start your local web server (XAMPP, WAMP, etc.)
2. Navigate to one of these URLs:
   - **Main**: `http://localhost/IsmailHuduti/Web-Programming-Project/Web-Programming-Project/frontend/views/index.html`
   - **Root**: `http://localhost/IsmailHuduti/Web-Programming-Project/Web-Programming-Project/` (auto-redirects)
3. The SPA will load and you can navigate between different sections

#### Features Available
- Navigate between different pages using the top navigation
- View the responsive design on different screen sizes
- Explore the UI components and form layouts
- Test the SPA routing functionality
- Single entry point through `frontend/views/index.html`

#### Current Implementation Status
- ✅ **Frontend Complete**: All HTML views, CSS styling, and JavaScript SPA functionality
- ✅ **Project Structure**: Organized according to specifications
- ✅ **Responsive Design**: Mobile and desktop compatible
- ⏳ **Backend**: Placeholder structure ready for implementation
- ⏳ **Database**: ERD completed, implementation pending

## Database Design

The system uses a relational database with 6 main entities:
- **Users**: Customer and admin accounts
- **Zones**: Parking areas with different characteristics
- **Spots**: Individual parking spaces within zones
- **Vehicles**: User-registered vehicles
- **Reservations**: Parking bookings with time slots
- **Payments**: Payment processing for reservations

See `ERD.md` for detailed database schema and relationships.

## API Endpoints (Planned)

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Zones
- `GET /api/zones` - Get all zones
- `POST /api/zones` - Create new zone
- `PUT /api/zones/:id` - Update zone
- `DELETE /api/zones/:id` - Delete zone

### Spots
- `GET /api/spots` - Get all spots
- `GET /api/spots/available` - Get available spots
- `POST /api/spots` - Create new spot
- `PUT /api/spots/:id` - Update spot

### Reservations
- `GET /api/reservations` - Get user reservations
- `POST /api/reservations` - Create reservation
- `PUT /api/reservations/:id` - Update reservation
- `DELETE /api/reservations/:id` - Cancel reservation

### Vehicles
- `GET /api/vehicles` - Get user vehicles
- `POST /api/vehicles` - Register vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development Roadmap

### Phase 1: Frontend Foundation ✅
- [x] Project structure setup
- [x] HTML templates and views
- [x] CSS styling and responsive design
- [x] JavaScript SPA functionality

### Phase 2: Backend Development (In Progress)
- [ ] Node.js server setup
- [ ] Express.js route configuration
- [ ] Database connection and models
- [ ] API endpoint implementation
- [ ] Authentication system

### Phase 3: Integration & Testing
- [ ] Frontend-backend integration
- [ ] API testing and validation
- [ ] User acceptance testing
- [ ] Performance optimization

### Phase 4: Deployment & Production
- [ ] Production environment setup
- [ ] Security enhancements
- [ ] Monitoring and logging
- [ ] Documentation completion

## License

This project is developed as part of a Web Programming course assignment.

## Contact

Project maintainer: Ismail Huduti
- GitHub: [@ismailhud](https://github.com/ismailhud)

Project Link: [https://github.com/ismailhud/Web-Programming-Project](https://github.com/ismailhud/Web-Programming-Project)
