import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard: React.FC = () => {
  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-lg shadow-lg text-white text-center">
        <h2 className="lg:text-3xl text-xl font-bold">
          User Management Dashboard
        </h2>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-3 w-full md:w-1/3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-4 items-center">
          <select
            className="border p-3 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <Link to="/add">
            <button className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 transition-all">
              + Add User
            </button>
          </Link>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <Skeleton className="w-full h-32 mt-6" />
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base bg-white shadow-lg rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <th className="border-b p-4 font-semibold tracking-wide uppercase">
                  ID
                </th>
                <th className="border-b p-4 font-semibold tracking-wide uppercase">
                  Name
                </th>
                <th className="border-b p-4 font-semibold tracking-wide uppercase">
                  Email
                </th>
                <th className="border-b p-4 font-semibold tracking-wide uppercase">
                  Role
                </th>
                <th className="border-b p-4 font-semibold tracking-wide uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(
                  (user) =>
                    user.name.toLowerCase().includes(search.toLowerCase()) &&
                    (filterRole ? user.role === filterRole : true)
                )
                .map((user, index) => (
                  <tr
                    key={user.id}
                    className={`text-center ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition-colors duration-300`}
                  >
                    <td className="border-b p-4 text-gray-700">{user.id}</td>
                    <td className="border-b p-4 text-gray-700 font-medium">
                      {user.name}
                    </td>
                    <td className="border-b p-4 text-gray-600">{user.email}</td>
                    <td className="border-b p-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full shadow-inner ${
                          user.role === "Admin"
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="border-b p-4 flex justify-center gap-4">
                      <Link to={`/edit/${user.id}`}>
                        <button
                          onClick={() => toast.info("Editing user...")}
                          className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-xl shadow-md hover:from-green-500 hover:to-green-600 transition-transform transform hover:scale-105"
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-xl shadow-md hover:from-red-500 hover:to-red-600 transition-transform transform hover:scale-105"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
