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

    const precio =
      typeof item.precio === "number"
        ? item.precio
        : Number(
            item.precio
              ?.toString()
              .replace("$", "")
              .replace(/\./g, "")
          );

    return acc + precio * item.cantidad;

  }, 0);

  return (

    <main className="bg-black min-h-screen text-white p-5 md:p-10">

      {/* VOLVER */}
      <Link href="/">

        <button className="mb-8 bg-[#111111] px-6 py-3 rounded-full hover:scale-105 hover:bg-[#1b1b1b] transition duration-300">

          ← Seguir comprando

        </button>

      </Link>

      {/* TITULO */}
      <div className="flex items-center justify-between mb-12">

        <h1 className="text-5xl md:text-6xl font-black tracking-tight">

          CARRITO

        </h1>

        <div className="text-gray-400 text-sm md:text-base">

          {cart.length} productos

        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* PRODUCTOS */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {cart.length === 0 ? (

            <div className="bg-[#111111] rounded-[30px] p-14 text-center border border-white/5">

              <h2 className="text-2xl font-bold mb-3">

                Tu carrito está vacío

              </h2>

              <p className="text-gray-400 mb-8">

                Agrega productos para comenzar tu compra.

              </p>

              <Link href="/">

                <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition">

                  Ir al catálogo

                </button>

              </Link>

            </div>

          ) : (

            cart.map((producto: any, index: number) => (

              <div
                key={index}
                className="bg-[#111111] rounded-[35px] p-5 md:p-6 flex flex-col md:flex-row gap-6 items-center border border-white/5 hover:border-white/10 hover:scale-[1.01] transition duration-300"
              >

                {/* IMAGEN */}
                <div className="overflow-hidden rounded-[25px]">

                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-[160px] h-[160px] object-cover hover:scale-110 transition duration-500"
                  />

                </div>

                {/* INFO */}
                <div className="flex-1 w-full">

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                    <div>

                      <h2 className="text-2xl font-bold leading-tight">

                        {producto.nombre}

                      </h2>

                      <p className="text-gray-400 mt-3">

                        Categoría: {producto.categoria || "Fashion"}

                      </p>

                      <p className="text-gray-400 mt-1">

                        Talla: {producto.talla || "Única"}

                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-3xl font-black">

                        $
                        {Number(producto.precio).toLocaleString("es-CL")}

                      </p>

                    </div>

                  </div>

                  {/* CONTROLES */}
                  <div className="flex items-center justify-between mt-8">

                    {/* CANTIDAD */}
                    <div className="flex items-center gap-4 bg-black rounded-full px-4 py-2 border border-white/10">

                      <button

                        onClick={() =>
                          decreaseQuantity(
                            producto.id,
                            producto.talla
                          )
                        }

                        className="w-9 h-9 bg-[#151515] rounded-full text-xl hover:scale-110 hover:bg-[#222] transition"
                      >

                        -

                      </button>

                      <span className="text-lg font-bold min-w-[20px] text-center">

                        {producto.cantidad}

                      </span>

                      <button

                        onClick={() =>
                          increaseQuantity(
                            producto.id,
                            producto.talla
                          )
                        }

                        className="w-9 h-9 bg-[#151515] rounded-full text-xl hover:scale-110 hover:bg-[#222] transition"
                      >

                        +

                      </button>

                    </div>

                    {/* SUBTOTAL */}
                    <div>

                      <p className="text-gray-400 text-sm">

                        Subtotal

                      </p>

                      <p className="text-xl font-bold">

                        $
                        {(
                          Number(producto.precio) *
                          producto.cantidad
                        ).toLocaleString("es-CL")}

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

        {/* RESUMEN */}
        <div className="bg-[#111111] rounded-[35px] p-8 h-fit sticky top-24 border border-white/5">

          <h2 className="text-3xl font-black mb-10">

            RESUMEN

          </h2>

          {/* ITEMS */}
          <div className="space-y-5">

            <div className="flex justify-between">

              <p className="text-gray-400">

                Productos

              </p>

              <p className="font-semibold">

                {cart.length}

              </p>

            </div>

            <div className="flex justify-between">

              <p className="text-gray-400">

                Envío

              </p>

              <p className="font-semibold text-green-400">

                Gratis

              </p>

            </div>

            <div className="flex justify-between">

              <p className="text-gray-400">

                IVA

              </p>

              <p className="font-semibold">

                Incluido

              </p>

            </div>

          </div>

          {/* TOTAL */}
          <div className="border-t border-white/10 pt-6 mt-8 flex justify-between items-center">

            <p className="text-2xl font-bold">

              Total

            </p>

            <p className="text-3xl font-black">

              ${total.toLocaleString("es-CL")}

            </p>

          </div>

          {/* CHECKOUT */}
          <Link href="/checkout">

            <button className="w-full bg-white text-black py-5 rounded-full text-lg font-black mt-10 hover:scale-[1.02] hover:bg-gray-200 transition duration-300">

              Finalizar compra

            </button>

          </Link>

          {/* EXTRA */}
          <div className="mt-6 text-center text-sm text-gray-500">

            Pago 100% seguro y protegido.

          </div>

        </div>

      </div>

    </main>

  );

}