import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  FileText,
  Image,
  Video,
  Upload,
  Save,
  X,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: '',
    status: 'draft',
    image: null
  });

  useEffect(() => {
    // Simulate data loading
    setEvents([
      {
        id: 1,
        title: 'Annual Sports Day 2024',
        description: 'Join us for the biggest sports event of the year with competitions in cricket, football, and athletics.',
        date: '2024-03-15',
        category: 'Sports',
        status: 'published',
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        views: 245,
        createdAt: '2024-01-05'
      },
      {
        id: 2,
        title: 'Science Exhibition 2024',
        description: 'Students showcase their innovative projects and scientific experiments.',
        date: '2024-02-20',
        category: 'Academic',
        status: 'published',
        image: 'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        views: 189,
        createdAt: '2024-01-10'
      },
      {
        id: 3,
        title: 'Cultural Festival 2024',
        description: 'A celebration of diverse cultures with music, dance, and traditional performances.',
        date: '2024-04-10',
        category: 'Cultural',
        status: 'draft',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        views: 0,
        createdAt: '2024-01-15'
      }
    ]);

    setNotices([
      {
        id: 1,
        title: 'Mid-term Examination Schedule',
        description: 'Important notice regarding the upcoming mid-term examinations for all students.',
        date: '2024-01-20',
        category: 'Academic',
        status: 'published',
        priority: 'high',
        views: 456,
        createdAt: '2024-01-08'
      },
      {
        id: 2,
        title: 'Library Hours Update',
        description: 'New library timings effective from next week.',
        date: '2024-01-25',
        category: 'General',
        status: 'published',
        priority: 'medium',
        views: 123,
        createdAt: '2024-01-12'
      },
      {
        id: 3,
        title: 'Fee Submission Deadline',
        description: 'Reminder for students to submit their semester fees before the deadline.',
        date: '2024-02-01',
        category: 'Financial',
        status: 'draft',
        priority: 'high',
        views: 0,
        createdAt: '2024-01-18'
      }
    ]);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'draft': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'archived': return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateNew = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      category: '',
      status: 'draft',
      image: null
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      date: item.date,
      category: item.category,
      status: item.status,
      image: item.image
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingItem) {
      // Update existing item
      if (activeTab === 'events') {
        setEvents(events.map(event => 
          event.id === editingItem.id 
            ? { ...event, ...formData }
            : event
        ));
      } else {
        setNotices(notices.map(notice => 
          notice.id === editingItem.id 
            ? { ...notice, ...formData }
            : notice
        ));
      }
    } else {
      // Create new item
      const newItem = {
        id: Date.now(),
        ...formData,
        views: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      if (activeTab === 'events') {
        setEvents([...events, newItem]);
      } else {
        setNotices([...notices, newItem]);
      }
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (activeTab === 'events') {
        setEvents(events.filter(event => event.id !== id));
      } else {
        setNotices(notices.filter(notice => notice.id !== id));
      }
    }
  };

  const renderContentList = () => {
    const items = activeTab === 'events' ? events : notices;
    
    return (
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    <span className="ml-1 capitalize">{item.status}</span>
                  </span>
                  {item.priority && (
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority} priority
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{item.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{item.views} views</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {item.image && (
              <div className="mt-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-1">Manage events, notices, and other content</p>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="lg:ml-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
              <p className="text-gray-600 mt-1">Manage events, notices, and other content</p>
            </div>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create New</span>
            </button>
          </div>
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('events')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'events'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Events</span>
                  <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {events.length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('notices')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notices'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Notices</span>
                  <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {notices.length}
                  </span>
                </div>
              </button>
            </nav>
          </div>
        </div>

          {/* Content List */}
          {renderContentList()}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingItem ? 'Edit Content' : 'Create New Content'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter title..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter description..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      <option value="Academic">Academic</option>
                      <option value="Sports">Sports</option>
                      <option value="Cultural">Cultural</option>
                      <option value="General">General</option>
                      <option value="Financial">Financial</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter image URL..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
