"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">

      <header className="sticky top-0 z-50 bg-black border-b border-white/10">

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-lg font-bold"
          >
            ☰ Menú
          </button>

          <div className="text-center">

            <h1 className="text-3xl md:text-4xl font-black tracking-[10px]">
              WEAR
            </h1>

            <p className="text-xs tracking-[6px] text-gray-400">
              BY LUISANA
            </p>

          </div>

          <Link href="/carrito">

            <button className="flex items-center gap-2 font-bold">
              🛒 Carrito
            </button>

          </Link>

        </div>

        {menuOpen && (

          <div className="border-t border-white/10 bg-[#0f0f0f]">

            <div className="flex flex-col">

              <Link
                href="/"
                className="px-6 py-4 border-b border-white/10 hover:bg-white hover:text-black transition"
              >
                Inicio
              </Link>

              <Link
                href="/mujer"
                className="px-6 py-4 border-b border-white/10 hover:bg-white hover:text-black transition"
              >
                Mujer
              </Link>

              <Link
                href="/hombre"
                className="px-6 py-4 border-b border-white/10 hover:bg-white hover:text-black transition"
              >
                Hombre
              </Link>

              <a
                href="https://wa.me/56900000000"
                target="_blank"
                className="px-6 py-4 hover:bg-white hover:text-black transition"
              >
                Contacto
              </a>

            </div>

          </div>

        )}

      </header>

      <section className="relative h-[80vh]">

        <img
          src="/imagenes/woman.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-5">

          <p className="tracking-[6px] uppercase text-sm text-gray-300">
            Wear By Luisana
          </p>

          <h2 className="text-5xl md:text-8xl font-black mt-4">
            WEAR
          </h2>

          <p className="max-w-2xl text-lg md:text-2xl text-gray-300 mt-6">
            Diseñado para quienes no siguen tendencias,
            las crean.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-10">

            <Link href="/mujer">

              <button className="bg-white text-black px-10 py-4 rounded-full font-black hover:scale-105 transition">
                Ver colección mujer
              </button>

            </Link>

            <Link href="/hombre">

              <button className="border border-white px-10 py-4 rounded-full font-black hover:bg-white hover:text-black transition">
                Ver colección hombre
              </button>

            </Link>

          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-5 py-16">

        <h2 className="text-4xl md:text-5xl font-black mb-10 text-center">
          Explora nuestras colecciones
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <Link href="/mujer">

            <div className="group overflow-hidden rounded-[35px] border border-white/10 cursor-pointer">

              <img
                src="/imagenes/woman.jpg"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="p-6">

                <p className="text-gray-400 uppercase tracking-[4px] text-sm">
                  Colección
                </p>

                <h3 className="text-4xl font-black mt-2">
                  Mujer
                </h3>

              </div>

            </div>

          </Link>

          <Link href="/hombre">

            <div className="group overflow-hidden rounded-[35px] border border-white/10 cursor-pointer">

              <img
                src="/imagenes/man.jpg"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="p-6">

                <p className="text-gray-400 uppercase tracking-[4px] text-sm">
                  Colección
                </p>

                <h3 className="text-4xl font-black mt-2">
                  Hombre
                </h3>

              </div>

            </div>

          </Link>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-5 pb-16">

        <div className="grid md:grid-cols-4 gap-5">

          <div className="bg-[#111111] rounded-[25px] p-6">

            <h3 className="font-black text-xl">
              Envíos
            </h3>

            <p className="text-gray-400 mt-2">
              Envíos a todo Chile.
            </p>

          </div>

          <div className="bg-[#111111] rounded-[25px] p-6">

            <h3 className="font-black text-xl">
              Pago Seguro
            </h3>

            <p className="text-gray-400 mt-2">
              MercadoPago protegido.
            </p>

          </div>

          <div className="bg-[#111111] rounded-[25px] p-6">

            <h3 className="font-black text-xl">
              Atención
            </h3>

            <p className="text-gray-400 mt-2">
              Contacto directo por WhatsApp.
            </p>

          </div>

          <div className="bg-[#111111] rounded-[25px] p-6">

            <h3 className="font-black text-xl">
              Wear By Luisana
            </h3>

            <p className="text-gray-400 mt-2">
              Moda urbana premium.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}