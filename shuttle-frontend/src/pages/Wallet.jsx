import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/wallet/balance", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => setBalance(res.data.balance));
  }, []);

  const recharge = async () => {
    const studentId = JSON.parse(localStorage.getItem("user")).id;
    try {
      await axios.post(
        "http://localhost:5000/api/wallet/recharge",
        { studentId, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Recharged!");
      window.location.reload();
    } catch (err) {
      alert("Error: " + err.response?.data?.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Wallet</h2>
        <p className="mb-4">Balance: ₹{balance}</p>
        <input
          type="number"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={recharge}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Recharge
        </button>
      </div>
    </div>
  );
}
