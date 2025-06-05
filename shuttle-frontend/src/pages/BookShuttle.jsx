import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function BookShuttle() {
  const [shuttles, setShuttles] = useState([]);

  useEffect(() => {
    const fetchShuttles = async () => {
      const res = await axios.get("http://localhost:5000/api/shuttles/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setShuttles(res.data);
    };
    fetchShuttles();
  }, []);

  const book = async (shuttleId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/bookings/book",
        { shuttleId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Booking successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shuttles.map((s) => (
          <div key={s._id} className="bg-white p-4 shadow rounded-xl">
            <h3 className="text-xl font-bold mb-2">{s.name}</h3>
            <p className="text-sm mb-1">Route: {s.route.join(" → ")}</p>
            <p className="text-sm mb-1">Time: {s.time}</p>
            <p className="text-sm mb-2">Fare: ₹{s.fare}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => book(s._id)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}