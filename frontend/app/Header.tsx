"use client";

import Link from "next/link";

import { useCart } from "../context/CartContext";

import { useState } from "react";

import Sidebar from "./Sidebar";

export default function Header() {

  const { cart, favorites } = useCart();

  const [open, setOpen] = useState(false);

  return (

    <>

      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      <header className="sticky top-0 z-30 bg-black/90 backdrop-blur border-b border-neutral-900">

        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

          {/* MENU */}
          <button

            onClick={() => setOpen(true)}

            className="
              text-2xl
              hover:scale-125
              active:scale-95
              transition
              duration-200
              cursor-pointer
            "
          >

            ☰

          </button>

          {/* LOGO */}
          <Link
            href="/"
            className="
              text-2xl
              font-black
              tracking-[8px]
              hover:scale-110
              transition
              duration-200
            "
          >

            WEAR

          </Link>

          {/* ICONOS */}
          <div className="flex items-center gap-5">

            {/* FAVORITOS */}
            <Link
              href="/favoritos"
              className="
                flex items-center gap-2
                text-2xl
                hover:scale-125
                transition
              "
            >

              ❤

              {favorites.length > 0 && (

                <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full font-bold">

                  {favorites.length}

                </span>

              )}

            </Link>

            {/* CARRITO */}
            <Link
              href="/carrito"
              className="
                flex items-center gap-2
                text-2xl
                hover:scale-125
                transition
              "
            >

              🛒

              {cart.length > 0 && (

                <span className="text-sm bg-white text-black px-2 py-1 rounded-full font-bold">

                  {cart.length}

                </span>

              )}

            </Link>

          </div>

        </div>

      </header>

    </>

  );

}