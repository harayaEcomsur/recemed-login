import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateRut, formatRut } from '@fdograph/rut-utilities'; //Libreria rut

export default function LoginRUT() {
  const [rut, setRut] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (isValidRut(rut)) {
      navigate('/login-password', { state: { rut } });
    } else {
      setError(true)
    }
  };

  const isValidRut = (rut: string): boolean => {
    const isValidate = validateRut(rut,false);
    if(isValidate)
      return true; 
    else
      return false;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-xs">
        <h1 className="text-2xl font-bold mb-4">Ingrese su RUT</h1>
        <input 
          type="text" 
          value={rut}
          onChange={(e) => {
            if(e.target.value.length > 8)
              setRut(formatRut(e.target.value))
            else
              setRut(e.target.value)
            }
          }
          className="border w-full p-2 rounded mb-4"
        />
        {error && <span>RUT inválido</span>}
        <button
          onClick={handleNext}
          className="bg-rm-blue-100 text-white w-full p-2 rounded hover:bg-rm-blue-200"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
