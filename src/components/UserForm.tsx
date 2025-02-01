import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addUser, getUser, updateUser } from "../api";
import { User, Mail, Briefcase } from "lucide-react";

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    if (id) {
      getUser(Number(id)).then(setUser);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateUser(Number(id), user);
    } else {
      await addUser(user);
    }
    navigate("/");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto mt-10">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        {id ? "Edit User" : "Add User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User className="absolute left-3 top-5 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="pl-10 border border-gray-300 p-4 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-5 text-gray-500" size={20} />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="pl-10 border border-gray-300 p-4 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <Briefcase
            className="absolute left-3 top-5 text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            className="pl-10 border border-gray-300 p-4 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 w-full text-lg font-semibold"
        >
          {id ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
