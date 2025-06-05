import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function StudentDashboard() {
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    const fetchWallet = async () => {
      const res = await axios.get("http://localhost:5000/api/wallet/balance", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWallet(res.data.balance);
    };
    fetchWallet();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Student!</h2>
        <p className="text-lg">Wallet Balance: ₹{wallet}</p>
      </div>
    </div>
  );
}