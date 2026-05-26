import Link from "next/link";

export default function Home() {

  return (
    <main className="bg-black min-h-screen text-white p-5">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center pt-24 pb-20">

        <p className="text-gray-500 uppercase tracking-[6px] text-sm">
          New Collection 2026
        </p>

        <h1 className="text-7xl font-black tracking-[14px] mt-6">
          WEAR
        </h1>

        <p className="text-gray-400 mt-8 text-lg max-w-[320px] leading-relaxed">
          Minimal fashion diseñada para un estilo urbano premium.
        </p>

      </section>

      {/* CATEGORÍAS */}
      <section className="grid grid-cols-1 gap-6">

        {/* MUJER */}
        <Link href="/mujer">

          <div
            className="
              relative
              rounded-[35px]
              overflow-hidden
              h-[260px]
              flex
              items-end
              p-8
              transition
              duration-500
              hover:scale-[1.03]
            "
            style={{
              backgroundImage: "url('/imagenes/woman.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10">

              <p className="text-sm tracking-[4px] text-gray-300 uppercase">
                Colección
              </p>

              <h2 className="text-5xl font-black mt-3">
                MUJER
              </h2>

            </div>

          </div>

        </Link>

        {/* HOMBRE */}
        <Link href="/hombre">

          <div
            className="
              relative
              rounded-[35px]
              overflow-hidden
              h-[260px]
              flex
              items-end
              p-8
              transition
              duration-500
              hover:scale-[1.03]
            "
            style={{
              backgroundImage: "url('/imagenes/man.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10">

              <p className="text-sm tracking-[4px] text-gray-300 uppercase">
                Colección
              </p>

              <h2 className="text-5xl font-black mt-3">
                HOMBRE
              </h2>

            </div>

          </div>

        </Link>

      </section>

    </main>
  );
}