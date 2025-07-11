// src/page/StallOwnerEvents.jsx
import React, { useEffect, useState } from 'react';
import api from '../utlis/api';
import { toast } from 'react-toastify';
import useStore from '../zustand/store';

const StallOwnerEvents = () => {
    const user = useStore((state) => state.user);
    const stallOwnerId = user?.id || '';

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState();

    const fetchEvents = async () => {
        try {
            const res = await api.get('/events');
            setEvents(res.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = async (eventId) => {
        if (!stallOwnerId) {
            toast.error('You must be logged in to join an event');
            return;
        }
        setJoining(eventId);
        try {
            await api.post(`/events/${eventId}/join`);
            toast.success('Joined event successfully!');
            setEvents((prev) =>
                prev.map((ev) =>
                    ev._id === eventId
                        ? { ...ev, stallOwners: [...(ev.stallOwners || []), stallOwnerId] }
                        : ev
                )
            );
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to join event');
        } finally {
            setJoining(null);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-green-700">Available Events</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading events...</p>
            ) : events.length === 0 ? (
                <p className="text-center text-gray-500">No events available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map((event) => {
                        const joined = event.stallOwners?.some(
                            (id) => id === stallOwnerId || id.toString() === stallOwnerId
                        );
                        const capacityFull = (event.stallOwners?.length || 0) >= event.capacity;

                        return (
                            <div
                                key={event._id}
                                className="bg-green-50 border border-green-100 p-5 rounded-xl shadow hover:shadow-md transition"
                            >
                                <h2 className="text-xl font-semibold text-green-800 mb-1">{event.name}</h2>
                                <p className="text-gray-700 mb-1">📍 {event.location}</p>
                                <p className="text-gray-600 mb-2">
                                    {new Date(event.startDate).toLocaleDateString()} -{' '}
                                    {new Date(event.endDate).toLocaleDateString()}
                                </p>
                                <p className="mb-3 font-medium text-sm text-green-700">
                                    Participants: {event.stallOwners?.length || 0} / {event.capacity}
                                </p>

                                <button
                                    disabled={joined || capacityFull || joining === event._id}
                                    onClick={() => handleJoin(event._id)}
                                    className={`w-full py-2 rounded-md font-semibold transition text-white ${joined
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : capacityFull
                                                ? 'bg-red-500 cursor-not-allowed'
                                                : 'bg-green-500 hover:bg-green-600'
                                        }`}
                                >
                                    {joining === event._id
                                        ? 'Joining...'
                                        : joined
                                            ? 'Already Joined'
                                            : capacityFull
                                                ? 'Full'
                                                : 'Join Event'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StallOwnerEvents;
