import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { PatientManagement } from './components/PatientManagement';
import { AppointmentManagement } from './components/AppointmentManagement';
import { StaffManagement } from './components/StaffManagement';
import { InventoryManagement } from './components/InventoryManagement';
import { LoginForm } from './components/LoginForm';
import { AddPatientModal } from './components/AddPatientModal';
import { ScheduleAppointmentModal } from './components/ScheduleAppointmentModal';
import { EmergencyAlertModal } from './components/EmergencyAlertModal';
import { UserRole, User, Patient, Appointment } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showScheduleAppointmentModal, setShowScheduleAppointmentModal] = useState(false);
  const [showEmergencyAlertModal, setShowEmergencyAlertModal] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Doe',
      age: 45,
      gender: 'male',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      address: '123 Main St, City, State 12345',
      bloodType: 'A+',
      allergies: ['Penicillin', 'Shellfish'],
      medicalHistory: 'Hypertension, Diabetes Type 2',
      emergencyContact: {
        name: 'Jane Doe',
        phone: '+1 (555) 987-6543',
        relationship: 'Wife'
      },
      lastVisit: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      age: 32,
      gender: 'female',
      phone: '+1 (555) 234-5678',
      email: 'sarah.smith@email.com',
      address: '456 Oak Ave, City, State 12345',
      bloodType: 'O-',
      allergies: ['Latex'],
      medicalHistory: 'Asthma, Migraine',
      emergencyContact: {
        name: 'Mike Smith',
        phone: '+1 (555) 876-5432',
        relationship: 'Husband'
      },
      lastVisit: '2024-01-18',
      status: 'active'
    },
    {
      id: '3',
      name: 'Robert Johnson',
      age: 67,
      gender: 'male',
      phone: '+1 (555) 345-6789',
      email: 'robert.j@email.com',
      address: '789 Pine St, City, State 12345',
      bloodType: 'B+',
      allergies: ['None known'],
      medicalHistory: 'Heart Disease, High Cholesterol',
      emergencyContact: {
        name: 'Mary Johnson',
        phone: '+1 (555) 765-4321',
        relationship: 'Daughter'
      },
      lastVisit: '2024-01-20',
      status: 'critical'
    }
  ]);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientId: '1',
      doctorId: '2',
      date: new Date().toISOString().split('T')[0], // Today's date
      time: '09:00',
      type: 'consultation',
      status: 'scheduled',
      notes: 'Regular checkup',
      duration: 30
    },
    {
      id: '2',
      patientId: '2',
      doctorId: '2',
      date: new Date().toISOString().split('T')[0], // Today's date
      time: '10:30',
      type: 'follow-up',
      status: 'in-progress',
      notes: 'Follow up on recent surgery',
      duration: 45
    },
    {
      id: '3',
      patientId: '3',
      doctorId: '2',
      date: new Date().toISOString().split('T')[0], // Today's date
      time: '14:00',
      type: 'surgery',
      status: 'scheduled',
      notes: 'Cardiac procedure',
      duration: 120
    },
    {
      id: '4',
      patientId: '1',
      doctorId: '2',
      date: new Date().toISOString().split('T')[0], // Today's date
      time: '16:30',
      type: 'emergency',
      status: 'completed',
      notes: 'Emergency consultation',
      duration: 20
    }
  ]);
  const [emergencyAlerts, setEmergencyAlerts] = useState<any[]>([]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const handleAddPatient = (patientData: Omit<Patient, 'id'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString()
    };
    setPatients(prev => [...prev, newPatient]);
    setShowAddPatientModal(false);
    
    // Show success notification (you could implement a toast system)
    alert(`Patient ${newPatient.name} has been successfully added to the system.`);
  };

  const handleScheduleAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    console.log('Received appointment data:', appointmentData);
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString()
    };
    console.log('Creating new appointment:', newAppointment);
    setAppointments(prev => [...prev, newAppointment]);
    setShowScheduleAppointmentModal(false);
    
    // Show success notification
    alert(`Appointment has been successfully scheduled for ${appointmentData.date} at ${appointmentData.time}.`);
  };

  const handleEmergencyAlert = (alertData: any) => {
    setEmergencyAlerts(prev => [...prev, alertData]);
    setShowEmergencyAlertModal(false);
    
    // Show emergency notification
    alert(`Emergency alert has been sent to all relevant staff members. Alert ID: ${alertData.id}`);
  };

  const handleQuickActions = {
    addPatient: () => {
      if (currentUser?.role === 'admin' || currentUser?.role === 'receptionist') {
        setShowAddPatientModal(true);
      }
    },
    scheduleAppointment: () => {
      if (currentUser?.role === 'admin' || currentUser?.role === 'receptionist' || currentUser?.role === 'doctor') {
        setShowScheduleAppointmentModal(true);
      }
    },
    emergencyAlert: () => {
      setShowEmergencyAlertModal(true);
    },
    viewInventory: () => {
      if (currentUser?.role === 'admin' || currentUser?.role === 'nurse') {
        setActiveTab('inventory');
      }
    }
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            user={currentUser} 
            patients={patients}
            appointments={appointments}
            onAddPatient={handleQuickActions.addPatient}
            onScheduleAppointment={handleQuickActions.scheduleAppointment}
            onEmergencyAlert={handleQuickActions.emergencyAlert}
            onViewInventory={handleQuickActions.viewInventory}
          />
        );
      case 'patients':
        return <PatientManagement user={currentUser} patients={patients} />;
      case 'appointments':
        return <AppointmentManagement user={currentUser} appointments={appointments} patients={patients} />;
      case 'staff':
        return <StaffManagement user={currentUser} />;
      case 'inventory':
        return <InventoryManagement user={currentUser} />;
      default:
        return <Dashboard user={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        user={currentUser} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />
      <main className="pt-16">
        {renderContent()}
      </main>
      
      {/* Modals */}
      <AddPatientModal
        isOpen={showAddPatientModal}
        onClose={() => setShowAddPatientModal(false)}
        onSubmit={handleAddPatient}
      />
      
      <ScheduleAppointmentModal
        isOpen={showScheduleAppointmentModal}
        onClose={() => setShowScheduleAppointmentModal(false)}
        onSubmit={handleScheduleAppointment}
        patients={patients}
      />
      
      <EmergencyAlertModal
        isOpen={showEmergencyAlertModal}
        onClose={() => setShowEmergencyAlertModal(false)}
        onSubmit={handleEmergencyAlert}
      />
    </div>
  );
}

export default App;