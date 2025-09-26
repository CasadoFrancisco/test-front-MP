'use client';
import { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    servicio: 'Servicio Premium',
    precio: 1000
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);

  // Inicializar el SDK de Mercado Pago
  useEffect(() => {
    // Inicializar Mercado Pago SDK
    initMercadoPago('APP_USR-bce34eee-fe48-4e08-9ceb-48d466d26790', {
      locale: 'es-AR'
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Usar la URL de localtunnel para el backend en lugar de localhost
      const response = await fetch('https://test-back-mp-production.up.railway.app/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // En lugar de redireccionar, guardamos el preferenceId para usar con el componente Wallet
        setPreferenceId(data.preferenceId);
      } else {
        setError(data.error || 'Ocurrió un error al procesar el pago');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Contrata nuestro servicio</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {!preferenceId ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block mb-1 font-medium">
                Nombre completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="servicio" className="block mb-1 font-medium">
                Servicio
              </label>
              <select
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Servicio Premium">Servicio Premium - $1000</option>
                <option value="Servicio Básico">Servicio Básico - $500</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
            >
              {loading ? 'Procesando...' : 'Pagar con Mercado Pago'}
            </button>
          </form>
        ) : (
          <div className="mt-4">
            <Wallet initialization={{ preferenceId }} />
          </div>
        )}
      </div>
    </main>
  );
}
