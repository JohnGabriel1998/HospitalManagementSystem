import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search,
  Filter,
  AlertTriangle,
  Clock,
  TrendingDown,
  MapPin,
  DollarSign
} from 'lucide-react';
import { User as UserType, InventoryItem } from '../types';

interface InventoryManagementProps {
  user: UserType;
}

export const InventoryManagement: React.FC<InventoryManagementProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const sampleInventory: InventoryItem[] = [
    {
      id: '1',
      name: 'Insulin Pens',
      category: 'medicine',
      quantity: 45,
      minQuantity: 50,
      price: 25.99,
      supplier: 'MedSupply Corp',
      expiryDate: '2024-12-15',
      location: 'Pharmacy A-12',
      status: 'low-stock'
    },
    {
      id: '2',
      name: 'ECG Machine',
      category: 'equipment',
      quantity: 8,
      minQuantity: 5,
      price: 15000.00,
      supplier: 'Medical Equipment Inc',
      location: 'Equipment Room B-5',
      status: 'in-stock'
    },
    {
      id: '3',
      name: 'Surgical Gloves (Box)',
      category: 'supplies',
      quantity: 120,
      minQuantity: 100,
      price: 12.50,
      supplier: 'SafeGuard Medical',
      location: 'Supply Room C-3',
      status: 'in-stock'
    },
    {
      id: '4',
      name: 'Antibiotics - Amoxicillin',
      category: 'medicine',
      quantity: 0,
      minQuantity: 25,
      price: 45.00,
      supplier: 'PharmaCorp',
      expiryDate: '2024-08-20',
      location: 'Pharmacy A-8',
      status: 'out-of-stock'
    },
    {
      id: '5',
      name: 'Blood Pressure Monitor',
      category: 'equipment',
      quantity: 15,
      minQuantity: 10,
      price: 250.00,
      supplier: 'HealthTech Solutions',
      location: 'Equipment Room B-2',
      status: 'in-stock'
    },
    {
      id: '6',
      name: 'Ibuprofen 200mg',
      category: 'medicine',
      quantity: 5,
      minQuantity: 30,
      price: 8.99,
      supplier: 'Generic Pharma',
      expiryDate: '2024-02-10',
      location: 'Pharmacy A-5',
      status: 'expired'
    }
  ];

  const categories = ['all', 'medicine', 'equipment', 'supplies'];
  const statuses = ['all', 'in-stock', 'low-stock', 'out-of-stock', 'expired'];

  const filteredInventory = sampleInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medicine': return 'bg-blue-100 text-blue-800';
      case 'equipment': return 'bg-purple-100 text-purple-800';
      case 'supplies': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low-stock': return <TrendingDown className="h-4 w-4" />;
      case 'out-of-stock': return <AlertTriangle className="h-4 w-4" />;
      case 'expired': return <Clock className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  if (user.role !== 'admin' && user.role !== 'nurse') {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600">Only administrators and nurses can access inventory management.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
          <p className="text-gray-600">Track and manage medical supplies and equipment</p>
        </div>
        {user.role === 'admin' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Item</span>
          </button>
        )}
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{sampleInventory.length}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {sampleInventory.filter(item => item.status === 'low-stock').length}
              </div>
              <div className="text-sm text-gray-600">Low Stock</div>
            </div>
            <TrendingDown className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">
                {sampleInventory.filter(item => item.status === 'out-of-stock').length}
              </div>
              <div className="text-sm text-gray-600">Out of Stock</div>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">
                ${sampleInventory.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search inventory items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Inventory Items ({filteredInventory.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.supplier}</div>
                        {item.expiryDate && (
                          <div className="text-xs text-gray-400">
                            Expires: {new Date(item.expiryDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{item.quantity}</div>
                      <div className="text-xs text-gray-500">Min: {item.minQuantity}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">${item.price.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                      {item.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1">{item.status.replace('-', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {user.role === 'admin' && (
                        <>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            Restock
                          </button>
                        </>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};