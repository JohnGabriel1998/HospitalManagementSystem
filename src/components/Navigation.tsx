import React from 'react';
import { Users, Calendar, UserCheck, Package, Activity, LogOut, Guitar as Hospital } from 'lucide-react';
import { User } from '../types';

interface NavigationProps {
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  user,
  activeTab,
  onTabChange,
  onLogout
}) => {
  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Activity },
      { id: 'patients', label: 'Patients', icon: Users },
      { id: 'appointments', label: 'Appointments', icon: Calendar },
    ];

    if (user.role === 'admin') {
      return [
        ...baseItems,
        { id: 'staff', label: 'Staff', icon: UserCheck },
        { id: 'inventory', label: 'Inventory', icon: Package },
      ];
    }

    if (user.role === 'doctor') {
      return baseItems;
    }

    if (user.role === 'nurse') {
      return [
        baseItems[0], // dashboard
        baseItems[1], // patients
        { id: 'inventory', label: 'Inventory', icon: Package },
      ];
    }

    // receptionist
    return [
      baseItems[0], // dashboard
      baseItems[1], // patients
      baseItems[2], // appointments
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Hospital className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">MedCare Hospital</span>
            </div>
            
            <div className="hidden md:flex space-x-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{user.name}</div>
              <div className="text-xs text-gray-500 capitalize">{user.role}</div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};