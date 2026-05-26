import "./globals.css";

import Link from "next/link";

import { CartProvider } from "../context/CartContext";
import Header from "./Header";

export const metadata = {
  title: "WEAR",
  description: "Fashion Premium Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="es">

      <body className="bg-black text-white">

        <CartProvider>

          <Header />

          {children}

        </CartProvider>

      </body>

    </html>

  );

}