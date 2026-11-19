export default function Producto({
  nombre,
  precio,
  stock,
}: {
  nombre: string;
  precio: number;
  stock: number;
}) {
  return (
    <div className="flex flex-col gap-1 border border-gray-300 rounded-lg p-4 w-50">
      <h3 className='text-xl font-semibold'>{nombre}</h3>
      <p>Precio: ${precio}</p>
      <p className={`${stock === 0 ? 'text-gray-500' : ''}`}>
        {stock === 0 ? "Sin stock" : `Stock: ${stock} unidades`}
      </p>
    </div>
  );
}
