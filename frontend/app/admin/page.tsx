const crearProducto = async () => {

  try {

    setLoading(true);

    if (!imagen) {

      alert("Debes seleccionar una imagen");

      setLoading(false);

      return;

    }

    /* NOMBRE ARCHIVO */
    const fileName = `${Date.now()}-${imagen.name}`;

    /* SUBIR IMAGEN */
    const { error: errorUpload } = await supabase.storage
      .from("productos")
      .upload(fileName, imagen);

    if (errorUpload) {

      console.log(errorUpload);

      alert("Error subiendo imagen");

      setLoading(false);

      return;

    }

    /* URL PUBLICA */
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("productos")
      .getPublicUrl(fileName);

    /* INSERTAR PRODUCTO */
    const { error: errorInsert } = await supabase
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

    if (errorInsert) {

      console.log(errorInsert);

      alert("Error creando producto");

      setLoading(false);

      return;

    }

    /* LIMPIAR FORMULARIO */
    setNombre("");

    setPrecio("");

    setDescripcion("");

    setStock("");

    setImagen(null);

    setCategoria("hombre");

    alert("Producto creado correctamente");

  } catch (error) {

    console.log(error);

    alert("Ocurrió un error inesperado");

  } finally {

    setLoading(false);

  }

};