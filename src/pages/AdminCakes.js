import React, { useState, useEffect } from 'react';
import { cakeAPI } from '../services/api';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const AdminCakes = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCake, setEditingCake] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    available: true
  });

  useEffect(() => {
    fetchCakes();
  }, []);

  const fetchCakes = async () => {
    try {
      setLoading(true);
      const response = await cakeAPI.getAll();
      setCakes(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch cakes');
      console.error('Error fetching cakes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCake) {
        await cakeAPI.update(editingCake.id, formData);
      } else {
        await cakeAPI.create(formData);
      }
      setShowForm(false);
      setEditingCake(null);
      resetForm();
      fetchCakes();
    } catch (err) {
      console.error('Error saving cake:', err);
    }
  };

  const handleEdit = (cake) => {
    setEditingCake(cake);
    setFormData({
      name: cake.name,
      description: cake.description,
      price: cake.price.toString(),
      image_url: cake.image_url || '',
      category: cake.category || '',
      available: cake.available
    });
    setShowForm(true);
  };

  const handleDelete = async (cakeId) => {
    if (window.confirm('Are you sure you want to delete this cake?')) {
      try {
        await cakeAPI.delete(cakeId);
        fetchCakes();
      } catch (err) {
        console.error('Error deleting cake:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image_url: '',
      category: '',
      available: true
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading cakes...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Manage Cakes</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingCake(null);
            resetForm();
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Cake</span>
        </button>
      </div>

      {error && (
        <div className="text-center py-4">
          <div className="text-red-600 mb-4">{error}</div>
          <button onClick={fetchCakes} className="btn-primary">
            Try Again
          </button>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editingCake ? 'Edit Cake' : 'Add New Cake'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="Cake name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="input-field"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., Birthday, Wedding"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="input-field"
                placeholder="Describe the cake..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Available for ordering
              </label>
            </div>

            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">
                {editingCake ? 'Update Cake' : 'Add Cake'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCake(null);
                  resetForm();
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cakes List */}
      {cakes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-2xl mb-4">🧁</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No cakes found</h3>
          <p className="text-gray-600">Add your first cake to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cakes.map((cake) => (
            <div key={cake.id} className="card">
              <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                {cake.image_url ? (
                  <img 
                    src={cake.image_url} 
                    alt={cake.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    🧁
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {cake.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    cake.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {cake.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {cake.description}
                </p>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-primary-600">
                    ₹{cake.price}
                  </span>
                  {cake.category && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {cake.category}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(cake)}
                    className="flex-1 btn-secondary flex items-center justify-center space-x-1 text-sm"
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(cake.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center space-x-1"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCakes; 