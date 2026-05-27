"use client";

import Link from "next/link";

export default function Home() {

  return (

    <main className="bg-black min-h-screen text-white overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6">

        {/* FONDO */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1600&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          <div className="absolute inset-0 bg-black/65"></div>

        </div>

        {/* CONTENIDO */}
        <div className="relative z-10 text-center max-w-4xl">

          <p className="text-gray-300 uppercase tracking-[8px] text-sm md:text-base">

            Nueva Colección 2026

          </p>

          <h1 className="text-7xl md:text-9xl font-black tracking-[14px] mt-8 leading-none">

            WEAR

          </h1>

          <p className="text-gray-300 mt-10 text-lg md:text-2xl leading-relaxed max-w-[700px] mx-auto">

            Moda urbana premium diseñada para quienes viven el estilo,
            la exclusividad y la elegancia minimalista.

          </p>

          {/* BOTONES */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-14">

            <Link href="/mujer">

              <button className="bg-white text-black px-10 py-5 rounded-full text-lg font-black hover:scale-105 hover:bg-gray-200 transition duration-300">

                Comprar Mujer

              </button>

            </Link>

            <Link href="/hombre">

              <button className="border border-white/20 bg-white/10 backdrop-blur-md px-10 py-5 rounded-full text-lg font-black hover:bg-white hover:text-black transition duration-300">

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
              h-[520px]
              rounded-[40px]
              overflow-hidden
              flex
              items-end
              p-10
              group
              hover:scale-[1.02]
              transition
              duration-500
            "
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500"></div>

            <div className="relative z-10">

              <p className="uppercase tracking-[5px] text-sm text-gray-300">

                Colección Exclusiva

              </p>

              <h2 className="text-6xl md:text-7xl font-black mt-4">

                MUJER

              </h2>

              <p className="text-gray-200 mt-5 max-w-[320px] leading-relaxed">

                Diseños elegantes, modernos y minimalistas para destacar en cualquier ocasión.

              </p>

            </div>

          </div>

        </Link>

        {/* HOMBRE */}
        <Link href="/hombre">

          <div
            className="
              relative
              h-[520px]
              rounded-[40px]
              overflow-hidden
              flex
              items-end
              p-10
              group
              hover:scale-[1.02]
              transition
              duration-500
            "
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500"></div>

            <div className="relative z-10">

              <p className="uppercase tracking-[5px] text-sm text-gray-300">

                Streetwear Premium

              </p>

              <h2 className="text-6xl md:text-7xl font-black mt-4">

                HOMBRE

              </h2>

              <p className="text-gray-200 mt-5 max-w-[320px] leading-relaxed">

                Estilo urbano premium inspirado en las tendencias internacionales.

              </p>

            </div>

          </div>

        </Link>

      </section>

      {/* DESTACADO */}
      <section className="px-6 md:px-12 py-24 bg-[#050505] text-center">

        <p className="uppercase tracking-[6px] text-gray-500 text-sm">

          WEAR PREMIUM

        </p>

        <h2 className="text-5xl md:text-7xl font-black mt-8 leading-tight">

          La nueva generación<br />
          del streetwear premium.

        </h2>

        <p className="text-gray-400 mt-10 max-w-[700px] mx-auto text-lg leading-relaxed">

          Cada colección está diseñada para transmitir exclusividad,
          elegancia y presencia en cada detalle.

        </p>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 px-6 text-center text-gray-500 text-sm bg-black">

        © 2026 WEAR — Moda Premium Urbana

      </footer>

    </main>

  );

}