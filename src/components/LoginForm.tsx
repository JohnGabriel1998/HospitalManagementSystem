import React, { useState } from 'react';
import { Guitar as Hospital, Lock, User as UserIcon } from 'lucide-react';
import { User, UserRole } from '../types';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [loading, setLoading] = useState(false);

  const demoUsers: Record<UserRole, User> = {
    admin: {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'admin@medcare.com',
      role: 'admin',
      department: 'Administration'
    },
    doctor: {
      id: '2',
      name: 'Dr. Michael Chen',
      email: 'doctor@medcare.com',
      role: 'doctor',
      department: 'Cardiology'
    },
    nurse: {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'nurse@medcare.com',
      role: 'nurse',
      department: 'Emergency'
    },
    receptionist: {
      id: '4',
      name: 'James Wilson',
      email: 'reception@medcare.com',
      role: 'receptionist',
      department: 'Front Desk'
    }
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin(demoUsers[selectedRole]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Hospital className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">MedCare Hospital</h1>
            <p className="text-gray-600">Hospital Management System</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role to Demo
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(demoUsers).map(([role, user]) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role as UserRole)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedRole === role
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium capitalize">{role}</div>
                    <div className="text-xs text-gray-500 mt-1">{user.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <UserIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">{demoUsers[selectedRole].name}</div>
                  <div className="text-sm text-gray-500">{demoUsers[selectedRole].email}</div>
                  <div className="text-xs text-gray-400 capitalize">
                    {demoUsers[selectedRole].department}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Login as {selectedRole}</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            Demo system - All roles have full access to their respective features
          </div>
        </div>
      </div>
    </div>
  );
};