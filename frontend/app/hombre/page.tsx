"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";

export default function HombrePage() {

  const [productos, setProductos] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  async function obtenerProductos() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("categoria", "hombre")
      .order("id", { ascending: false });

    if (!error && data) {

      setProductos(data);

    }

    setLoading(false);

  }

  useEffect(() => {

    obtenerProductos();

  }, []);

  return (

    <main className="bg-black min-h-screen text-white p-5">

      {/* HEADER */}
      <div className="mb-10">

        <Link href="/">

          <button className="mb-6 bg-[#111111] px-5 py-3 rounded-full hover:bg-white hover:text-black transition">

            ← Volver

          </button>

        </Link>

        <h1 className="text-6xl font-black">

          HOMBRE

        </h1>

        <p className="text-gray-400 mt-3">

          Colección masculina premium

        </p>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="text-center py-20 text-gray-500">

          Cargando productos...

        </div>

      ) : (

        <div className="grid grid-cols-2 gap-4">

          {productos.map((producto) => (

            <Link
              key={producto.id}
              href={`/producto/${producto.id}`}
            >

              <div className="bg-[#111111] rounded-[25px] overflow-hidden hover:scale-[1.02] transition duration-300">

                <img
                  src={producto.imagen}
                  className="w-full h-[260px] object-cover"
                />

                <div className="p-4">

                  <h2 className="text-lg font-bold">

                    {producto.nombre}

                  </h2>

                  <p className="text-gray-400 mt-2">

                    ${Number(producto.precio).toLocaleString("es-CL")}

                  </p>

                  <p className="text-sm text-gray-500 mt-2 uppercase">

                    {producto.categoria}

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