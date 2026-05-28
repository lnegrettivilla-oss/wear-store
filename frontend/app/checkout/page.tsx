"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {

  const { cart } = useCart();

  const total = cart.reduce(
    (acc: number, item: any) => {
      return acc + Number(item.precio) * item.cantidad;
    },
    0
  );

  async function pagar() {

    try {

      const response = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
        }),
      });

      const data = await response.json();

      if (data.id) {

        window.location.href =
          `https://www.mercadopago.cl/checkout/v1/redirect?pref_id=${data.id}`;

      }

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <main className="bg-black min-h-screen text-white p-5 md:p-10">

      <div className="mb-12">

        <Link href="/carrito">

          <button className="mb-6 bg-[#111111] px-5 py-3 rounded-full hover:bg-white hover:text-black transition">

            ← Volver al carrito

          </button>

        </Link>

        <h1 className="text-6xl font-black">
          CHECKOUT
        </h1>

        <p className="text-gray-400 mt-4">
          Finaliza tu compra premium
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        <div className="bg-[#111111] rounded-[35px] p-8 border border-white/5">

          <h2 className="text-3xl font-black mb-8">
            Tu pedido
          </h2>

          <div className="flex flex-col gap-5">

            {cart.map((item: any) => (

              <div
                key={`${item.id}-${item.talla}`}
                className="flex items-center gap-5 border-b border-white/10 pb-5"
              >

                <img
                  src={item.imagen}
                  className="w-[100px] h-[100px] rounded-[20px] object-cover"
                />

                <div className="flex-1">

                  <h3 className="text-xl font-bold">
                    {item.nombre}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    Talla: {item.talla}
                  </p>

                  <p className="text-gray-400">
                    Cantidad: {item.cantidad}
                  </p>

                </div>

                <p className="text-xl font-black">

                  $
                  {(
                    Number(item.precio) *
                    item.cantidad
                  ).toLocaleString("es-CL")}

                </p>

              </div>

            ))}

          </div>

        </div>

        <div className="bg-[#111111] rounded-[35px] p-8 border border-white/5 h-fit">

          <h2 className="text-3xl font-black mb-8">
            Resumen
          </h2>

          <div className="flex justify-between mb-5">

            <p className="text-gray-400">
              Productos
            </p>

            <p>
              {cart.length}
            </p>

          </div>

          <div className="flex justify-between mb-5">

            <p className="text-gray-400">
              Envío
            </p>

            <p>
              Gratis
            </p>

          </div>

          <div className="border-t border-white/10 pt-6 mt-6 flex justify-between items-center">

            <p className="text-2xl font-black">
              Total
            </p>

            <p className="text-3xl font-black">

              $
              {total.toLocaleString("es-CL")}

            </p>

          </div>

          <button
            onClick={pagar}
            className="
              w-full
              mt-10
              bg-white
              text-black
              py-5
              rounded-full
              font-black
              text-lg
              hover:scale-[1.02]
              transition
            "
          >

            Pagar ahora

          </button>

          <p className="text-center text-gray-500 mt-5 text-sm">

            Pago 100% seguro y protegido.

          </p>

        </div>

      </div>

    </main>

  );

}