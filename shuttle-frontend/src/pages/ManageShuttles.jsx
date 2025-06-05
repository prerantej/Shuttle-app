import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function ManageShuttles() {
  const [shuttles, setShuttles] = useState([]);
  const [form, setForm] = useState({ name: "", route: "", time: "", fare: "" });

  const fetchShuttles = async () => {
    const res = await axios.get("http://localhost:5000/api/shuttles/all", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setShuttles(res.data);
  };

  useEffect(() => {
    fetchShuttles();
  }, []);

  const createShuttle = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/shuttles/create", form, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchShuttles();
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Manage Shuttles</h2>
        <form onSubmit={createShuttle} className="mb-6 space-y-4">
          <input name="name" placeholder="Shuttle Name" onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2 border rounded" />
          <input name="route" placeholder="Stops (comma-separated)" onChange={(e) => setForm({ ...form, route: e.target.value.split(',') })} className="w-full p-2 border rounded" />
          <input name="time" placeholder="Time" onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full p-2 border rounded" />
          <input name="fare" placeholder="Fare" type="number" onChange={(e) => setForm({ ...form, fare: e.target.value })} className="w-full p-2 border rounded" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Create Shuttle</button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shuttles.map((s) => (
            <div key={s._id} className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-bold">{s.name}</h3>
              <p>Route: {s.route.join(" → ")}</p>
              <p>Time: {s.time}</p>
              <p>Fare: ₹{s.fare}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}