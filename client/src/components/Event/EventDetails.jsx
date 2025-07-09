import React from 'react';
import { Calendar, MapPin, Users, Clock, FileText, X, Edit } from 'lucide-react';

const EventDetails = ({ event, onClose, onEdit }) => {
    if (!event) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calculateDuration = () => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return '1 day';
        } else if (diffDays < 7) {
            return `${diffDays} days`;
        } else {
            const weeks = Math.floor(diffDays / 7);
            const remainingDays = diffDays % 7;
            return `${weeks} week${weeks > 1 ? 's' : ''}${remainingDays > 0 ? ` ${remainingDays} day${remainingDays > 1 ? 's' : ''}` : ''}`;
        }
    };

    const getEventStatus = () => {
        const now = new Date();
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);

        if (now >= start && now <= end) {
            return { text: 'Active', color: 'bg-green-100 text-green-800 border-green-200' };
        } else if (start > now) {
            return { text: 'Upcoming', color: 'bg-blue-100 text-blue-800 border-blue-200' };
        } else {
            return { text: 'Ended', color: 'bg-gray-100 text-gray-800 border-gray-200' };
        }
    };

    const status = getEventStatus();
    const participantCount = event.stallOwners ? event.stallOwners.length : 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-lg">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold text-gray-900">{event.name}</h2>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${status.color}`}>
                                    {status.text}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                            <button
                                onClick={() => onEdit(event)}
                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                                title="Edit Event"
                            >
                                <Edit size={20} />
                            </button>

                            <button
                                onClick={onClose}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                                title="Close"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {event.description && (
                        <div>
                            <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                                <FileText className="mr-2" size={20} />
                                Description
                            </h3>
                            <p className="text-gray-600 leading-relaxed">{event.description}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                                <MapPin className="mr-2" size={20} />
                                Location
                            </h3>
                            <p className="text-gray-600">{event.location}</p>
                        </div>

                        <div>
                            <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                                <Clock className="mr-2" size={20} />
                                Duration
                            </h3>
                            <p className="text-gray-600">{calculateDuration()}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                            <Calendar className="mr-2" size={20} />
                            Schedule
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">Start Date:</span>
                                <span className="text-gray-900">{formatDate(event.startDate)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">End Date:</span>
                                <span className="text-gray-900">{formatDate(event.endDate)}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                            <Users className="mr-2" size={20} />
                            Participants ({participantCount})
                        </h3>

                        {participantCount > 0 ? (
                            <div className="space-y-2">
                                {event.stallOwners.map((participant, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {participant.stallName || `Participant ${index + 1}`}
                                            </p>
                                            {participant.location && (
                                                <p className="text-sm text-gray-600">{participant.location}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <Users className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                                <p>No participants yet</p>
                                <p className="text-sm">Participants will appear here when they join the event</p>
                            </div>
                        )}
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-sm text-gray-500">
                            Event created on: {new Date(event.createdAt || Date.now()).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;