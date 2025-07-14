import React from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp,
  AlertTriangle,
  Clock,
  UserCheck,
  Package
} from 'lucide-react';
import { User, Patient, Appointment } from '../types';

interface DashboardProps {
  user: User;
  patients: any[];
  appointments: any[];
  onAddPatient?: (patient: Omit<Patient, 'id'>) => void;
  onScheduleAppointment?: (appointment: Omit<Appointment, 'id'>) => void;
  onEmergencyAlert?: () => void;
  onViewInventory?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  patients,
  appointments,
  onAddPatient, 
  onScheduleAppointment, 
  onEmergencyAlert, 
  onViewInventory 
}) => {
  const getMetricsForRole = () => {
    const baseMetrics = [
      { label: 'Total Patients', value: patients.length.toString(), icon: Users, color: 'bg-blue-500' },
      { label: 'Today\'s Appointments', value: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length.toString(), icon: Calendar, color: 'bg-green-500' },
      { label: 'Active Cases', value: '89', icon: Activity, color: 'bg-purple-500' },
    ];

    if (user.role === 'admin') {
      return [
        ...baseMetrics,
        { label: 'Staff on Duty', value: '156', icon: UserCheck, color: 'bg-teal-500' },
        { label: 'Low Stock Items', value: '12', icon: Package, color: 'bg-orange-500' },
        { label: 'Revenue Today', value: '$24,680', icon: TrendingUp, color: 'bg-indigo-500' },
      ];
    }

    if (user.role === 'doctor') {
      return [
        { label: 'My Patients', value: patients.length.toString(), icon: Users, color: 'bg-blue-500' },
        { label: 'Today\'s Appointments', value: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length.toString(), icon: Calendar, color: 'bg-green-500' },
        { label: 'Pending Reviews', value: '5', icon: Activity, color: 'bg-purple-500' },
      ];
    }

    return baseMetrics.slice(0, 3);
  };

  const metrics = getMetricsForRole();

  const recentActivities = [
    { id: 1, action: 'New patient admission', patient: 'John Doe', time: '2 minutes ago', type: 'admission' },
    { id: 2, action: 'Surgery completed', patient: 'Sarah Smith', time: '15 minutes ago', type: 'surgery' },
    { id: 3, action: 'Emergency alert resolved', patient: 'Mike Johnson', time: '1 hour ago', type: 'emergency' },
    { id: 4, action: 'Lab results ready', patient: 'Emma Wilson', time: '2 hours ago', type: 'lab' },
    { id: 5, action: 'Medication refill', patient: 'Robert Brown', time: '3 hours ago', type: 'medication' },
  ];

  const emergencyAlerts = [
    { id: 1, message: 'ICU Bed 12 - Critical patient vitals', severity: 'high', time: '5 min ago' },
    { id: 2, message: 'Pharmacy - Low stock on insulin', severity: 'medium', time: '1 hour ago' },
    { id: 3, message: 'ER - Equipment maintenance due', severity: 'low', time: '2 hours ago' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}
        </h1>
        <p className="text-gray-600">
          Here's what's happening at MedCare Hospital today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Recent Activities
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'emergency' ? 'bg-red-500' :
                    activity.type === 'surgery' ? 'bg-blue-500' :
                    activity.type === 'admission' ? 'bg-green-500' :
                    'bg-gray-400'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">Patient: {activity.patient}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
              Emergency Alerts
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {emergencyAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                  alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                  alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={onAddPatient}
            disabled={user.role !== 'admin' && user.role !== 'receptionist'}
            className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <span className="text-sm font-medium">Add Patient</span>
          </button>
          <button 
            onClick={onScheduleAppointment}
            disabled={user.role !== 'admin' && user.role !== 'receptionist' && user.role !== 'doctor'}
            className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <span className="text-sm font-medium">Schedule Appointment</span>
          </button>
          <button 
            onClick={onEmergencyAlert}
            className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Activity className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <span className="text-sm font-medium">Emergency Alert</span>
          </button>
          <button 
            onClick={onViewInventory}
            disabled={user.role !== 'admin' && user.role !== 'nurse'}
            className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Package className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <span className="text-sm font-medium">View Inventory</span>
          </button>
        </div>
      </div>
    </div>
  );
};