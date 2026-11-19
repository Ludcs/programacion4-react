import "./App.css";
import Producto from "../ejercicios-basicos/Ej1";

const productos = [
  { nombre: "Teclado", precio: 45000, stock: 12 },
  { nombre: "Mouse", precio: 18000, stock: 0 },
  { nombre: "Monitor", precio: 320000, stock: 3 },
];

function App() {
  return (
    <>
      <main className="min-h-screen container mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold mb-4">
          React Desde Cero
        </h1>
        <h1 className="text-2xl font-bold mb-4">
          Ejercicio 1: Listado de productos
        </h1>
        <div className="flex justify-start items-center gap-6">
          {productos.map((producto) => (
            <Producto key={producto.nombre} {...producto} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
