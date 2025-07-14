import React, { useState } from 'react';
import { X, AlertTriangle, MapPin, Phone, User, Clock } from 'lucide-react';

interface EmergencyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (alert: any) => void;
}

export const EmergencyAlertModal: React.FC<EmergencyAlertModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    type: 'medical',
    severity: 'high',
    location: '',
    description: '',
    patientId: '',
    contactPerson: '',
    contactPhone: ''
  });

  const emergencyTypes = [
    { value: 'medical', label: 'Medical Emergency', color: 'text-red-600' },
    { value: 'fire', label: 'Fire Emergency', color: 'text-orange-600' },
    { value: 'security', label: 'Security Alert', color: 'text-purple-600' },
    { value: 'equipment', label: 'Equipment Failure', color: 'text-blue-600' },
    { value: 'other', label: 'Other Emergency', color: 'text-gray-600' }
  ];

  const severityLevels = [
    { value: 'critical', label: 'Critical', color: 'bg-red-600', description: 'Life-threatening situation' },
    { value: 'high', label: 'High', color: 'bg-orange-500', description: 'Urgent attention required' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500', description: 'Important but not urgent' },
    { value: 'low', label: 'Low', color: 'bg-blue-500', description: 'For awareness only' }
  ];

  const locations = [
    'Emergency Room',
    'ICU - Room 101',
    'ICU - Room 102',
    'Surgery Room 1',
    'Surgery Room 2',
    'Pediatric Ward',
    'Maternity Ward',
    'Pharmacy',
    'Laboratory',
    'Radiology',
    'Reception',
    'Parking Lot',
    'Cafeteria',
    'Other'
  ];

  const patients = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Sarah Smith' },
    { id: '3', name: 'Robert Johnson' },
    { id: '4', name: 'Emily Davis' },
    { id: '5', name: 'Michael Brown' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const alert = {
      id: Date.now().toString(),
      type: formData.type,
      severity: formData.severity,
      location: formData.location,
      description: formData.description,
      patientId: formData.patientId || null,
      contactPerson: formData.contactPerson,
      contactPhone: formData.contactPhone,
      timestamp: new Date().toISOString(),
      status: 'active'
    };

    onSubmit(alert);
    onClose();
    
    // Reset form
    setFormData({
      type: 'medical',
      severity: 'high',
      location: '',
      description: '',
      patientId: '',
      contactPerson: '',
      contactPhone: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  const selectedSeverity = severityLevels.find(s => s.value === formData.severity);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-red-50">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-900 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-red-600" />
              Emergency Alert
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-red-700 text-sm mt-2">
            This will immediately notify all relevant staff members
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Emergency Type and Severity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Type *
              </label>
              <div className="space-y-2">
                {emergencyTypes.map(type => (
                  <label key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={(e) => handleChange('type', e.target.value)}
                      className="mr-2"
                    />
                    <span className={`${type.color} font-medium`}>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity Level *
              </label>
              <div className="space-y-2">
                {severityLevels.map(severity => (
                  <label key={severity.value} className="flex items-center">
                    <input
                      type="radio"
                      name="severity"
                      value={severity.value}
                      checked={formData.severity === severity.value}
                      onChange={(e) => handleChange('severity', e.target.value)}
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${severity.color} mr-2`}></div>
                      <div>
                        <span className="font-medium">{severity.label}</span>
                        <p className="text-xs text-gray-500">{severity.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <select
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              <option value="">Select location</option>
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Describe the emergency situation in detail..."
              rows={4}
              required
            />
          </div>

          {/* Patient Information (if medical emergency) */}
          {formData.type === 'medical' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Involved (if applicable)
              </label>
              <select
                value={formData.patientId}
                onChange={(e) => handleChange('patientId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select patient (optional)</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => handleChange('contactPerson', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Person reporting the emergency"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* Alert Preview */}
          {formData.description && (
            <div className={`border-l-4 p-4 rounded-lg ${
              selectedSeverity?.value === 'critical' ? 'bg-red-50 border-red-500' :
              selectedSeverity?.value === 'high' ? 'bg-orange-50 border-orange-500' :
              selectedSeverity?.value === 'medium' ? 'bg-yellow-50 border-yellow-500' :
              'bg-blue-50 border-blue-500'
            }`}>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Alert Preview
              </h4>
              <div className="text-sm space-y-1">
                <div className="flex items-center">
                  <span className="font-medium">Type:</span>
                  <span className="ml-2 capitalize">{formData.type} Emergency</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Severity:</span>
                  <div className="ml-2 flex items-center">
                    <div className={`w-2 h-2 rounded-full ${selectedSeverity?.color} mr-1`}></div>
                    <span className="capitalize">{formData.severity}</span>
                  </div>
                </div>
                {formData.location && (
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{formData.location}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 text-white rounded-lg transition-colors flex items-center space-x-2 ${
                selectedSeverity?.value === 'critical' ? 'bg-red-600 hover:bg-red-700' :
                selectedSeverity?.value === 'high' ? 'bg-orange-600 hover:bg-orange-700' :
                'bg-red-600 hover:bg-red-700'
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Send Emergency Alert</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};