import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalBookings: 0, totalRevenue: 0 });

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/stats", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => setStats(res.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <div className="bg-white p-4 shadow rounded mb-4">
          <p className="text-lg font-medium">Total Bookings: {stats.totalBookings}</p>
          <p className="text-lg font-medium">Total Revenue: ₹{stats.totalRevenue}</p>
        </div>
        <p className="text-lg">Welcome, Admin! Use the navigation above to manage the system.</p>
      </div>
    </div>
  );
}