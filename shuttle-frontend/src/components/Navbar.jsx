import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload(); // Force logout state refresh
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Shuttle App</h1>
      <div className="flex gap-4">
        {user?.role === "student" && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/book">Book Shuttle</Link>
            <Link to="/wallet">Wallet</Link>
            <Link to="/my-bookings">My Bookings</Link>
          </>
        )}
        {user?.role === "admin" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/manage-shuttles">Shuttles</Link>
            <Link to="/manage-students">Students</Link>
            <Link to="/view-bookings">Bookings</Link>
            <Link to="/recharge">Recharge</Link>
          </>
        )}
        <button onClick={handleLogout} className="text-red-600">Logout</button>
      </div>
    </nav>
  );
}