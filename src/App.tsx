import "./App.css";
import Producto from "../ejercicios-basicos/Ej1";
import Contador from "../ejercicios-basicos/Ej2";
import MostrarYOcultar from "../ejercicios-basicos/Ej3";
import ConversorTemperatura from "../ejercicios-basicos/Ej4";
import ListaCompras from "../ejercicios-basicos/Ej5";
import Buscador from "../ejercicios-basicos/Ej6";

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
          Ejercicio 1: Tarjetas de Productos
        </h1>
        <div className="flex justify-start items-center gap-6 mb-4">
          {productos.map((producto) => (
            <Producto key={producto.nombre} {...producto} />
          ))}
        </div>
        <h1 className="text-2xl font-bold mb-4">
          Ejercicio 2: Contador con Límites
        </h1>
        <div className="mb-4">
          <Contador />
        </div>
        <h1 className="text-2xl font-bold mb-4">
          Ejercicio 3: Mostrar y Ocultar
        </h1>
        <div className="mb-4">
          <MostrarYOcultar />
        </div>
        <h1 className="text-2xl font-bold mb-4">
          Ejercicio 4: Conversor de Temperatura
        </h1>
        <div className="mb-4">
          <ConversorTemperatura />
        </div>
        <h1 className="text-2xl font-bold mb-4">
          Ejercicio 5: Lista de Compras
        </h1>
        <div className="mb-4">
          <ListaCompras />
        </div>
        <h1 className="text-2xl font-bold mb-4">
          Ejercicio 6: Buscador
        </h1>
        <div className="mb-4">
          <Buscador />
        </div>
      </main>
    </>
  );
}

export default App;
