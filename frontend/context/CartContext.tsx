"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext<any>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [cart, setCart] = useState<any[]>([]);

  const [favorites, setFavorites] = useState<any[]>([]);

  /* CARGAR LOCALSTORAGE */
  useEffect(() => {

    const savedCart =
      localStorage.getItem("wear-cart");

    const savedFavorites =
      localStorage.getItem(
        "wear-favorites"
      );

    if (savedCart) {

      setCart(JSON.parse(savedCart));

    }

    if (savedFavorites) {

      setFavorites(
        JSON.parse(savedFavorites)
      );

    }

  }, []);

  /* GUARDAR CARRITO */
  useEffect(() => {

    localStorage.setItem(
      "wear-cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  /* GUARDAR FAVORITOS */
  useEffect(() => {

    localStorage.setItem(
      "wear-favorites",
      JSON.stringify(favorites)
    );

  }, [favorites]);

  /* AGREGAR CARRITO */
  const addToCart = (producto: any) => {

    const existe = cart.find(
      (item) =>
        item.id === producto.id &&
        item.talla === producto.talla
    );

    if (existe) {

      setCart(

        cart.map((item) =>

          item.id === producto.id &&
          item.talla === producto.talla

            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }

            : item

        )

      );

    } else {

      setCart([
        ...cart,
        {
          ...producto,
          cantidad: 1,
        },
      ]);

    }

  };

  /* SUMAR */
  const increaseQuantity = (
    id: number,
    talla: string
  ) => {

    setCart(

      cart.map((item) =>

        item.id === id &&
        item.talla === talla

          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }

          : item

      )

    );

  };

  /* RESTAR */
  const decreaseQuantity = (
    id: number,
    talla: string
  ) => {

    setCart(

      cart
        .map((item) =>

          item.id === id &&
          item.talla === talla

            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }

            : item

        )
        .filter((item) => item.cantidad > 0)

    );

  };

  /* ELIMINAR */
  const removeFromCart = (
    id: number,
    talla: string
  ) => {

    setCart(

      cart.filter(
        (item) =>
          !(
            item.id === id &&
            item.talla === talla
          )
      )

    );

  };

  /* LIMPIAR */
  const clearCart = () => {

    setCart([]);

  };

  /* FAVORITOS */
  const toggleFavorite = (producto: any) => {

    const exists = favorites.find(
      (item) => item.id === producto.id
    );

    if (exists) {

      setFavorites(
        favorites.filter(
          (item) => item.id !== producto.id
        )
      );

    } else {

      setFavorites([
        ...favorites,
        producto,
      ]);

    }

  };

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        favorites,
        toggleFavorite,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export function useCart() {

  return useContext(CartContext);

}