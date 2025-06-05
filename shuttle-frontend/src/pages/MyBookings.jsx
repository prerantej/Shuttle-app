import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bookings/my", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => setBookings(res.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">My Bookings</h2>
        {bookings.map((b, i) => (
          <div key={i} className="mb-4 p-4 shadow bg-white rounded-xl">
            <h3 className="font-semibold">Shuttle: {b.shuttle?.name}</h3>
            <p>Time: {b.shuttle?.time}</p>
            <p>Fare: ₹{b.fare}</p>
            <p>Date: {new Date(b.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
