import Link from "next/link";

export default function MujerPage() {
  const productos = [
    {
      id: 101,
      nombre: "Top Essential",
      precio: "$24.990",
      imagen: "/imagenes/woman.jpg",
    },
    {
      id: 102,
      nombre: "Premium Black",
      precio: "$39.990",
      imagen: "/imagenes/woman.jpg",
    },
    {
      id: 103,
      nombre: "Urban Woman",
      precio: "$29.990",
      imagen: "/imagenes/woman.jpg",
    },
    {
      id: 104,
      nombre: "Minimal Style",
      precio: "$34.990",
      imagen: "/imagenes/woman.jpg",
    },
  ];

  return (
    <main className="bg-black min-h-screen text-white p-5">
      <Link href="/">
        <button className="mb-6 bg-[#111111] px-5 py-3 rounded-full hover:bg-white hover:text-black transition">
          ← Volver
        </button>
      </Link>

      <h1 className="text-6xl font-black mb-2">MUJER</h1>
      <p className="text-gray-400 mb-10">Colección femenina premium</p>

      <div className="grid grid-cols-2 gap-4">
        {productos.map((producto) => (
          <Link key={producto.id} href={`/producto/${producto.id}`}>
            <div className="bg-[#111111] rounded-[25px] overflow-hidden hover:scale-[1.02] transition duration-300">
              <img
                src={producto.imagen}
                className="w-full h-[220px] object-cover"
                alt={producto.nombre}
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{producto.nombre}</h2>
                <p className="text-gray-400 mt-1">{producto.precio}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}