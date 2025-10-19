import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminNavbar from "./pages/Admin/AdminNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AutoRedirect from "./components/AutoRedirect";

// User Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EmailVerification from "./pages/EmailVerification";
import Faculty from "./pages/User/The College/Faculty/Faculty";
import History from "./pages/User/The College/History/History";
import Prospectus from "./pages/User/The College/Prostectus/Prospectus";
import Principals from "./pages/User/The College/Principals/Principals";
import RuleRegulation from "./pages/User/The College/Rules/RuleRegulation";
import Time from "./pages/User/The College/TimeTable/Time";
import NoticePeriod from "./pages/User/News/Notice/NoticePeriod";
import Events from "./pages/User/News/Events/Events";
import UniversityPosition from "./pages/User/Academic/University/UniversityPosition";
import BoardPosition from "./pages/User/Academic/Board/BoardPosition";
import FeeSubmission from "./pages/User/Fee Submission/FeeSubmission";
import UserDashboard from "./pages/User/Dashboard/UserDashboard";
import UserProfile from "./pages/User/Profile/UserProfile";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import ContentManagement from "./pages/Admin/ContentManagement";
import Register from "./pages/Admin/Register";
import Settings from "./pages/Admin/Settings";

// ✅ Layouts
const UserLayout = ({ children }) => (
  <div>
    <Navbar />
    {children}
    <Footer />
  </div>
);

const AdminLayout = ({ children }) => (
  <div className="flex h-screen">
    <AdminNavbar />
    <div className="flex-1 overflow-auto">{children}</div>
  </div>
);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Router>
        <Routes>
        {/* User Routes */}
        <Route
          path="/"
          element={
            <UserLayout>
              <AutoRedirect />
              <Home />
              <About />
              <Contact />
            </UserLayout>
          }
        />
        <Route
          path="/faculty"
          element={
            <UserLayout>
              <Faculty />
            </UserLayout>
          }
        />
        <Route
          path="/history"
          element={
            <UserLayout>
              <History />
            </UserLayout>
          }
        />
        <Route
          path="/prospectus"
          element={
            <UserLayout>
              <Prospectus />
            </UserLayout>
          }
        />
        <Route
          path="/principals"
          element={
            <UserLayout>
              <Principals />
            </UserLayout>
          }
        />
        <Route
          path="/rules"
          element={
            <UserLayout>
              <RuleRegulation />
            </UserLayout>
          }
        />
        <Route
          path="/timetable"
          element={
            <UserLayout>
              <Time />
            </UserLayout>
          }
        />
        <Route
          path="/notice-board"
          element={
            <UserLayout>
              <NoticePeriod />
            </UserLayout>
          }
        />
        <Route
          path="/events-gallery"
          element={
            <UserLayout>
              <Events />
            </UserLayout>
          }
        />
        <Route
          path="/university-position"
          element={
            <UserLayout>
              <UniversityPosition />
            </UserLayout>
          }
        />
        <Route
          path="/bpard-position"
          element={
            <UserLayout>
              <BoardPosition />
            </UserLayout>
          }
        />
        <Route
          path="/fee-submission"
          element={
            <UserLayout>
              <FeeSubmission />
            </UserLayout>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-email"
          element={<EmailVerification />}
        />

        {/* Admin Routes */}
        {/* /admin pe sirf Register page */}
        <Route path="/admin" element={<Register />} />

        {/* Baaki Admin pages AdminLayout ke sath */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/content"
          element={
            <AdminLayout>
              <ContentManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/register"
          element={
            <AdminLayout>
              <Register />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <Settings />
            </AdminLayout>
          }
        />
        </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
