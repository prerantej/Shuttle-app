import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AdminRecharge() {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/students", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => setStudents(res.data));
  }, []);

  const handleRecharge = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/wallet/recharge",
        { studentId: selectedId, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Recharge successful!");
      setSelectedId("");
      setAmount("");
    } catch (err) {
      alert(err.response?.data?.message || "Recharge failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Recharge Student Wallet</h2>

        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} ({s.email}) - ₹{s.walletPoints}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleRecharge}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Recharge Wallet
        </button>
      </div>
    </div>
  );
}