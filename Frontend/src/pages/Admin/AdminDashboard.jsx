import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalFees: 0,
    pendingApplications: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Simulate data loading
    setStats({
      totalUsers: 1247,
      totalEvents: 23,
      totalFees: 156000,
      pendingApplications: 8
    });

    setRecentActivities([
      { id: 1, type: 'user', message: 'New student registration: Ahmad Ali', time: '2 hours ago', status: 'success' },
      { id: 2, type: 'fee', message: 'Fee payment received: Rs. 15,000', time: '3 hours ago', status: 'success' },
      { id: 3, type: 'event', message: 'New event created: Annual Sports Day', time: '5 hours ago', status: 'info' },
      { id: 4, type: 'application', message: 'Admission application pending review', time: '1 day ago', status: 'warning' },
      { id: 5, type: 'user', message: 'User profile updated: Sara Khan', time: '2 days ago', status: 'info' }
    ]);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getStatusIcon = (status) => {
      switch (status) {
        case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
        case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
        case 'info': return <Clock className="h-4 w-4 text-blue-500" />;
        default: return <Clock className="h-4 w-4 text-gray-500" />;
      }
    };

    return (
      <div className="flex items-start space-x-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
        {getStatusIcon(activity.status)}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">{activity.message}</p>
          <p className="text-xs text-gray-500">{activity.time}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your college.</p>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="lg:ml-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your college.</p>
          </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={stats.totalUsers.toLocaleString()}
            icon={Users}
            color="bg-blue-500"
            change={12}
          />
          <StatCard
            title="Active Events"
            value={stats.totalEvents}
            icon={Calendar}
            color="bg-green-500"
            change={8}
          />
          <StatCard
            title="Total Fees Collected"
            value={`Rs. ${stats.totalFees.toLocaleString()}`}
            icon={DollarSign}
            color="bg-yellow-500"
            change={15}
          />
          <StatCard
            title="Pending Applications"
            value={stats.pendingApplications}
            icon={AlertCircle}
            color="bg-red-500"
            change={-5}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-1">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Add New Student</span>
                </button>
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Create Event</span>
                </button>
                <button className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Generate Report</span>
                </button>
                <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Status</span>
                  <span className="flex items-center text-green-600 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="flex items-center text-green-600 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Backup</span>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
