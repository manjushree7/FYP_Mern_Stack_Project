import React from 'react';
import { Calendar, MapPin, Users, Edit, Trash2, Eye } from 'lucide-react';

const EventList = ({ events, onEdit, onDelete, onView, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!events || events.length === 0) {
        return (
            <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">No events found</p>
                <p className="text-gray-500 text-sm mt-2">Create your first event to get started</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isEventActive = (startDate, endDate) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        return now >= start && now <= end;
    };

    const isEventUpcoming = (startDate) => {
        const now = new Date();
        const start = new Date(startDate);
        return start > now;
    };

    const getEventStatus = (startDate, endDate) => {
        if (isEventActive(startDate, endDate)) {
            return { text: 'Active', color: 'bg-green-100 text-green-800' };
        } else if (isEventUpcoming(startDate)) {
            return { text: 'Upcoming', color: 'bg-blue-100 text-blue-800' };
        } else {
            return { text: 'Ended', color: 'bg-gray-100 text-gray-800' };
        }
    };

    return (
        <div className="space-y-4">
            {events.map((event) => {
                const status = getEventStatus(event.startDate, event.endDate);
                const participantCount = event.stallOwners ? event.stallOwners.length : 0;

                return (
                    <div
                        key={event._id}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-semibold text-gray-900">{event.name}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                            {status.text}
                                        </span>
                                    </div>

                                    {event.description && (
                                        <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                                    )}

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            <span>{event.location}</span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <Calendar size={16} />
                                            <span>{formatDate(event.startDate)}</span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <Users size={16} />
                                            <span>{participantCount} participants</span>
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        <span className="font-medium">Duration:</span> {formatDate(event.startDate)} - {formatDate(event.endDate)}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => onView(event)}
                                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                                        title="View Event"
                                    >
                                        <Eye size={18} />
                                    </button>

                                    <button
                                        onClick={() => onEdit(event)}
                                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition-colors"
                                        title="Edit Event"
                                    >
                                        <Edit size={18} />
                                    </button>

                                    <button
                                        onClick={() => onDelete(event._id)}
                                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                                        title="Delete Event"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {event.stallOwners && event.stallOwners.length > 0 && (
                                <div className="border-t pt-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Participants:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {event.stallOwners.slice(0, 3).map((participant, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                            >
                                                {participant.stallName || `Participant ${index + 1}`}
                                            </span>
                                        ))}
                                        {event.stallOwners.length > 3 && (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                +{event.stallOwners.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default EventList;