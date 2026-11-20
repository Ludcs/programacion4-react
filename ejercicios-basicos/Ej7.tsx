interface ProductoProps {
  nombre: string;
  precio: number;
  stock: number;
  oferta?: boolean;
}

export default function ProductoTS({
  nombre,
  precio,
  stock,
  oferta,
}: ProductoProps) {
  return (
    <div className="flex flex-col gap-1 border border-gray-300 rounded-lg p-4 min-h-40 w-50">
      <h3 className='text-xl font-semibold'>{nombre}</h3>
      <p>{oferta && <span className="font-bold">¡Oferta!</span>}</p>
      <p>Precio: ${precio}</p>
      <p className={`${stock === 0 ? 'text-gray-500' : ''}`}>
        {stock === 0 ? "Sin stock" : `Stock: ${stock} unidades`}
      </p>
    </div>
  );
}
