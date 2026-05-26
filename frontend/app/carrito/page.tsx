"use client";

import Link from "next/link";

import { useCart } from "../../context/CartContext";

export default function CarritoPage() {

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce((acc: number, item: any) => {

    const precio = Number(
      item.precio.replace("$", "").replace(".", "")
    );

    return acc + precio * item.cantidad;

  }, 0);

  return (

    <main className="bg-black min-h-screen text-white p-5">

      {/* VOLVER */}
      <Link href="/">

        <button className="mb-8 bg-[#111111] px-5 py-3 rounded-full hover:scale-105 transition">

          ← Seguir comprando

        </button>

      </Link>

      {/* TITULO */}
      <h1 className="text-6xl font-black mb-12">

        CARRITO

      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* PRODUCTOS */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {cart.length === 0 ? (

            <div className="bg-[#111111] rounded-[30px] p-10 text-center text-gray-400">

              No hay productos en el carrito.

            </div>

          ) : (

            cart.map((producto: any, index: number) => (

              <div
                key={index}
                className="bg-[#111111] rounded-[30px] p-5 flex gap-5 items-center"
              >

                {/* IMAGEN */}
                <img
                  src={producto.imagen}
                  className="w-[140px] h-[140px] object-cover rounded-[20px]"
                />

                {/* INFO */}
                <div className="flex-1">

                  <h2 className="text-2xl font-bold">

                    {producto.nombre}

                  </h2>

                  <p className="text-gray-400 mt-2">

                    Talla: {producto.talla}

                  </p>

                  <p className="text-2xl font-bold mt-4">

                    {producto.precio}

                  </p>

                </div>

                {/* CANTIDAD */}
                <div className="flex items-center gap-4">

                  <button

                    onClick={() =>
                      decreaseQuantity(
                        producto.id,
                        producto.talla
                      )
                    }

                    className="w-10 h-10 bg-black rounded-full text-xl hover:scale-110 transition"
                  >

                    -

                  </button>

                  <span className="text-xl font-bold">

                    {producto.cantidad}

                  </span>

                  <button

                    onClick={() =>
                      increaseQuantity(
                        producto.id,
                        producto.talla
                      )
                    }

                    className="w-10 h-10 bg-black rounded-full text-xl hover:scale-110 transition"
                  >

                    +

                  </button>

                </div>

              </div>

            ))

          )}

        </div>

        {/* RESUMEN */}
        <div className="bg-[#111111] rounded-[35px] p-8 h-fit sticky top-24">

          <h2 className="text-3xl font-black mb-8">

            RESUMEN

          </h2>

          <div className="flex justify-between mb-4">

            <p className="text-gray-400">

              Productos

            </p>

            <p>

              {cart.length}

            </p>

          </div>

          <div className="flex justify-between mb-4">

            <p className="text-gray-400">

              Envío

            </p>

            <p>

              Gratis

            </p>

          </div>

          <div className="border-t border-white/10 pt-5 mt-5 flex justify-between text-2xl font-bold">

            <p>Total</p>

            <p>

              ${total.toLocaleString("es-CL")}

            </p>

          </div>

          {/* CHECKOUT */}
          <Link href="/checkout">

            <button className="w-full bg-white text-black py-5 rounded-full text-lg font-bold mt-10 hover:scale-[1.02] transition">

              Finalizar compra

            </button>

          </Link>

        </div>

      </div>

    </main>

  );

}