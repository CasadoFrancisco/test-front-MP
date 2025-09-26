import Link from 'next/link';

export default function Failure() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error en el pago</h1>
        <p className="mb-6">
          Ha ocurrido un error al procesar tu pago. Por favor, intenta nuevamente.
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