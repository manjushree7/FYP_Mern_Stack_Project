import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, UserCheck } from 'lucide-react';
import api from '../utlis/api.js'

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Customer',
    });
    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');

        if (name === 'password') {
            setPasswordValidation({
                length: value.length >= 8,
                uppercase: /[A-Z]/.test(value),
                lowercase: /[a-z]/.test(value),
                number: /\d/.test(value),
            });
        }
    };

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const isPasswordValid = () => {
        return Object.values(passwordValidation).every(Boolean);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError('');

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            setIsLoading(false);
            return;
        }

        if (!isPasswordValid()) {
            setError('Password must be at least 8 characters, with uppercase, lowercase, and a number');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.post('/auth/signup', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded"></div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Started</h1>
                    <p className="text-gray-600">Create your account today</p>
                </div>

                {/* Signup Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <div className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4" role="alert">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                                    placeholder="John Doe"
                                    required
                                    aria-label="Full Name"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                                    placeholder="you@example.com"
                                    required
                                    aria-label="Email Address"
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="space-y-2">
                            <label htmlFor="role" className="text-sm font-medium text-gray-700">
                                Account Type
                            </label>
                            <div className="relative">
                                <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all appearance-none"
                                    required
                                    aria-label="Account Type"
                                >
                                    <option value="Customer">Customer</option>
                                    <option value="StallOwner">Stall Owner</option>
                                </select>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={passwordVisibility.password ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                    required
                                    aria-label="Password"
                                    aria-describedby="password-requirements"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('password')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={passwordVisibility.password ? 'Hide password' : 'Show password'}
                                >
                                    {passwordVisibility.password ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {formData.password && (
                                <div id="password-requirements" className="mt-2 space-y-1">
                                    {[
                                        { check: passwordValidation.length, text: 'At least 8 characters' },
                                        { check: passwordValidation.uppercase, text: 'One uppercase letter' },
                                        { check: passwordValidation.lowercase, text: 'One lowercase letter' },
                                        { check: passwordValidation.number, text: 'One number' },
                                    ].map(({ check, text }) => (
                                        <div key={text} className="flex items-center text-xs">
                                            <div className={`w-2 h-2 rounded-full mr-2 ${check ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            <span className={check ? 'text-green-600' : 'text-gray-500'}>{text}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={passwordVisibility.confirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                    required
                                    aria-label="Confirm Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirmPassword')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={passwordVisibility.confirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                >
                                    {passwordVisibility.confirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={
                                isLoading ||
                                !formData.name ||
                                !formData.email ||
                                !formData.password ||
                                !formData.confirmPassword ||
                                !isPasswordValid() ||
                                formData.password !== formData.confirmPassword
                            }
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            aria-label="Create Account"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        {/* Login Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                                    aria-label="Sign in"
                                >
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>
                        By creating an account, you agree to our{' '}
                        <button className="text-indigo-600 hover:text-indigo-700">Terms of Service</button> and{' '}
                        <button className="text-indigo-600 hover:text-indigo-700">Privacy Policy</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
