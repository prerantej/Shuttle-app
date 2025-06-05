import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import BookShuttle from "./pages/BookShuttle";
import Wallet from "./pages/Wallet";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import ManageShuttles from "./pages/ManageShuttles";
import ManageStudents from "./pages/ManageStudents";
import ViewAllBookings from "./pages/ViewAllBookings";
import AdminRecharge from "./pages/AdminRecharge";


function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={token ? (user?.role === "admin" ? "/admin" : "/dashboard") : "/login"} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Student Routes */}
        <Route path="/dashboard" element={token && user?.role === "student" ? <StudentDashboard /> : <Navigate to="/login" />} />
        <Route path="/book" element={token && user?.role === "student" ? <BookShuttle /> : <Navigate to="/login" />} />
        <Route path="/wallet" element={token && user?.role === "student" ? <Wallet /> : <Navigate to="/login" />} />
        <Route path="/my-bookings" element={token && user?.role === "student" ? <MyBookings /> : <Navigate to="/login" />} />

        {/* Admin Routes */}
        <Route path="/admin" element={token && user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/manage-shuttles" element={token && user?.role === "admin" ? <ManageShuttles /> : <Navigate to="/login" />} />
        <Route path="/manage-students" element={token && user?.role === "admin" ? <ManageStudents /> : <Navigate to="/login" />} />
        <Route path="/view-bookings" element={token && user?.role === "admin" ? <ViewAllBookings /> : <Navigate to="/login" />} />
        <Route path="/recharge" element={token && user?.role === "admin" ? <AdminRecharge /> : <Navigate to="/login" />} />

        {/* Catch All */}
        <Route path="*" element={<h1 className="p-6 text-center text-xl">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
