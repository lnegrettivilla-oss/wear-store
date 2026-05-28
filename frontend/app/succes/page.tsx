"use client";

import Link from "next/link";

export default function SuccessPage() {

  return (

    <main className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-10 text-center">

      <h1 className="text-7xl font-black text-green-500">

        PAGO EXITOSO

      </h1>

      <p className="text-gray-400 mt-6 text-xl max-w-[700px]">

        Tu pago fue procesado correctamente.
        Ahora envíanos tus datos de envío por WhatsApp.

      </p>

      <a
        href="https://wa.me/56900000000"
        target="_blank"
      >

        <button
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

          Enviar datos por WhatsApp

        </button>

      </a>

      <Link href="/">

        <button
          className="
            mt-5
            border
            border-white/20
            px-10
            py-5
            rounded-full
            hover:bg-white
            hover:text-black
            transition
          "
        >

          Volver a la tienda

        </button>

      </Link>

    </main>

  );

}