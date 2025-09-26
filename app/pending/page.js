import Link from 'next/link';

export default function Pending() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-yellow-600">Pago pendiente</h1>
        <p className="mb-6">
          Tu pago está siendo procesado. Recibirás una notificación cuando se complete.
        </p>
        <Link 
          href="/"
          className="inline-block py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}