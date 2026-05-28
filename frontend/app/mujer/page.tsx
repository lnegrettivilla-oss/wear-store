"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";

export default function MujerPage() {

  const [productos, setProductos] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  async function obtenerProductos() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("categoria", "mujer")
      .order("id", { ascending: false });

    if (error) {

      console.error(error);

    } else {

      setProductos(data || []);

    }

    setLoading(false);

  }

  useEffect(() => {

    obtenerProductos();

  }, []);

  return (

    <main className="bg-black min-h-screen text-white p-5 md:p-10">

      {/* HEADER */}
      <div className="mb-10">

        <Link href="/">

          <button className="mb-6 bg-[#111111] px-5 py-3 rounded-full hover:bg-white hover:text-black transition">

            ← Volver

          </button>

        </Link>

        <h1 className="text-6xl md:text-7xl font-black">

          MUJER

        </h1>

        <p className="text-gray-400 mt-3 text-lg">

          Colección femenina premium

        </p>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="text-center py-32">

          <h2 className="text-4xl font-black animate-pulse">

            WEAR

          </h2>

          <p className="text-gray-500 mt-4">

            Cargando productos...

          </p>

        </div>

      ) : productos.length === 0 ? (

        <div className="text-center py-32">

          <h2 className="text-4xl font-black">

            SIN PRODUCTOS

          </h2>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {productos.map((producto) => (

            <Link
              key={producto.id}
              href={`/producto/${producto.id}`}
            >

              <div className="bg-[#111111] rounded-[30px] overflow-hidden hover:scale-[1.02] border border-white/5 hover:border-white/10 transition duration-500">

                {/* IMAGEN */}
                <div className="overflow-hidden">

                  <img
                    src={producto.imagen}
                    className="w-full h-[360px] object-cover hover:scale-110 transition duration-700"
                  />

                </div>

                {/* INFO */}
                <div className="p-6">

                  <p className="text-gray-500 uppercase tracking-[4px] text-xs mb-3">

                    WEAR PREMIUM

                  </p>

                  <h2 className="text-2xl font-black">

                    {producto.nombre}

                  </h2>

                  <div className="flex items-center justify-between mt-6">

                    <p className="text-2xl font-black">

                      $
                      {Number(
                        producto.precio
                      ).toLocaleString("es-CL")}

                    </p>

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      )}

    </main>

  );

}