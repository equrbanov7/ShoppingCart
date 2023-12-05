import { createContext, useContext, ReactNode, useState } from "react";
import ShoppingCartModal from "../pages/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;

  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
};
type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[]);


  const [isOpen, setIsOpen]= useState<boolean>(false)
  
  //console.log(isOpen)
  //Getting and Adding Items
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  // Increasing items quantity
  function increaseCartQuantity(id: number) {
    setCartItems((carrItems) => {
      if (carrItems.find((item) => item.id === id) == null) {
        return [...carrItems, { id, quantity: 1 }];
      } else {
        return carrItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // Decreasing item quantity
  function decreaseCartQuantity(id: number) {
    setCartItems((carrItems) => {
      if (carrItems.find((item) => item.id === id)?.quantity == 1) {
        return carrItems.filter((item) => item.id !== id);
      } else {
        return carrItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // Remove item

  function removeFromCart(id: number) {
    setCartItems((carrItems) => {
      return carrItems.filter((item) => item.id !== id);
    });
  }

  // Cart Quantity

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  // Opening Cart

  const openCart = ()=> setIsOpen(true)

  // Closing Cart
  const closeCart = ()=> setIsOpen(false)

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCartModal isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
