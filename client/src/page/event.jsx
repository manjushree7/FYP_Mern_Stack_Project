import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import EventList from '../components/Event/EventList';
import EventForm from '../components/Event/EventForm';
import EventDetails from '../components/Event/EventDetails';

// Mock API service for demonstration
const apiService = {
    async getEvents() {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        return [
            {
                _id: '1',
                name: 'Tech Conference 2024',
                description: 'Annual technology conference featuring the latest innovations and trends in the tech industry.',
                location: 'San Francisco Convention Center',
                startDate: new Date('2024-08-15T09:00:00'),
                endDate: new Date('2024-08-17T17:00:00'),
                stallOwners: [
                    { stallName: 'TechCorp', location: 'Hall A' },
                    { stallName: 'InnovateLab', location: 'Hall B' }
                ],
                createdAt: new Date('2024-07-01T10:00:00')
            },
            {
                _id: '2',
                name: 'Food Festival',
                description: 'Celebrate culinary diversity with food from around the world.',
                location: 'Central Park',
                startDate: new Date('2024-09-20T10:00:00'),
                endDate: new Date('2024-09-22T22:00:00'),
                stallOwners: [
                    { stallName: 'Pizza Palace', location: 'Section 1' },
                    { stallName: 'Burger Barn', location: 'Section 2' },
                    { stallName: 'Sushi Station', location: 'Section 3' }
                ],
                createdAt: new Date('2024-07-15T14:00:00')
            }
        ];
    },

    async createEvent(eventData) {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
            _id: Date.now().toString(),
            ...eventData,
            stallOwners: [],
            createdAt: new Date()
        };
    },

    async updateEvent(id, eventData) {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
            _id: id,
            ...eventData,
            stallOwners: [],
            createdAt: new Date()
        };
    },

    async deleteEvent(id) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { message: 'Event deleted successfully' };
    }
};

const App = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            setLoading(true);
            const data = await apiService.getEvents();
            setEvents(data);
        } catch (error) {
            console.error('Error loading events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEvent = async (eventData) => {
        try {
            const newEvent = await apiService.createEvent(eventData);
            setEvents(prev => [newEvent, ...prev]);
            setShowForm(false);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const handleUpdateEvent = async (eventData) => {
        try {
            const updatedEvent = await apiService.updateEvent(editingEvent._id, eventData);
            setEvents(prev => prev.map(event =>
                event._id === editingEvent._id ? updatedEvent : event
            ));
            setEditingEvent(null);
            setShowForm(false);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await apiService.deleteEvent(eventId);
                setEvents(prev => prev.filter(event => event._id !== eventId));
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setShowForm(true);
    };

    const handleViewEvent = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingEvent(null);
    };

    const handleCloseDetails = () => {
        setSelectedEvent(null);
    };

    const getEventStatus = (startDate, endDate) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now >= start && now <= end) {
            return 'active';
        } else if (start > now) {
            return 'upcoming';
        } else {
            return 'ended';
        }
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterStatus === 'all') return matchesSearch;

        const status = getEventStatus(event.startDate, event.endDate);
        return matchesSearch && status === filterStatus;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
                            <p className="text-gray-600 mt-2">Create, manage, and track your events</p>
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-sm"
                        >
                            <Plus size={20} />
                            <span>Create Event</span>
                        </button>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search events by name or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Filter size={20} className="text-gray-400" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Events</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="active">Active</option>
                                <option value="ended">Ended</option>
                            </select>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <Calendar className="h-8 w-8 text-blue-600" />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-600">Total Events</p>
                                    <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <Calendar className="h-8 w-8 text-green-600" />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-600">Active Events</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {events.filter(e => getEventStatus(e.startDate, e.endDate) === 'active').length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <Calendar className="h-8 w-8 text-purple-600" />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {events.filter(e => getEventStatus(e.startDate, e.endDate) === 'upcoming').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <EventList
                    events={filteredEvents}
                    onEdit={handleEditEvent}
                    onDelete={handleDeleteEvent}
                    onView={handleViewEvent}
                    loading={loading}
                />

                {/* Modals */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <EventForm
                            event={editingEvent}
                            onSave={editingEvent ? handleUpdateEvent : handleCreateEvent}
                            onCancel={handleCloseForm}
                            isEditing={!!editingEvent}
                        />
                    </div>
                )}

                {selectedEvent && (
                    <EventDetails
                        event={selectedEvent}
                        onClose={handleCloseDetails}
                        onEdit={handleEditEvent}
                    />
                )}
            </div>
        </div>
    );
};

export default App;