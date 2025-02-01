import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LayoutDashboard, UserPlus, Settings } from "lucide-react";
import Dashboard from "./components/Dashboard";
import UserForm from "./components/UserForm";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => (
  <div
    className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 transform transition-transform duration-300 ease-in-out z-40
      ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
  >
    <div className="flex items-center justify-between text-2xl font-bold p-4 border-b border-gray-700 md:hidden">
      <span>Admin Panel</span>
      <button
        onClick={toggleSidebar}
        className="text-white focus:outline-none z-50"
      >
        <X size={24} />
      </button>
    </div>
    <nav className="flex-1 p-4 space-y-4">
      <Link
        to="/"
        className="flex items-center p-3 text-lg rounded-lg hover:bg-gray-700 transition"
      >
        <LayoutDashboard className="mr-3" /> Dashboard
      </Link>
      <Link
        to="/add"
        className="flex items-center p-3 text-lg rounded-lg hover:bg-gray-700 transition"
      >
        <UserPlus className="mr-3" /> Add User
      </Link>
      <Link
        to="/settings"
        className="flex items-center p-3 text-lg rounded-lg hover:bg-gray-700 transition"
      >
        <Settings className="mr-3" /> Settings
      </Link>
    </nav>
  </div>
);

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="flex">
        {/* Mobile menu button (only shown when sidebar is closed) */}
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded-lg shadow-lg"
          >
            <Menu size={24} />
          </button>
        )}

        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="md:ml-64 flex-1 bg-gray-100 min-h-screen p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<UserForm />} />
            <Route path="/edit/:id" element={<UserForm />} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
