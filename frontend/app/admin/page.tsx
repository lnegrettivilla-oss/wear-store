"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {

  const [productos, setProductos] = useState<any[]>([]);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("hombre");
  const [stock, setStock] = useState("");

  const [imagen1, setImagen1] = useState<any>(null);
  const [imagen2, setImagen2] = useState<any>(null);
  const [imagen3, setImagen3] = useState<any>(null);
  const [imagen4, setImagen4] = useState<any>(null);

  const [portada, setPortada] = useState(1);

  useEffect(() => {

    cargarProductos();

  }, []);

  async function cargarProductos() {

    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (data) {

      setProductos(data);

    }

  }

  async function subirImagen(file: any) {

    if (!file) return "";

    const nombreArchivo =
      `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("productos")
      .upload(nombreArchivo, file);

    if (error) {

      console.log(error);

      return "";

    }

    const { data } = supabase.storage
      .from("productos")
      .getPublicUrl(nombreArchivo);

    return data.publicUrl;

  }

  async function agregarProducto() {

    const url1 = await subirImagen(imagen1);
    const url2 = await subirImagen(imagen2);
    const url3 = await subirImagen(imagen3);
    const url4 = await subirImagen(imagen4);

    const activo =
      Number(stock) > 0;

    const { error } = await supabase
      .from("products")
      .insert([
        {
          nombre,
          precio: Number(precio),
          categoria,
          stock: Number(stock),

          imagen: url1,
          imagen2: url2,
          imagen3: url3,
          imagen4: url4,

          portada,
          activo,
        },
      ]);

    if (error) {

      console.log(error);

      alert("Error al crear producto");

      return;

    }

    alert("Producto agregado");

    setNombre("");
    setPrecio("");
    setStock("");

    cargarProductos();

  }

  async function eliminarProducto(id: number) {

    const confirmar =
      confirm("Eliminar producto?");

    if (!confirmar) return;

    await supabase
      .from("products")
      .delete()
      .eq("id", id);

    cargarProductos();

  }

  async function actualizarStock(
    id: number,
    nuevoStock: number
  ) {

    const activo =
      nuevoStock > 0;

    await supabase
      .from("products")
      .update({
        stock: nuevoStock,
        activo,
      })
      .eq("id", id);

    cargarProductos();

  }

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-black mb-10">
        PANEL ADMIN
      </h1>

      <div className="bg-[#111111] p-8 rounded-[30px] mb-10">

        <h2 className="text-3xl font-black mb-8">
          Agregar producto
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) =>
              setNombre(e.target.value)
            }
            className="bg-black p-4 rounded-xl"
          />

          <input
            placeholder="Precio"
            value={precio}
            onChange={(e) =>
              setPrecio(e.target.value)
            }
            className="bg-black p-4 rounded-xl"
          />

          <input
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            className="bg-black p-4 rounded-xl"
          />

          <select
            value={categoria}
            onChange={(e) =>
              setCategoria(e.target.value)
            }
            className="bg-black p-4 rounded-xl"
          >

            <option value="hombre">
              Hombre
            </option>

            <option value="mujer">
              Mujer
            </option>

          </select>

        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-5">

          <div>

            <p className="mb-2">
              Imagen principal
            </p>

            <input
              type="file"
              onChange={(e) =>
                setImagen1(e.target.files?.[0])
              }
            />

          </div>

          <div>

            <p className="mb-2">
              Imagen secundaria 1
            </p>

            <input
              type="file"
              onChange={(e) =>
                setImagen2(e.target.files?.[0])
              }
            />

          </div>

          <div>

            <p className="mb-2">
              Imagen secundaria 2
            </p>

            <input
              type="file"
              onChange={(e) =>
                setImagen3(e.target.files?.[0])
              }
            />

          </div>

          <div>

            <p className="mb-2">
              Imagen secundaria 3
            </p>

            <input
              type="file"
              onChange={(e) =>
                setImagen4(e.target.files?.[0])
              }
            />

          </div>

        </div>

        <div className="mt-8">

          <p className="mb-3">
            Elegir portada
          </p>

          <select
            value={portada}
            onChange={(e) =>
              setPortada(Number(e.target.value))
            }
            className="bg-black p-4 rounded-xl"
          >

            <option value={1}>
              Imagen 1
            </option>

            <option value={2}>
              Imagen 2
            </option>

            <option value={3}>
              Imagen 3
            </option>

            <option value={4}>
              Imagen 4
            </option>

          </select>

        </div>

        <button
          onClick={agregarProducto}
          className="
            mt-10
            bg-white
            text-black
            px-10
            py-5
            rounded-full
            font-black
          "
        >

          Agregar producto

        </button>

      </div>

      <div className="grid gap-5">

        {productos.map((producto) => (

          <div
            key={producto.id}
            className="
              bg-[#111111]
              p-5
              rounded-[25px]
              flex
              flex-col
              md:flex-row
              gap-5
              items-center
              justify-between
            "
          >

            <div className="flex items-center gap-5">

              <img
                src={producto.imagen}
                className="
                  w-[100px]
                  h-[100px]
                  rounded-[20px]
                  object-cover
                "
              />

              <div>

                <h3 className="text-2xl font-black">
                  {producto.nombre}
                </h3>

                <p className="text-gray-400">
                  {producto.categoria}
                </p>

                <p className="text-gray-400">
                  Stock: {producto.stock}
                </p>

                <p className="text-xl font-black mt-2">

                  $
                  {Number(
                    producto.precio
                  ).toLocaleString("es-CL")}

                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  actualizarStock(
                    producto.id,
                    producto.stock + 1
                  )
                }
                className="
                  bg-green-500
                  px-5
                  py-3
                  rounded-xl
                  font-bold
                "
              >

                + Stock

              </button>

              <button
                onClick={() =>
                  actualizarStock(
                    producto.id,
                    producto.stock - 1
                  )
                }
                className="
                  bg-yellow-500
                  px-5
                  py-3
                  rounded-xl
                  font-bold
                "
              >

                - Stock

              </button>

              <button
                onClick={() =>
                  eliminarProducto(producto.id)
                }
                className="
                  bg-red-500
                  px-5
                  py-3
                  rounded-xl
                  font-bold
                "
              >

                Eliminar

              </button>

            </div>

          </div>

        ))}

      </div>

    </main>

  );

}