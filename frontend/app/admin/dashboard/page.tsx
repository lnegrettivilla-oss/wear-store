"use client";

import { useState } from "react";

import { supabase } from "../../../lib/supabase";

export default function DashboardPage() {

  const [nombre, setNombre] = useState("");

  const [precio, setPrecio] = useState("");

  const [categoria, setCategoria] = useState("hombre");

  const [descripcion, setDescripcion] = useState("");

  const [stock, setStock] = useState("");

  const [imagen, setImagen] = useState<any>(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  async function subirImagen() {

    if (!imagen) return null;

    const nombreArchivo = `${Date.now()}-${imagen.name}`;

    const { error } = await supabase.storage
      .from("productos")
      .upload(nombreArchivo, imagen);

    if (error) {

      console.error(error);

      return null;

    }

    const { data } = supabase.storage
      .from("productos")
      .getPublicUrl(nombreArchivo);

    return data.publicUrl;

  }

  async function crearProducto(e: any) {

    e.preventDefault();

    setLoading(true);

    const imageUrl = await subirImagen();

    if (!imageUrl) {

      alert("Error subiendo imagen");

      setLoading(false);

      return;

    }

    const { error } = await supabase
      .from("products")
      .insert([
        {
          nombre,
          precio: Number(precio),
          imagen: imageUrl,
          categoria,
          descripcion,
          stock: Number(stock),
        },
      ]);

    setLoading(false);

    if (error) {

      console.error(error);

      alert("Error creando producto");

    } else {

      alert("Producto creado correctamente");

      setNombre("");
      setPrecio("");
      setDescripcion("");
      setStock("");
      setPreview("");
      setImagen(null);

    }

  }

  return (

    <main className="bg-black min-h-screen text-white p-5 md:p-10">

      {/* HEADER */}
      <div className="mb-14">

        <p className="text-gray-500 uppercase tracking-[5px] text-sm">

          Panel administrador

        </p>

        <h1 className="text-6xl font-black mt-5">

          DASHBOARD

        </h1>

      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* FORM */}
        <div className="bg-[#111111] rounded-[35px] p-8 border border-white/5">

          <h2 className="text-3xl font-black mb-8">

            Crear producto

          </h2>

          <form
            onSubmit={crearProducto}
            className="flex flex-col gap-5"
          >

            <input
              type="text"
              placeholder="Nombre producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="bg-black border border-white/10 rounded-full px-6 py-4 outline-none"
              required
            />

            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="bg-black border border-white/10 rounded-full px-6 py-4 outline-none"
              required
            />

            {/* IMAGEN */}
            <div>

              <label className="block mb-3 text-gray-400">

                Imagen producto

              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => {

                  setImagen(e.target.files[0]);

                  setPreview(
                    URL.createObjectURL(
                      e.target.files[0]
                    )
                  );

                }}
                className="w-full bg-black border border-white/10 rounded-full px-6 py-4"
                required
              />

            </div>

            {/* PREVIEW */}
            {preview && (

              <div className="overflow-hidden rounded-[30px] border border-white/10">

                <img
                  src={preview}
                  className="w-full h-[320px] object-cover"
                />

              </div>

            )}

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="bg-black border border-white/10 rounded-full px-6 py-4 outline-none"
            >

              <option value="hombre">

                Hombre

              </option>

              <option value="mujer">

                Mujer

              </option>

            </select>

            <textarea
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="bg-black border border-white/10 rounded-[25px] px-6 py-4 outline-none h-[140px]"
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="bg-black border border-white/10 rounded-full px-6 py-4 outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="
                bg-white
                text-black
                py-5
                rounded-full
                font-black
                text-lg
                hover:scale-[1.02]
                transition
                duration-300
                mt-4
              "
            >

              {loading
                ? "Subiendo producto..."
                : "Crear producto"}

            </button>

          </form>

        </div>

        {/* INFO */}
        <div className="flex flex-col gap-6">

          <div className="bg-[#111111] rounded-[35px] p-8 border border-white/5">

            <p className="text-gray-400">

              Estado sistema

            </p>

            <h2 className="text-4xl font-black mt-4 text-green-500">

              ONLINE

            </h2>

          </div>

          <div className="bg-[#111111] rounded-[35px] p-8 border border-white/5">

            <p className="text-gray-400">

              Base de datos

            </p>

            <h2 className="text-4xl font-black mt-4">

              Supabase

            </h2>

          </div>

          <div className="bg-[#111111] rounded-[35px] p-8 border border-white/5">

            <p className="text-gray-400">

              Storage imágenes

            </p>

            <h2 className="text-4xl font-black mt-4">

              ACTIVO

            </h2>

          </div>

        </div>

      </div>

    </main>

  );

}