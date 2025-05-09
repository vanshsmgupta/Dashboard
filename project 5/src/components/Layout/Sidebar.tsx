import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, Clock, DollarSign, Users, Settings, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, children, isActive, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        flex items-center px-3 py-2 rounded-md mb-1 transition-colors
        ${isActive 
          ? 'bg-blue-100 text-blue-700' 
          : 'text-gray-700 hover:bg-gray-100'
        }
      `}
    >
      <span className="mr-3">{icon}</span>
      <span>{children}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, isMarketer } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const isPathActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const marketerLinks = [
    { path: '/marketer/dashboard', icon: <Home size={18} />, label: 'Dashboard' },
    { path: '/marketer/schedule', icon: <Calendar size={18} />, label: 'Schedule' },
    { path: '/marketer/offers', icon: <DollarSign size={18} />, label: 'Offers' },
    { path: '/marketer/users', icon: <Users size={18} />, label: 'Users' },
  ];

  const userLinks = [
    { path: '/user/dashboard', icon: <Home size={18} />, label: 'Dashboard' },
    { path: '/user/timesheet', icon: <Clock size={18} />, label: 'Timesheet' },
    { path: '/user/offers', icon: <DollarSign size={18} />, label: 'My Offers' },
    { path: '/user/calendar', icon: <Calendar size={18} />, label: 'Calendar' },
    { path: '/user/profile', icon: <UserCircle size={18} />, label: 'Profile' },
  ];

  const links = isMarketer() ? marketerLinks : userLinks;

  return (
    <div 
      className={`
        w-64 h-screen bg-white border-r border-gray-200 py-6 flex flex-col fixed
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => window.innerWidth < 1024 && setIsOpen(false)}
    >
      <div className="px-4 mb-6">
        <h1 className="text-xl font-bold text-blue-700">
          {isMarketer() ? 'Marketer Portal' : 'User Portal'}
        </h1>
      </div>
      
      <div className="flex-1 px-4">
        <nav className="space-y-1">
          {links.map((link) => (
            <SidebarLink
              key={link.path}
              to={link.path}
              icon={link.icon}
              isActive={isPathActive(link.path)}
              onClick={handleLinkClick}
            >
              {link.label}
            </SidebarLink>
          ))}
        </nav>
      </div>
      
      <div className="px-4 mt-6 pt-6 border-t border-gray-200">
        <SidebarLink
          to="/settings"
          icon={<Settings size={18} />}
          isActive={isPathActive('/settings')}
          onClick={handleLinkClick}
        >
          Settings
        </SidebarLink>
        
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 w-full transition-colors"
        >
          <span className="mr-3"><LogOut size={18} /></span>
          <span>Logout</span>
        </button>
      </div>
      
      <div className="px-4 mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center">
          <img
            src={currentUser?.avatar || 'https://i.pravatar.cc/150?u=default'}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium">{currentUser?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{currentUser?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;