import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRUT from './pages/LoginRut';
import LoginPassword from './pages/LoginPassword';
import Prescriptions from './pages/Prescriptions';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRUT />} />
        <Route path="/login-password" element={<LoginPassword />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
      </Routes>
    </Router>
  );
}

export default App;
