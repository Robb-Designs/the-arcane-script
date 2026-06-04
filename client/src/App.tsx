import { Routes, Route } from "react-router-dom";
import './App.css';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from "./pages/Profile";
import Battle from "./pages/Battle";

function App() {

  return (
     <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/battle" element={<Battle />} />
    </Routes>
  )
}

export default App
