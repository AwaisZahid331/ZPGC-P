import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const AdminDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'User Management',
      path: '/admin/users',
      icon: Users
    },
    {
      name: 'Content Management',
      path: '/admin/content',
      icon: FileText
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: Settings
    }
  ];

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
  };

  const NavItem = ({ item, collapsed = false }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    
    return (
      <Link
        to={item.path}
        onClick={closeMobileDrawer}
        className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 group ${
          active
            ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        } ${collapsed ? 'justify-center' : ''}`}
      >
        <Icon className={`h-5 w-5 ${active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
        {!collapsed && (
          <span className="ml-3 font-medium">{item.name}</span>
        )}
        
        {/* Tooltip for collapsed state */}
        {collapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            {item.name}
          </div>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">Zamindar College</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Desktop Drawer */}
      <div className="hidden lg:flex h-screen">
        <div 
          className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col ${
            isDrawerOpen ? 'w-64' : 'w-20'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {isDrawerOpen ? (
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-xs text-gray-500">Zamindar College</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
            )}
            
            <button
              onClick={toggleDrawer}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isDrawerOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <NavItem 
                  key={item.name} 
                  item={item} 
                  collapsed={!isDrawerOpen}
                />
              ))}
            </nav>
          </div>

          {/* User Section */}
          <div className="border-t border-gray-200 p-4">
            <div className={`flex items-center ${isDrawerOpen ? 'space-x-3' : 'justify-center'}`}>
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                A
              </div>
              
              {isDrawerOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">admin@college.edu</p>
                </div>
              )}
              
              <button
                onClick={handleLogout}
                className={`p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ${
                  !isDrawerOpen ? 'absolute bottom-4' : ''
                }`}
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          {/* Your main content goes here */}
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMobileDrawer}
          />
          
          {/* Mobile Drawer */}
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Mobile Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                    <p className="text-xs text-gray-500">Zamindar College</p>
                  </div>
                </div>
                
                <button
                  onClick={closeMobileDrawer}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 overflow-y-auto">
                <nav className="p-4 space-y-2">
                  {navItems.map((item) => (
                    <NavItem key={item.name} item={item} />
                  ))}
                </nav>
              </div>

              {/* Mobile User Section */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">admin@college.edu</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDrawer;