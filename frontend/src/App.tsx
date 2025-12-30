import { useState } from 'react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Courses from './pages/Courses';           // ← NAYA ADD
import Instructor from './pages/Instructor';     // ← NAYA ADD
import Contact from './pages/Contact';           // ← NAYA ADD
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Types
import type { Page } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<any>(null);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    // Optional: page change hone pe top pe scroll kar jaye
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hideLayout =
    currentPage === 'login' ||
    currentPage === 'signup' ||
    currentPage === 'studentDashboard' ||
    currentPage === 'instructorDashboard' ||
    currentPage === 'coursedetails' ||
    currentPage === 'adminDashboard';

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      {!hideLayout && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      {/* ROUTING */}
      {currentPage === 'landing' && <Landing onNavigate={handleNavigate} />}

      {currentPage === 'login' && (
        <Login onNavigate={handleNavigate} setUser={setUser} />
      )}

      {currentPage === 'signup' && (
        <Signup onNavigate={handleNavigate} />
      )}

      {/* NAYE PAGES ADD */}
      {currentPage === 'courses' && <Courses onNavigate={handleNavigate} />}
      {currentPage === 'instructor' && <Instructor onNavigate={handleNavigate} />}
      {currentPage === 'contact' && <Contact onNavigate={handleNavigate} />}

      {currentPage === 'studentDashboard' && <StudentDashboard />}
      {currentPage === 'instructorDashboard' && <InstructorDashboard />}
      {currentPage === 'adminDashboard' && <AdminDashboard />}

      {/* FOOTER */}
      {!hideLayout && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;