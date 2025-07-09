// foodItemService.js
const API_BASE_URL = 'http://localhost:3000/api'; // Update with your backend URL

class FoodItemService {
    // Get auth token from localStorage
    getAuthToken() {
        return localStorage.getItem('authToken');
    }

    // Create headers with auth token
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
        };
    }

    // Get all food items
    async getFoodItems() {
        try {
            const response = await fetch(`${API_BASE_URL}/fooditems`, {
                method: 'GET',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching food items:', error);
            throw error;
        }
    }

    // Get single food item by ID
    async getFoodItemById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/fooditems/${id}`, {
                method: 'GET',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching food item:', error);
            throw error;
        }
    }

    // Create new food item
    async createFoodItem(foodItem) {
        try {
            const response = await fetch(`${API_BASE_URL}/fooditems`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(foodItem)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating food item:', error);
            throw error;
        }
    }

    // Update food item
    async updateFoodItem(id, foodItem) {
        try {
            const response = await fetch(`${API_BASE_URL}/fooditems/${id}`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(foodItem)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating food item:', error);
            throw error;
        }
    }

    // Delete food item
    async deleteFoodItem(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/fooditems/${id}`, {
                method: 'DELETE',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting food item:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new FoodItemService();