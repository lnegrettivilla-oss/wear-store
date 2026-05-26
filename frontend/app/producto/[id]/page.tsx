"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { useCart } from "../../../context/CartContext";

const productos = [

  {
    id: 101,
    nombre: "Top Essential",
    precio: "$24.990",
    categoria: "mujer",
    descripcion: "Top femenino premium.",
    imagenes: [
      "/imagenes/woman.jpg",
      "/imagenes/woman.jpg",
      "/imagenes/woman.jpg",
    ],
  },

  {
    id: 102,
    nombre: "Premium Black",
    precio: "$39.990",
    categoria: "mujer",
    descripcion: "Diseño femenino elegante.",
    imagenes: [
      "/imagenes/woman.jpg",
      "/imagenes/woman.jpg",
      "/imagenes/woman.jpg",
    ],
  },

  {
    id: 201,
    nombre: "Hoodie Black",
    precio: "$39.990",
    categoria: "hombre",
    descripcion: "Hoodie premium urbano.",
    imagenes: [
      "/imagenes/man.jpg",
      "/imagenes/man.jpg",
      "/imagenes/man.jpg",
    ],
  },

  {
    id: 202,
    nombre: "Oversize Premium",
    precio: "$29.990",
    categoria: "hombre",
    descripcion: "Polera oversize premium.",
    imagenes: [
      "/imagenes/man.jpg",
      "/imagenes/man.jpg",
      "/imagenes/man.jpg",
    ],
  },

];

export default function ProductoPage() {

  const params = useParams();

  const {
    addToCart,
    favorites,
    toggleFavorite,
  } = useCart();

  const [talla, setTalla] = useState("M");

  const producto = productos.find(
    (p) => p.id === Number(params.id)
  );

  const [imagenActiva, setImagenActiva] = useState(
    producto?.imagenes[0]
  );

  if (!producto) {

    return (

      <main className="bg-black min-h-screen text-white flex items-center justify-center">

        Producto no encontrado

      </main>

    );

  }

  const isFavorite = favorites.find(
    (item: any) => item.id === producto.id
  );

  return (

    <main className="bg-black min-h-screen text-white p-5">

      {/* VOLVER */}
      <Link href={`/${producto.categoria}`}>

        <button className="mb-6 bg-[#111111] px-5 py-3 rounded-full hover:scale-105 transition">

          ← Volver

        </button>

      </Link>

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

        {/* GALERIA */}
        <div>

          {/* IMAGEN PRINCIPAL */}
          <div className="overflow-hidden rounded-[35px]">

            <img
              src={imagenActiva}
              className="w-full h-[700px] object-cover hover:scale-105 transition duration-500"
            />

          </div>

          {/* MINIATURAS */}
          <div className="flex gap-4 mt-5">

            {producto.imagenes.map((img, index) => (

              <button
                key={index}
                onClick={() => setImagenActiva(img)}
                className={`
                  overflow-hidden
                  rounded-[20px]
                  border-2
                  transition
                  ${
                    imagenActiva === img
                      ? "border-white scale-105"
                      : "border-transparent"
                  }
                `}
              >

                <img
                  src={img}
                  className="w-24 h-24 object-cover"
                />

              </button>

            ))}

          </div>

        </div>

        {/* INFO */}
        <div className="flex flex-col justify-center">

          {/* TOP */}
          <div className="flex items-start justify-between">

            <div>

              <p className="text-gray-500 uppercase tracking-[5px] text-sm">

                WEAR PREMIUM

              </p>

              <h1 className="text-6xl font-black mt-4">

                {producto.nombre}

              </h1>

            </div>

            {/* FAVORITO */}
            <button

              onClick={() => toggleFavorite(producto)}

              className={`
                text-4xl transition duration-300
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
          <p className="text-4xl font-bold mt-6">

            {producto.precio}

          </p>

          {/* DESCRIPCION */}
          <p className="text-gray-400 mt-8 text-lg leading-relaxed">

            {producto.descripcion}

          </p>

          {/* TALLAS */}
          <div className="mt-10">

            <p className="text-gray-400 mb-4">

              Selecciona talla

            </p>

            <div className="flex gap-4">

              {["S", "M", "L", "XL"].map((size) => (

                <button
                  key={size}
                  onClick={() => setTalla(size)}
                  className={`
                    w-14 h-14 rounded-full transition duration-200
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

            className="mt-10 bg-white text-black py-5 rounded-full font-bold hover:scale-105 transition"

          >

            Agregar al carrito

          </button>

        </div>

      </div>

    </main>

  );

}