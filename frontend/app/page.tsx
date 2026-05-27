"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);

  }, []);

  if (loading) {

    return (

      <main className="bg-black min-h-screen flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-white text-6xl font-black tracking-[12px] animate-pulse">

            WEAR

          </h1>

          <p className="text-gray-500 mt-5 tracking-[5px] uppercase text-sm">

            Loading Fashion Experience

          </p>

        </div>

      </main>

    );

  }

  return (

    <main className="bg-black min-h-screen text-white overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">

        {/* BACKGROUND */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        </div>

        {/* CONTENT */}
        <div className="relative z-10">

          <p className="text-gray-400 uppercase tracking-[7px] text-sm mb-6">

            New Collection 2026

          </p>

          <h1 className="text-7xl md:text-9xl font-black tracking-[14px] leading-none">

            WEAR

          </h1>

          <p className="text-gray-300 mt-10 text-lg md:text-xl max-w-[550px] leading-relaxed mx-auto">

            Moda minimalista premium diseñada para quienes viven el estilo urbano moderno.

          </p>

          <div className="flex flex-col md:flex-row gap-5 justify-center mt-12">

            <Link href="/mujer">

              <button className="bg-white text-black px-10 py-5 rounded-full font-black text-lg hover:scale-105 hover:bg-gray-200 transition duration-300">

                Comprar Mujer

              </button>

            </Link>

            <Link href="/hombre">

              <button className="border border-white/20 bg-white/5 backdrop-blur-md px-10 py-5 rounded-full font-black text-lg hover:bg-white hover:text-black transition duration-300">

                Comprar Hombre

              </button>

            </Link>

          </div>

        </div>

      </section>

      {/* CATEGORÍAS */}
      <section className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-black">

        {/* MUJER */}
        <Link href="/mujer">

          <div
            className="
              relative
              rounded-[40px]
              overflow-hidden
              h-[500px]
              flex
              items-end
              p-10
              group
              transition
              duration-500
              hover:scale-[1.02]
            "
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition duration-500"></div>

            <div className="relative z-10">

              <p className="text-sm tracking-[5px] text-gray-300 uppercase">

                Colección

              </p>

              <h2 className="text-6xl font-black mt-4">

                MUJER

              </h2>

              <p className="mt-4 text-gray-200 max-w-[300px]">

                Elegancia urbana con detalles modernos y minimalistas.

              </p>

            </div>

          </div>

        </Link>

        {/* HOMBRE */}
        <Link href="/hombre">

          <div
            className="
              relative
              rounded-[40px]
              overflow-hidden
              h-[500px]
              flex
              items-end
              p-10
              group
              transition
              duration-500
              hover:scale-[1.02]
            "
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition duration-500"></div>

            <div className="relative z-10">

              <p className="text-sm tracking-[5px] text-gray-300 uppercase">

                Colección

              </p>

              <h2 className="text-6xl font-black mt-4">

                HOMBRE

              </h2>

              <p className="mt-4 text-gray-200 max-w-[300px]">

                Streetwear premium para destacar en cualquier ocasión.

              </p>

            </div>

          </div>

        </Link>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm">

        © 2026 WEAR — Fashion Store Premium

      </footer>

    </main>

  );

}