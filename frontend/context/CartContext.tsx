"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [cart, setCart] = useState<any[]>([]);

  const [favorites, setFavorites] = useState<any[]>([]);

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

      setFavorites([...favorites, producto]);

    }

  };

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
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