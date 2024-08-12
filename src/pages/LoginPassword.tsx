import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface LocationState {
  rut: string;
}

export default function LoginPassword() {
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://rec-staging.recemed.cl/api/users/log_in', {
        user:{
          rut: state.rut,
          password,
        }
      });
      console.log(response.data.data)
      // Guardar token

      navigate('/prescriptions', { state: { 
        patientName: `${response.data.data.profiles[0].first_name} ${response.data.data.profiles[0].last_name}`,
        token: `${response.data.data.token}`
        } });
    } catch (error) {
      alert('Error en el login');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-xs">
        <h1 className="text-2xl font-bold mb-4">Ingrese su contraseña</h1>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-rm-blue-100 text-white w-full p-2 rounded hover:bg-rm-blue-200"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}
