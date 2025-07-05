import { create } from 'zustand';

const useStore = create((set) => {
    // Initialize from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    return {
        user: storedUser || null,
        token: storedToken || null,
        isAuthenticated: !!storedToken,

        login: (userData, token) => {
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);
            set({ user: userData, token, isAuthenticated: true });
        },

        logout: () => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            set({ user: null, token: null, isAuthenticated: false });
        },
    };
});

export default useStore;
