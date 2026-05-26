"use client";

import Link from "next/link";

import { useCart } from "../../context/CartContext";

export default function FavoritosPage() {

  const { favorites } = useCart();

  return (

    <main className="bg-black min-h-screen text-white p-5">

      {/* VOLVER */}
      <Link href="/">

        <button className="mb-8 bg-[#111111] px-5 py-3 rounded-full hover:scale-105 transition">

          ← Volver

        </button>

      </Link>

      {/* TITULO */}
      <h1 className="text-6xl font-black mb-10">

        FAVORITOS

      </h1>

      {/* VACIO */}
      {favorites.length === 0 ? (

        <p className="text-gray-400 text-lg">

          No tienes productos favoritos.

        </p>

      ) : (

        <div className="grid grid-cols-2 gap-5">

          {favorites.map((producto: any) => (

            <Link
              key={producto.id}
              href={`/producto/${producto.id}`}
            >

              <div className="bg-[#111111] rounded-[25px] overflow-hidden hover:scale-[1.02] transition duration-300">

                <img
                  src={producto.imagen}
                  className="w-full h-[240px] object-cover"
                />

                <div className="p-4">

                  <h2 className="text-xl font-bold">

                    {producto.nombre}

                  </h2>

                  <p className="text-gray-400 mt-1">

                    {producto.precio}

                  </p>

                </div>

              </div>

            </Link>

          ))}

        </div>

      )}

    </main>

  );

}