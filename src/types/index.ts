export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  address: string;
  bloodType: string;
  allergies: string[];
  medicalHistory: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  lastVisit: string;
  status: 'active' | 'discharged' | 'critical';
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: 'consultation' | 'follow-up' | 'surgery' | 'emergency';
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  notes?: string;
  duration: number;
}

export interface Staff {
  id: string;
  name: string;
  role: UserRole;
  department: string;
  specialization?: string;
  phone: string;
  email: string;
  shift: 'morning' | 'evening' | 'night';
  status: 'active' | 'on-leave' | 'off-duty';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'medicine' | 'equipment' | 'supplies';
  quantity: number;
  minQuantity: number;
  price: number;
  supplier: string;
  expiryDate?: string;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
}