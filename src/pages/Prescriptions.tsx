import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface Prescription {
  id: number;
  folio: number;
  doctor: {
    first_name: string;
  };
  speciality: string;
  inserted_at: string;
  code: string;
  type: 'Receta Retenida' | 'Receta Simple';
}

interface Patient {
  token: string;
  patientName: string;
}

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [page, setPage] = useState<number>(1);
  const location = useLocation();
  const state = location.state as Patient;

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const response = await axios.get(`http://rec-staging.recemed.cl/api/patients/prescriptions?page=${page}`,{
        headers:{
          Authorization: `Bearer ${state.token}`
        }
      });
      setPrescriptions(response.data.data);
    };

    fetchPrescriptions();
  }, [page]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-white">{state.patientName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prescriptions.map((prescription) => (
          <div 
            key={prescription.id} 
            className={`p-4 rounded shadow ${prescription.type === 'Receta Retenida' ? 'bg-red-200' : 'bg-green-200'}`}
          >
            <div className='headerRecipe text-sm'>
              <span>Folio: <strong>{prescription.folio}</strong></span>
              <span>Receta Médica</span>
            </div>
            <p className='text-xs'>Fecha de emisión: {new Date(prescription.inserted_at).toLocaleDateString()}</p>
            <h2 className="text-xl font-bold">Dr: {prescription.doctor.first_name}</h2>
            <p>{prescription.speciality}</p>
            <p className='text-xs'>Código: <strong>{prescription.code}</strong></p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="bg-rm-blue-100 text-white p-2 rounded hover:bg-rm-blue-200 mr-2 disabled:opacity-75">
          Anterior
        </button>
        <button onClick={() => setPage(page + 1)} className="bg-rm-blue-100 text-white p-2 rounded hover:bg-rm-blue-200 mr-2 disabled:opacity-75">
          Siguiente
        </button>
      </div>
    </div>
  );
}
