"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useCart } from "../../../context/CartContext";
import { supabase } from "../../../lib/supabase";

export default function ProductoPage() {

  const params = useParams();

  const {
    addToCart,
    favorites,
    toggleFavorite,
  } = useCart();

  const [producto, setProducto] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [talla, setTalla] = useState("M");

  const [imagenActiva, setImagenActiva] = useState("");

  useEffect(() => {

    obtenerProducto();

  }, []);

  async function obtenerProducto() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {

      console.error(error);

    } else {

      setProducto(data);

      setImagenActiva(data.imagen);

    }

    setLoading(false);

  }

  if (loading) {

    return (

      <main className="bg-black min-h-screen flex items-center justify-center text-white">

        <div className="text-center">

          <h1 className="text-5xl font-black animate-pulse">

            WEAR

          </h1>

          <p className="text-gray-500 mt-4">

            Cargando producto...

          </p>

        </div>

      </main>

    );

  }

  if (!producto) {

    return (

      <main className="bg-black min-h-screen flex items-center justify-center text-white">

        Producto no encontrado

      </main>

    );

  }

  const isFavorite = favorites.find(
    (item: any) => item.id === producto.id
  );

  return (

    <main className="bg-black min-h-screen text-white p-5 md:p-10">

      {/* VOLVER */}
      <Link href={`/${producto.categoria}`}>

        <button className="mb-8 bg-[#111111] px-6 py-3 rounded-full hover:scale-105 hover:bg-[#1b1b1b] transition duration-300">

          ← Volver

        </button>

      </Link>

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">

        {/* GALERIA */}
        <div>

          {/* IMAGEN PRINCIPAL */}
          <div className="overflow-hidden rounded-[40px] border border-white/5">

            <img
              src={imagenActiva}
              alt={producto.nombre}
              className="w-full h-[700px] object-cover hover:scale-105 transition duration-700"
            />

          </div>

          {/* MINIATURAS */}
          <div className="flex gap-4 mt-5">

            {[1, 2, 3].map((item) => (

              <button
                key={item}
                onClick={() => setImagenActiva(producto.imagen)}
                className={`
                  overflow-hidden
                  rounded-[20px]
                  border-2
                  transition
                  ${
                    imagenActiva === producto.imagen
                      ? "border-white scale-105"
                      : "border-transparent"
                  }
                `}
              >

                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-24 h-24 object-cover hover:scale-110 transition duration-500"
                />

              </button>

            ))}

          </div>

        </div>

        {/* INFO */}
        <div className="flex flex-col justify-center">

          {/* TOP */}
          <div className="flex items-start justify-between gap-6">

            <div>

              <p className="text-gray-500 uppercase tracking-[5px] text-sm">

                WEAR PREMIUM

              </p>

              <h1 className="text-5xl md:text-7xl font-black mt-5 leading-tight">

                {producto.nombre}

              </h1>

            </div>

            {/* FAVORITO */}
            <button

              onClick={() => toggleFavorite(producto)}

              className={`
                text-5xl transition duration-300
                ${
                  isFavorite
                    ? "text-red-500 scale-125"
                    : "text-white hover:scale-125"
                }
              `}
            >

              ♥

            </button>

          </div>

          {/* PRECIO */}
          <p className="text-5xl font-black mt-10">

            $
            {Number(producto.precio).toLocaleString("es-CL")}

          </p>

          {/* DESCRIPCION */}
          <p className="text-gray-400 mt-10 text-lg leading-relaxed">

            {producto.descripcion}

          </p>

          {/* STOCK */}
          <div className="mt-8">

            <span className="bg-[#111111] px-5 py-3 rounded-full text-sm text-gray-300 border border-white/5">

              Stock disponible: {producto.stock}

            </span>

          </div>

          {/* TALLAS */}
          <div className="mt-12">

            <p className="text-gray-400 mb-5 text-lg">

              Selecciona talla

            </p>

            <div className="flex gap-4 flex-wrap">

              {["S", "M", "L", "XL"].map((size) => (

                <button
                  key={size}
                  onClick={() => setTalla(size)}
                  className={`
                    w-16 h-16 rounded-full transition duration-300 text-lg font-bold
                    ${
                      talla === size
                        ? "bg-white text-black scale-110"
                        : "bg-[#111111] hover:scale-110"
                    }
                  `}
                >

                  {size}

                </button>

              ))}

            </div>

          </div>

          {/* BOTON */}
          <button

            onClick={() =>
              addToCart({
                ...producto,
                talla,
              })
            }

            className="mt-14 bg-white text-black py-6 rounded-full text-lg font-black hover:scale-[1.02] hover:bg-gray-200 transition duration-300"

          >

            Agregar al carrito

          </button>

        </div>

      </div>

    </main>

  );

}