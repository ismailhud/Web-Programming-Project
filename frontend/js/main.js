// Main JavaScript file for SPA functionality

// SPA Router
class Router {
    constructor() {
        this.routes = {};
        this.currentPage = '';
        
        // Initialize router
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }
    
    // Register a route
    addRoute(path, handler) {
        this.routes[path] = handler;
    }
    
    // Handle route changes
    handleRoute() {
        const hash = window.location.hash.slice(1) || 'dashboard';
        const route = this.routes[hash];
        
        if (route) {
            this.currentPage = hash;
            this.updateActiveNav();
            route();
        } else {
            this.navigateTo('dashboard');
        }
    }
    
    // Navigate to a specific route
    navigateTo(path) {
        window.location.hash = path;
    }
    
    // Update active navigation item
    updateActiveNav() {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${this.currentPage}`) {
                link.classList.add('active');
            }
        });
    }
}

// Page Loader
class PageLoader {
    constructor() {
        this.contentContainer = document.getElementById('content');
        this.cache = {};
    }
    
    // Load page content
    async loadPage(pageName) {
        try {
            // Check cache first
            if (this.cache[pageName]) {
                this.contentContainer.innerHTML = this.cache[pageName];
                this.initializePageScripts(pageName);
                return;
            }
            
            // Load from server
            const response = await fetch(`${pageName}.html`);
            if (response.ok) {
                const html = await response.text();
                this.cache[pageName] = html;
                this.contentContainer.innerHTML = html;
                this.initializePageScripts(pageName);
            } else {
                throw new Error(`Failed to load ${pageName}`);
            }
        } catch (error) {
            console.error('Error loading page:', error);
            this.contentContainer.innerHTML = `
                <div class="page-content">
                    <h1>Error</h1>
                    <p>Failed to load page: ${pageName}</p>
                </div>
            `;
        }
    }
    
    // Initialize page-specific scripts
    initializePageScripts(pageName) {
        switch (pageName) {
            case 'login':
                this.initLoginPage();
                break;
            case 'register':
                this.initRegisterPage();
                break;
            case 'dashboard':
                this.initDashboardPage();
                break;
            case 'zones':
                this.initZonesPage();
                break;
            case 'spots':
                this.initSpotsPage();
                break;
            case 'reservations':
                this.initReservationsPage();
                break;
            case 'vehicles':
                this.initVehiclesPage();
                break;
            case 'users':
                this.initUsersPage();
                break;
        }
    }
    
    // Page-specific initialization methods
    initLoginPage() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
    }
    
    initRegisterPage() {
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', handleRegister);
        }
    }
    
    initDashboardPage() {
        // Load dashboard data
        loadDashboardData();
    }
    
    initZonesPage() {
        loadZones();
    }
    
    initSpotsPage() {
        loadSpots();
    }
    
    initReservationsPage() {
        loadReservations();
    }
    
    initVehiclesPage() {
        loadVehicles();
    }
    
    initUsersPage() {
        loadUsers();
    }
}

// API Service
class ApiService {
    constructor() {
        this.baseUrl = '/api';
    }
    
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
    
    // User methods
    async login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }
    
    async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }
    
    // Zone methods
    async getZones() {
        return this.request('/zones');
    }
    
    async createZone(zoneData) {
        return this.request('/zones', {
            method: 'POST',
            body: JSON.stringify(zoneData)
        });
    }
    
    // Spot methods
    async getSpots() {
        return this.request('/spots');
    }
    
    async createSpot(spotData) {
        return this.request('/spots', {
            method: 'POST',
            body: JSON.stringify(spotData)
        });
    }
    
    // Reservation methods
    async getReservations() {
        return this.request('/reservations');
    }
    
    async createReservation(reservationData) {
        return this.request('/reservations', {
            method: 'POST',
            body: JSON.stringify(reservationData)
        });
    }
    
    // Vehicle methods
    async getVehicles() {
        return this.request('/vehicles');
    }
    
    async createVehicle(vehicleData) {
        return this.request('/vehicles', {
            method: 'POST',
            body: JSON.stringify(vehicleData)
        });
    }
}

// Initialize application
const router = new Router();
const pageLoader = new PageLoader();
const apiService = new ApiService();

// Register routes
router.addRoute('dashboard', () => pageLoader.loadPage('dashboard'));
router.addRoute('login', () => pageLoader.loadPage('login'));
router.addRoute('register', () => pageLoader.loadPage('register'));
router.addRoute('zones', () => pageLoader.loadPage('zones'));
router.addRoute('spots', () => pageLoader.loadPage('spots'));
router.addRoute('reservations', () => pageLoader.loadPage('reservations'));
router.addRoute('vehicles', () => pageLoader.loadPage('vehicles'));
router.addRoute('users', () => pageLoader.loadPage('users'));

// Event handlers
async function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const credentials = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    try {
        const result = await apiService.login(credentials);
        if (result.success) {
            localStorage.setItem('authToken', result.token);
            router.navigateTo('dashboard');
        }
    } catch (error) {
        alert('Login failed. Please try again.');
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    try {
        const result = await apiService.register(userData);
        if (result.success) {
            alert('Registration successful! Please login.');
            router.navigateTo('login');
        }
    } catch (error) {
        alert('Registration failed. Please try again.');
    }
}

// Data loading functions
async function loadDashboardData() {
    // Implementation for loading dashboard data
}

async function loadZones() {
    // Implementation for loading zones
}

async function loadSpots() {
    // Implementation for loading spots
}

async function loadReservations() {
    // Implementation for loading reservations
}

async function loadVehicles() {
    // Implementation for loading vehicles
}

async function loadUsers() {
    // Implementation for loading users
}

// Utility functions
function showMessage(message, type = 'info') {
    // Create and show message notification
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function formatTime(timeString) {
    return new Date(timeString).toLocaleTimeString();
}