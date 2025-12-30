import { useEffect, useState } from 'react';
import { User, Menu, X, LogOut } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { Page } from '../types';
import Landing from './Landing';

interface Course {
  id: number;
  name: string;
  teacher: string;
  progress: number; // %
  attendance: number; // %
}

interface Props {
  onNavigate: (page: Page) => void;
}

export default function StudentDashboard({ onNavigate }: Props) {
  const [user, setUser] = useState<any>(null);
  const [currentSubPage, setCurrentSubPage] = useState<Page>('landing');
  const [courses, setCourses] = useState<Course[]>([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        const parsedUser = JSON.parse(saved);
        setUser(parsedUser);

        // Load courses for this student (example mock)
        setCourses([
          { id: 1, name: 'AI Powered Learning', teacher: 'Dr. Fariha', progress: 65, attendance: 90 },
          { id: 2, name: 'Interactive Video Ecosystem', teacher: 'Mr. Ali', progress: 40, attendance: 85 },
          { id: 3, name: 'Web Development', teacher: 'Ms. Sara', progress: 80, attendance: 95 },
        ]);
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Logout function - FIXED
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowProfileMenu(false); // Close profile menu
    onNavigate('login'); // This should work properly now
  };

  // Render subpages based on header navigation
  const renderSubPage = () => {
    switch (currentSubPage) {
      case 'landing':
        return <Landing onNavigate={onNavigate} />;

      case 'courses':
        return (
          <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">My Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h2 className="text-xl font-semibold text-gray-800">{course.name}</h2>
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Teacher:</span> {course.teacher}
                    </p>
                    <div>
                      <p className="text-gray-600 mb-1">
                        <span className="font-medium">Progress:</span> {course.progress}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-teal-600 h-2.5 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">
                        <span className="font-medium">Attendance:</span> {course.attendance}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${course.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      // Course details button functionality
                      alert(`Viewing details for ${course.name}`);
                    }}
                    className="mt-6 w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'instructor':
        return (
          <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Instructor Information</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{course.teacher}</h3>
                      <p className="text-gray-600 mt-1">{course.name}</p>
                      <div className="mt-3">
                        <p className="text-sm text-gray-500">Course Progress</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{course.progress}%</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          // Contact instructor button functionality
                          alert(`Contacting ${course.teacher} about ${course.name}`);
                        }}
                        className="mt-4 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                      >
                        Contact Instructor
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold mb-2">Contact / Complaint</h1>
              <p className="text-gray-600 mb-6">We're here to help. Please fill out the form below.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Message sent successfully! Our team will contact you within 24 hours.');
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your name" 
                      defaultValue={user?.name || ''}
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      defaultValue={user?.email || ''}
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    placeholder="What is this regarding?" 
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    placeholder="Please describe your issue or question..." 
                    rows={5} 
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        );

      default:
        return <Landing onNavigate={onNavigate} />;
    }
  };

  // Profile management component
  const ProfileManagement = () => (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
          <User className="w-10 h-10 text-teal-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user?.name || 'Student'}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-sm text-teal-600 font-medium">{user?.role}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-3">Account Settings</h3>
          <div className="space-y-2">
            <button 
              onClick={() => {
                alert('Edit Profile clicked');
                setShowProfileMenu(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition"
            >
              Edit Profile
            </button>
            <button 
              onClick={() => {
                alert('Change Password clicked');
                setShowProfileMenu(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition"
            >
              Change Password
            </button>
            <button 
              onClick={() => {
                alert('Notification Settings clicked');
                setShowProfileMenu(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition"
            >
              Notification Settings
            </button>
            <button 
              onClick={() => {
                alert('Privacy Settings clicked');
                setShowProfileMenu(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition"
            >
              Privacy Settings
            </button>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-3">Enrollment Details</h3>
          <div className="space-y-2">
            {courses.slice(0, 2).map(course => (
              <div key={course.id} className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded">
                <span className="font-medium">{course.name}</span>
                <span className="text-sm text-teal-600">{course.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Main Header (Fixed position) */}
      <header className="sticky top-0 z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name || 'Student'}!</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setCurrentSubPage('landing')}
                className={`px-4 py-2 rounded-lg ${currentSubPage === 'landing' ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentSubPage('courses')}
                className={`px-4 py-2 rounded-lg ${currentSubPage === 'courses' ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                My Courses
              </button>
              <button
                onClick={() => setCurrentSubPage('instructor')}
                className={`px-4 py-2 rounded-lg ${currentSubPage === 'instructor' ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Instructors
              </button>
              <button
                onClick={() => setCurrentSubPage('contact')}
                className={`px-4 py-2 rounded-lg ${currentSubPage === 'contact' ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Contact
              </button>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Profile icon with dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-teal-600" />
                  </div>
                  <span className="hidden md:inline font-medium">{user?.name?.split(' ')[0] || 'Profile'}</span>
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50">
                    <div className="p-4 border-b">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <button 
                        onClick={() => {
                          alert('My Profile clicked');
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50"
                      >
                        My Profile
                      </button>
                      <button 
                        onClick={() => {
                          alert('Settings clicked');
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50"
                      >
                        Settings
                      </button>
                      <button 
                        onClick={logout}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setCurrentSubPage('landing');
                    setShowMobileMenu(false);
                  }}
                  className={`px-4 py-3 rounded-lg ${currentSubPage === 'landing' ? 'bg-teal-600 text-white' : 'bg-gray-100'}`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setCurrentSubPage('courses');
                    setShowMobileMenu(false);
                  }}
                  className={`px-4 py-3 rounded-lg ${currentSubPage === 'courses' ? 'bg-teal-600 text-white' : 'bg-gray-100'}`}
                >
                  My Courses
                </button>
                <button
                  onClick={() => {
                    setCurrentSubPage('instructor');
                    setShowMobileMenu(false);
                  }}
                  className={`px-4 py-3 rounded-lg ${currentSubPage === 'instructor' ? 'bg-teal-600 text-white' : 'bg-gray-100'}`}
                >
                  Instructors
                </button>
                <button
                  onClick={() => {
                    setCurrentSubPage('contact');
                    setShowMobileMenu(false);
                  }}
                  className={`px-4 py-3 rounded-lg ${currentSubPage === 'contact' ? 'bg-teal-600 text-white' : 'bg-gray-100'}`}
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* If profile menu is open, show profile management */}
        {showProfileMenu && (
          <div className="max-w-7xl mx-auto p-6">
            <ProfileManagement />
          </div>
        )}
        
        {/* Regular subpage content */}
        {!showProfileMenu && renderSubPage()}
      </main>

      {/* Logout Button (Alternative position - only shows when profile menu is NOT open) */}
      {user && !showProfileMenu && (
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={logout}
            className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center justify-center space-x-2 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}