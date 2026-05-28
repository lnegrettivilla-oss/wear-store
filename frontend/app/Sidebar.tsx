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
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      <aside
        className={`
          fixed top-0 left-0 h-screen w-[320px]
          bg-black
          border-r border-white/10
          z-50
          transition duration-300
          flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-8 border-b border-white/10">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 uppercase tracking-[4px] text-xs">
                Wear By Luisana
              </p>

              <h2 className="text-4xl font-black mt-2">
                WEAR
              </h2>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-4xl"
            >
              ×
            </button>

          </div>

        </div>

        <nav className="flex-1 p-8 flex flex-col gap-6">

          <Link href="/" onClick={() => setOpen(false)}>
            Inicio
          </Link>

          <Link href="/mujer" onClick={() => setOpen(false)}>
            Colección Mujer
          </Link>

          <Link href="/hombre" onClick={() => setOpen(false)}>
            Colección Hombre
          </Link>

          <Link href="/zapatos-mujer" onClick={() => setOpen(false)}>
            Zapatos Mujer
          </Link>

          <Link href="/zapatos-hombre" onClick={() => setOpen(false)}>
            Zapatos Hombre
          </Link>

          <Link href="/carrito" onClick={() => setOpen(false)}>
            Carrito
          </Link>

          <Link href="/admin" onClick={() => setOpen(false)}>
            Panel Administrador
          </Link>

          <a
            href="https://wa.me/569XXXXXXXX"
            target="_blank"
            className="mt-6 bg-white text-black px-4 py-3 rounded-full text-center font-bold"
          >
            Contactar por WhatsApp
          </a>

        </nav>

        <div className="p-8 border-t border-white/10">

          <p className="text-gray-400 text-sm">
            Moda urbana premium diseñada por Luisana.
          </p>

        </div>

      </aside>
    </>
  );
}