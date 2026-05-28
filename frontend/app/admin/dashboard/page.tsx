"use client";

import { useEffect, useState } from "react";

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

  const [productos, setProductos] = useState<any[]>([]);

  const [editando, setEditando] = useState<any>(null);

  useEffect(() => {

    obtenerProductos();

  }, []);

  async function obtenerProductos() {

    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (data) {

      setProductos(data);

    }

  }

  async function eliminarProducto(id: number) {

    const confirmar = confirm(
      "¿Eliminar producto?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {

      alert("Error eliminando producto");

    } else {

      alert("Producto eliminado");

      obtenerProductos();

    }

  }

  async function actualizarProducto() {

    if (!editando) return;

    const { error } = await supabase
      .from("products")
      .update({
        nombre: editando.nombre,
        precio: Number(editando.precio),
        descripcion: editando.descripcion,
        stock: Number(editando.stock),
        categoria: editando.categoria,
      })
      .eq("id", editando.id);

    if (error) {

      console.log(error);

      alert("Error actualizando producto");

    } else {

      alert("Producto actualizado");

      setEditando(null);

      obtenerProductos();

    }

  }

  async function crearProducto() {

    try {

      setLoading(true);

      if (!imagen) {

        alert("Selecciona una imagen");

        setLoading(false);

        return;

      }

      const fileName =
        `${Date.now()}-${imagen.name}`;

      const { error: uploadError } =
        await supabase.storage
          .from("productos")
          .upload(fileName, imagen);

      if (uploadError) {

        console.log(uploadError);

        alert("Error subiendo imagen");

        setLoading(false);

        return;

      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("productos")
        .getPublicUrl(fileName);

      const { error } = await supabase
        .from("products")
        .insert([
          {
            nombre,
            precio: Number(precio),
            imagen: publicUrl,
            categoria,
            descripcion,
            stock: Number(stock),
          },
        ]);

      if (error) {

        console.log(error);

        alert("Error creando producto");

      } else {

        alert("Producto creado correctamente");

        setNombre("");
        setPrecio("");
        setDescripcion("");
        setStock("");
        setPreview("");
        setImagen(null);
        setCategoria("hombre");

        obtenerProductos();

      }

    } catch (error) {

      console.log(error);

      alert("Ocurrió un error");

    } finally {

      setLoading(false);

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

      <div className="grid xl:grid-cols-2 gap-10">

        {/* FORMULARIO */}
        <div className="bg-[#111111] rounded-[35px] p-8 border border-white/5">

          <h2 className="text-3xl font-black mb-8">

            Crear producto

          </h2>

          <div className="flex flex-col gap-5">

            <input
              type="text"
              placeholder="Nombre producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="bg-black border border-white/10 rounded-full px-6 py-4 outline-none"
            />

            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="bg-black border border-white/10 rounded-full px-6 py-4 outline-none"
            />

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
              className="bg-black border border-white/10 rounded-full px-6 py-4"
            />

            {preview && (

              <img
                src={preview}
                className="w-full h-[300px] object-cover rounded-[30px]"
              />

            )}

            <select
              value={categoria}
              onChange={(e) =>
                setCategoria(e.target.value)
              }
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
              onChange={(e) =>
                setDescripcion(e.target.value)
              }
              className="bg-black border border-white/10 rounded-[25px] px-6 py-4 h-[140px] outline-none"
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
              className="bg-black border border-white/10 rounded-full px-6 py-4 outline-none"
            />

            <button
              onClick={crearProducto}
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
              "
            >

              {loading
                ? "Creando..."
                : "Crear producto"}

            </button>

          </div>

        </div>

        {/* PRODUCTOS */}
        <div className="flex flex-col gap-5">

          {productos.map((producto) => (

            <div
              key={producto.id}
              className="bg-[#111111] rounded-[30px] overflow-hidden border border-white/5"
            >

              <img
                src={producto.imagen}
                className="w-full h-[240px] object-cover"
              />

              <div className="p-5">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h2 className="text-2xl font-black">

                      {producto.nombre}

                    </h2>

                    <p className="text-gray-400 mt-2">

                      {producto.descripcion}

                    </p>

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        setEditando(producto)
                      }
                      className="
                        bg-blue-500
                        px-4
                        py-2
                        rounded-full
                        hover:scale-105
                        transition
                      "
                    >

                      Editar

                    </button>

                    <button
                      onClick={() =>
                        eliminarProducto(producto.id)
                      }
                      className="
                        bg-red-500
                        px-4
                        py-2
                        rounded-full
                        hover:scale-105
                        transition
                      "
                    >

                      Eliminar

                    </button>

                  </div>

                </div>

                <div className="flex justify-between mt-6">

                  <p className="text-2xl font-black">

                    $
                    {Number(
                      producto.precio
                    ).toLocaleString("es-CL")}

                  </p>

                  <p className="text-gray-400">

                    Stock: {producto.stock}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* MODAL EDITAR */}
      {editando && (

        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-5">

          <div className="bg-[#111111] rounded-[35px] p-8 w-full max-w-[600px] border border-white/10">

            <h2 className="text-4xl font-black mb-8">

              Editar producto

            </h2>

            <div className="flex flex-col gap-5">

              <input
                type="text"
                value={editando.nombre}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    nombre: e.target.value,
                  })
                }
                className="bg-black border border-white/10 rounded-full px-6 py-4 outline-none"
              />

              <input
                type="number"
                value={editando.precio}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    precio: e.target.value,
                  })
                }
                className="bg-black border border-white/10 rounded-full px-6 py-4 outline-none"
              />

              <textarea
                value={editando.descripcion}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    descripcion: e.target.value,
                  })
                }
                className="bg-black border border-white/10 rounded-[25px] px-6 py-4 h-[140px] outline-none"
              />

              <input
                type="number"
                value={editando.stock}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    stock: e.target.value,
                  })
                }
                className="bg-black border border-white/10 rounded-full px-6 py-4 outline-none"
              />

              <select
                value={editando.categoria}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    categoria: e.target.value,
                  })
                }
                className="bg-black border border-white/10 rounded-full px-6 py-4 outline-none"
              >

                <option value="hombre">

                  Hombre

                </option>

                <option value="mujer">

                  Mujer

                </option>

              </select>

              <div className="flex gap-4 mt-5">

                <button
                  onClick={actualizarProducto}
                  className="
                    flex-1
                    bg-white
                    text-black
                    py-5
                    rounded-full
                    font-black
                    hover:scale-[1.02]
                    transition
                  "
                >

                  Guardar cambios

                </button>

                <button
                  onClick={() =>
                    setEditando(null)
                  }
                  className="
                    flex-1
                    bg-[#222]
                    py-5
                    rounded-full
                    font-black
                    hover:scale-[1.02]
                    transition
                  "
                >

                  Cancelar

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}