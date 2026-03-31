import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <CartContext.Provider value={{ cart, setCart, user, setUser }}>
      {children}
    </CartContext.Provider>
  );
}
