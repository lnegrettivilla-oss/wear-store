"use client";

import Link from "next/link";

import { useState } from "react";

export default function HombrePage() {

  const [search, setSearch] = useState("");

  const [categoria, setCategoria] = useState("Todos");

  const productos = [

    {
      id: 201,
      nombre: "Polera Essential",
      precio: "$24.990",
      imagen: "/imagenes/man.jpg",
      categoria: "Poleras",
    },

    {
      id: 202,
      nombre: "Hoodie Black",
      precio: "$39.990",
      imagen: "/imagenes/man.jpg",
      categoria: "Hoodies",
    },

    {
      id: 203,
      nombre: "Oversize Premium",
      precio: "$29.990",
      imagen: "/imagenes/man.jpg",
      categoria: "Oversize",
    },

    {
      id: 204,
      nombre: "Urban Style",
      precio: "$34.990",
      imagen: "/imagenes/man.jpg",
      categoria: "Premium",
    },

  ];

  const filtrados = productos.filter((producto) => {

    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(search.toLowerCase());

    const coincideCategoria =
      categoria === "Todos"
        ? true
        : producto.categoria === categoria;

    return coincideBusqueda && coincideCategoria;

  });

  return (

    <main className="bg-black min-h-screen text-white p-5">

      {/* VOLVER */}
      <Link href="/">

        <button className="mb-6 bg-[#111111] px-5 py-3 rounded-full hover:bg-white hover:text-black transition">

          ← Volver

        </button>

      </Link>

      {/* TITULO */}
      <h1 className="text-6xl font-black mb-2">

        HOMBRE

      </h1>

      <p className="text-gray-400 mb-8">

        Colección masculina premium

      </p>

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          mb-6
          bg-[#111111]
          border border-neutral-800
          rounded-full
          px-6
          py-4
          outline-none
        "
      />

      {/* FILTROS */}
      <div className="flex gap-3 overflow-x-auto mb-10">

        {[
          "Todos",
          "Poleras",
          "Hoodies",
          "Oversize",
          "Premium",
        ].map((item) => (

          <button
            key={item}
            onClick={() => setCategoria(item)}
            className={`
              px-5 py-3 rounded-full whitespace-nowrap transition
              ${
                categoria === item
                  ? "bg-white text-black"
                  : "bg-[#111111] hover:bg-white hover:text-black"
              }
            `}
          >

            {item}

          </button>

        ))}

      </div>

      {/* PRODUCTOS */}
      <div className="grid grid-cols-2 gap-4">

        {filtrados.map((producto) => (

          <Link
            key={producto.id}
            href={`/producto/${producto.id}`}
          >

            <div className="bg-[#111111] rounded-[25px] overflow-hidden hover:scale-[1.02] transition duration-300">

              <img
                src={producto.imagen}
                className="w-full h-[220px] object-cover"
              />

              <div className="p-4">

                <h2 className="text-lg font-bold">

                  {producto.nombre}

                </h2>

                <p className="text-gray-400 mt-1">

                  {producto.precio}

                </p>

                <p className="text-sm text-gray-500 mt-2">

                  {producto.categoria}

                </p>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </main>

  );

}