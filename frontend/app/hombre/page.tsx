"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function HombrePage() {

  const [productos, setProductos] = useState<any[]>([]);

  async function obtenerProductos() {

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("categoria", "hombre");

    setProductos(data || []);

  }

  useEffect(() => {

    obtenerProductos();

  }, []);

  return (

    <main className="bg-black min-h-screen text-white p-5 md:p-10">

      <h1 className="text-7xl font-black mb-10">
        HOMBRE
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {productos.map((producto) => (

          <Link
            href={`/producto/${producto.id}`}
            key={producto.id}
            className="block"
          >

            <div className="bg-[#111111] rounded-[30px] overflow-hidden hover:scale-[1.03] transition cursor-pointer">

              <img
                src={producto.imagen}
                className="w-full h-[400px] object-cover"
              />

              <div className="p-5">

                <h2 className="text-3xl font-black">

                  {producto.nombre}

                </h2>

                <p className="text-gray-400 mt-3">

                  {producto.descripcion}

                </p>

                <p className="text-2xl font-black mt-5">

                  $
                  {Number(producto.precio).toLocaleString("es-CL")}

                </p>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </main>

  );

}