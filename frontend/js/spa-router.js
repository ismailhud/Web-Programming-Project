// SPA Router for Parking Management System
// This file handles Single Page Application routing and dynamic content loading

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
        const navLinks = document.querySelectorAll('#navmenu a');
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
        this.contentContainer = document.getElementById('app');
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
                <section class="section">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-6 text-center">
                                <h2>Page Not Found</h2>
                                <p>Sorry, the page "${pageName}" could not be loaded.</p>
                                <a href="#dashboard" class="btn btn-primary">Go to Dashboard</a>
                            </div>
                        </div>
                    </div>
                </section>
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
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Initialize SPA
    const router = new Router();
    const pageLoader = new PageLoader();
    const apiService = new ApiService();

    // Make globally accessible
    window.router = router;
    window.pageLoader = pageLoader;
    window.apiService = apiService;

    // Register routes
    router.addRoute('dashboard', () => pageLoader.loadPage('dashboard'));
    router.addRoute('login', () => pageLoader.loadPage('login'));
    router.addRoute('register', () => pageLoader.loadPage('register'));
    router.addRoute('zones', () => pageLoader.loadPage('zones'));
    router.addRoute('spots', () => pageLoader.loadPage('spots'));
    router.addRoute('reservations', () => pageLoader.loadPage('reservations'));
    router.addRoute('vehicles', () => pageLoader.loadPage('vehicles'));
    router.addRoute('users', () => pageLoader.loadPage('users'));
});

// Event handlers
async function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const credentials = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        const result = await window.apiService.login(credentials);
        if (result.success) {
            localStorage.setItem('authToken', result.token);
            window.router.navigateTo('dashboard');
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
        const result = await window.apiService.register(userData);
        if (result.success) {
            alert('Registration successful! Please login.');
            window.router.navigateTo('login');
        }
    } catch (error) {
        alert('Registration failed. Please try again.');
    }
}

// Data loading functions (ready for backend integration)
async function loadDashboardData() {
    // TODO: Implement dashboard data loading from API
    // Example: const data = await apiService.request('/dashboard');
}

async function loadZones() {
    // TODO: Implement zones data loading from API  
    // Example: const zones = await apiService.request('/zones');
}

async function loadSpots() {
    // TODO: Implement spots data loading from API
    // Example: const spots = await apiService.request('/spots');
}

async function loadReservations() {
    // TODO: Implement reservations data loading from API
    // Example: const reservations = await apiService.request('/reservations');
}

async function loadVehicles() {
    // TODO: Implement vehicles data loading from API
    // Example: const vehicles = await apiService.request('/vehicles');
}

async function loadUsers() {
    // TODO: Implement users data loading from API
    // Example: const users = await apiService.request('/users');
}

// Utility functions
function showMessage(message, type = 'info') {
    // Create Bootstrap alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
}
