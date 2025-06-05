import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function ViewAllBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/bookings", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => setBookings(res.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">All Bookings</h2>
        <div className="space-y-4">
          {bookings.map((b, i) => (
            <div key={i} className="bg-white p-4 shadow rounded">
              <p><strong>Student:</strong> {b.student?.name} ({b.student?.email})</p>
              <p><strong>Shuttle:</strong> {b.shuttle?.name}</p>
              <p><strong>Fare:</strong> ₹{b.fare}</p>
              <p><strong>Date:</strong> {new Date(b.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}