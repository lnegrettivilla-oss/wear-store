"use client";

import Link from "next/link";

import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {

  const { cart } = useCart();

  const total = cart.reduce((acc: number, item: any) => {

    const precio = Number(
      item.precio.replace("$", "").replace(".", "")
    );

    return acc + precio;

  }, 0);

  return (

    <main className="bg-black min-h-screen text-white p-5">

      {/* VOLVER */}
      <Link href="/carrito">

        <button className="mb-8 bg-[#111111] px-5 py-3 rounded-full hover:scale-105 transition">

          ← Volver al carrito

        </button>

      </Link>

      {/* TITULO */}
      <h1 className="text-6xl font-black mb-12">

        CHECKOUT

      </h1>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* FORMULARIO */}
        <div className="bg-[#111111] rounded-[35px] p-8">

          <h2 className="text-3xl font-bold mb-8">

            Información envío

          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full bg-black border border-neutral-800 rounded-full px-6 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Dirección"
              className="w-full bg-black border border-neutral-800 rounded-full px-6 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Ciudad"
              className="w-full bg-black border border-neutral-800 rounded-full px-6 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Teléfono"
              className="w-full bg-black border border-neutral-800 rounded-full px-6 py-4 outline-none"
            />

          </div>

          {/* METODOS */}
          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-6">

              Método de pago

            </h2>

            <div className="space-y-4">

              <button className="w-full bg-black border border-neutral-800 rounded-full px-6 py-5 text-left hover:border-white transition">

                💳 Tarjeta crédito/débito

              </button>

              <button className="w-full bg-black border border-neutral-800 rounded-full px-6 py-5 text-left hover:border-white transition">

                🟢 MercadoPago

              </button>

              <button className="w-full bg-black border border-neutral-800 rounded-full px-6 py-5 text-left hover:border-white transition">

                🏦 Transferencia bancaria

              </button>

            </div>

          </div>

        </div>

        {/* RESUMEN */}
        <div className="bg-[#111111] rounded-[35px] p-8 h-fit sticky top-24">

          <h2 className="text-3xl font-bold mb-8">

            Resumen

          </h2>

          <div className="space-y-5">

            {cart.map((producto: any, index: number) => (

              <div
                key={index}
                className="flex items-center gap-4"
              >

                <img
                  src={producto.imagen}
                  className="w-20 h-20 object-cover rounded-[20px]"
                />

                <div className="flex-1">

                  <h3 className="font-bold">
                    {producto.nombre}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Talla: {producto.talla}
                  </p>

                </div>

                <p>
                  {producto.precio}
                </p>

              </div>

            ))}

          </div>

          {/* TOTAL */}
          <div className="border-t border-white/10 mt-10 pt-8">

            <div className="flex justify-between text-2xl font-bold">

              <p>Total</p>

              <p>

                ${total.toLocaleString("es-CL")}

              </p>

            </div>

          </div>

          {/* BOTON */}
          <button className="w-full mt-10 bg-white text-black py-5 rounded-full text-lg font-bold hover:scale-[1.02] transition">

            Finalizar compra

          </button>

        </div>

      </div>

    </main>

  );

}