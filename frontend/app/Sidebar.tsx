"use client";

import Link from "next/link";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {

  return (

    <>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-[340px]
          bg-[#0b0b0b]
          z-50
          border-r border-neutral-800
          transition duration-300
          flex flex-col
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* HEADER */}
        <div className="p-8 border-b border-neutral-800">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 uppercase tracking-[4px] text-xs">

                Fashion Premium

              </p>

              <h2 className="text-4xl font-black tracking-[8px] mt-2">

                WEAR

              </h2>

            </div>

            {/* CERRAR */}
            <button
              onClick={() => setOpen(false)}
              className="text-4xl hover:rotate-90 transition duration-300"
            >

              ×

            </button>

          </div>

        </div>

        {/* LINKS */}
        <nav className="flex-1 p-8 flex flex-col gap-6">

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="
              text-2xl
              font-semibold
              hover:translate-x-3
              transition
            "
          >

            Inicio

          </Link>

          <Link
            href="/hombre"
            onClick={() => setOpen(false)}
            className="
              text-2xl
              font-semibold
              hover:translate-x-3
              transition
            "
          >

            Hombre

          </Link>

          <Link
            href="/mujer"
            onClick={() => setOpen(false)}
            className="
              text-2xl
              font-semibold
              hover:translate-x-3
              transition
            "
          >

            Mujer

          </Link>

          <Link
            href="/favoritos"
            onClick={() => setOpen(false)}
            className="
              text-2xl
              font-semibold
              hover:translate-x-3
              transition
            "
          >

            Favoritos

          </Link>

          <Link
            href="/carrito"
            onClick={() => setOpen(false)}
            className="
              text-2xl
              font-semibold
              hover:translate-x-3
              transition
            "
          >

            Carrito

          </Link>

          <div className="border-t border-neutral-800 my-4"></div>

          {/* CATEGORIAS */}
          <div>

            <p className="text-gray-500 uppercase tracking-[4px] text-sm mb-5">

              Categorías

            </p>

            <div className="flex flex-col gap-4 text-lg">

              <button className="text-left hover:text-gray-400 transition">
                Oversize
              </button>

              <button className="text-left hover:text-gray-400 transition">
                Hoodies
              </button>

              <button className="text-left hover:text-gray-400 transition">
                Premium
              </button>

              <button className="text-left hover:text-gray-400 transition">
                Streetwear
              </button>

            </div>

          </div>

        </nav>

        {/* FOOTER */}
        <div className="p-8 border-t border-neutral-800">

          <div className="flex gap-5 text-xl mb-5">

            <button className="hover:scale-125 transition">
              📸
            </button>

            <button className="hover:scale-125 transition">
              🎵
            </button>

            <button className="hover:scale-125 transition">
              ▶
            </button>

          </div>

          <p className="text-gray-500 text-sm">

            © 2026 WEAR Premium Fashion

          </p>

        </div>

      </aside>

    </>

  );

}