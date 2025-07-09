// services/apiService.js
const API_BASE_URL = 'http://localhost:5173/api'; // Adjust this to your backend URL

class ApiService {
    constructor() {
        this.token = localStorage.getItem('authToken');
    }

    // Helper method to get headers
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            ...(this.token && { Authorization: `Bearer ${this.token}` })
        };
    }

    // Helper method to handle responses
    async handleResponse(response) {
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Something went wrong');
        }
        return response.json();
    }

    // Set token after login
    setToken(token) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    // Clear token on logout
    clearToken() {
        this.token = null;
        localStorage.removeItem('authToken');
    }

    // Event API methods
    async createEvent(eventData) {
        const response = await fetch(`${API_BASE_URL}/events`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(eventData)
        });
        return this.handleResponse(response);
    }

    async getEvents() {
        const response = await fetch(`${API_BASE_URL}/events`, {
            headers: this.getHeaders()
        });
        return this.handleResponse(response);
    }

    async getEventById(id) {
        const response = await fetch(`${API_BASE_URL}/events/${id}`, {
            headers: this.getHeaders()
        });
        return this.handleResponse(response);
    }

    async updateEvent(id, eventData) {
        const response = await fetch(`${API_BASE_URL}/events/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(eventData)
        });
        return this.handleResponse(response);
    }

    async deleteEvent(id) {
        const response = await fetch(`${API_BASE_URL}/events/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return this.handleResponse(response);
    }

    async addParticipant(eventId, stallOwnerId) {
        const response = await fetch(`${API_BASE_URL}/events/participant`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ eventId, stallOwnerId })
        });
        return this.handleResponse(response);
    }
}

export default new ApiService();