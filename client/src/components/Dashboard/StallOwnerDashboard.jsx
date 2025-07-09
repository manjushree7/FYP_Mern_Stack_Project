import React, { useEffect, useState } from 'react';
import api from '../../utlis/api.js';
import { PackageCheck, Store, CalendarCheck, Loader2 } from 'lucide-react';

const StallOwnerDashboard = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [stallCount, setStallCount] = useState(0);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [ordersRes, stallsRes, eventsRes] = await Promise.all([
          api.get('/orders/stallowner/all'),
          api.get('/admin/stalls/count'),
          api.get('/events'),
        ]);

        const now = new Date();
        const ongoing = eventsRes.data.filter(event => new Date(event.startDate) <= now && new Date(event.endDate) >= now);
        const upcoming = eventsRes.data.filter(event => new Date(event.startDate) > now);

        setPendingOrders(ordersRes.data.filter(order => order.status === 'pending'));
        setStallCount(stallsRes.data.count);
        setOngoingEvents(ongoing);
        setUpcomingEvents(upcoming);
      } catch (err) {
        console.error('Dashboard fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-6 h-6 animate-spin text-green-600" />
        <span className="ml-2 text-gray-700">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-700">Stall Owner Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <DashboardCard
          title="Pending Orders"
          value={pendingOrders.length}
          icon={<PackageCheck className="w-6 h-6 text-green-600" />}
          color="text-green-600"
        />
        <DashboardCard
          title="Total Stalls"
          value={stallCount}
          icon={<Store className="w-6 h-6 text-blue-600" />}
          color="text-blue-600"
        />
        <DashboardCard
          title="Ongoing Events"
          value={ongoingEvents.length}
          icon={<CalendarCheck className="w-6 h-6 text-orange-500" />}
          color="text-orange-500"
        />
      </div>

      {/* Upcoming Events */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📅 Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-500">No upcoming events.</p>
        ) : (
          <ul className="space-y-3">
            {upcomingEvents.map(event => (
              <li key={event._id} className="border-l-4 border-green-500 pl-4">
                <p className="text-gray-800 font-medium">{event.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(event.startDate).toLocaleDateString()} → {new Date(event.endDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon, color }) => (
  <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
    <div className="p-3 bg-gray-100 rounded-full">
      {icon}
    </div>
    <div>
      <h4 className="text-gray-600 text-sm font-medium">{title}</h4>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  </div>
);

export default StallOwnerDashboard;
