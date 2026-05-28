"use client";

import Link from "next/link";

export default function FailurePage() {

  return (

    <main className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-10 text-center">

      <h1 className="text-7xl font-black text-red-500">

        PAGO CANCELADO

      </h1>

      <p className="text-gray-400 mt-6 text-xl">

        El pago no pudo completarse.

      </p>

      <Link href="/checkout">

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

          Intentar nuevamente

        </button>

      </Link>

    </main>

  );

}