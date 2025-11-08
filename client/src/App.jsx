import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import EditProfile from "./pages/EditProfile";
// import ViewProfile from "./pages/ViewProfile";
// import Directory from "./pages/Directory";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} /> */}
          {/* <Route path="/profile/:id" element={<ViewProfile />} /> */}
          {/* <Route path="/directory" element={<Directory />} /> */}

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
