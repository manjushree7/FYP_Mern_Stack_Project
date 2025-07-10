import React, { useEffect, useState } from 'react';
import api from '../utlis/api';
import { Link } from 'react-router-dom';
import EditEventModal from '../components/common/EditEventModal'; // adjust if needed
import { Pencil, Trash2, CalendarPlus, MapPin, Users, Maximize2 } from 'lucide-react';

const AdminEventsList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingEvent, setEditingEvent] = useState(null);

    const fetchEvents = async () => {
        try {
            const res = await api.get('/events');
            setEvents(res.data);
        } catch (err) {
            console.error('Failed to fetch events:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await api.delete(`/events/${id}`);
            setEvents(events.filter((e) => e._id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">📅 Manage Events</h1>
                <Link
                    to="/admin/events/create"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                    <CalendarPlus className="w-4 h-4" />
                    Create Event
                </Link>
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Loading events...</p>
            ) : events.length === 0 ? (
                <p className="text-center text-gray-500">No events found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map((event) => (
                        <div
                            key={event._id}
                            className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all border border-gray-200"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold text-gray-800">{event.name}</h2>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => setEditingEvent(event)}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Edit"
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event._id)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 space-y-1">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarPlus className="w-4 h-4 text-gray-500" />
                                    <span>
                                        {new Date(event.startDate).toLocaleDateString()} →{' '}
                                        {new Date(event.endDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-gray-500" />
                                    <span>
                                        {event.stallOwners?.length || 0} / {event.capacity} stalls
                                    </span>
                                </div>
                                {event.description && (
                                    <div className="text-gray-500 mt-2 text-sm line-clamp-2">
                                        {event.description}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit modal popup */}
            {editingEvent && (
                <EditEventModal
                    event={editingEvent}
                    onClose={() => setEditingEvent(null)}
                    onSave={(updatedEvent) => {
                        setEvents((prev) =>
                            prev.map((evt) => (evt._id === updatedEvent._id ? updatedEvent : evt))
                        );
                        setEditingEvent(null);
                    }}
                />
            )}
        </div>
    );
};

export default AdminEventsList;
