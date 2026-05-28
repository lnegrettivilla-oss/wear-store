"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { supabase } from "../../../lib/supabase";
import { useCart } from "../../../context/CartContext";

export default function ProductoPage() {

  const params = useParams();

  const { addToCart } = useCart();

  const [producto, setProducto] = useState<any>(null);

  const [tallaSeleccionada, setTallaSeleccionada] =
    useState("");

  async function obtenerProducto() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();

    if (!error && data) {

      setProducto(data);

    }

  }

  useEffect(() => {

    obtenerProducto();

  }, []);

  function agregarCarrito() {

    if (!tallaSeleccionada) {

      alert("Debes seleccionar una talla");

      return;

    }

    addToCart({
      ...producto,
      cantidad: 1,
      talla: tallaSeleccionada,
    });

    alert("Producto agregado al carrito");

  }

  if (!producto) {

    return (

      <main className="bg-black min-h-screen text-white flex items-center justify-center">

        <h1 className="text-5xl font-black">
          Cargando producto...
        </h1>

      </main>

    );

  }

  return (

    <main className="bg-black min-h-screen text-white p-5 md:p-10">

      <Link href="/">

        <button className="mb-10 bg-[#111111] px-5 py-3 rounded-full hover:bg-white hover:text-black transition">

          ← Volver

        </button>

      </Link>

      <div className="grid lg:grid-cols-2 gap-10 items-start">

        <div>

          <img
            src={producto.imagen}
            className="w-full rounded-[40px] object-cover"
          />

        </div>

        <div>

          <p className="text-gray-500 uppercase tracking-[5px] mb-4">

            WEAR PREMIUM

          </p>

          <h1 className="text-6xl font-black">

            {producto.nombre}

          </h1>

          <p className="text-gray-400 text-lg mt-6 leading-relaxed">

            {producto.descripcion}

          </p>

          <p className="text-5xl font-black mt-10">

            $
            {Number(producto.precio).toLocaleString("es-CL")}

          </p>

          <div className="mt-10">

            <p className="mb-4 text-xl font-bold">
              Selecciona tu talla
            </p>

            <div className="flex gap-3 flex-wrap">

              {["S", "M", "L", "XL", "XXL"].map((talla) => (

                <button
                  key={talla}
                  onClick={() =>
                    setTallaSeleccionada(talla)
                  }
                  className={`
                    px-6 py-3 rounded-full border
                    ${
                      tallaSeleccionada === talla
                        ? "bg-white text-black border-white"
                        : "border-gray-600"
                    }
                  `}
                >

                  {talla}

                </button>

              ))}

            </div>

          </div>

          <button
            onClick={agregarCarrito}
            className="
              mt-10
              bg-white
              text-black
              px-10
              py-5
              rounded-full
              font-black
              text-xl
              hover:scale-105
              transition
            "
          >

            Agregar al carrito

          </button>

        </div>

      </div>

    </main>

  );

}