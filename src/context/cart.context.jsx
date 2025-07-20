import { createContext, useState } from "react";

const checkExistingItem = (cartItems, productToAdd) => {
  const exists = cartItems.some(cartItem => cartItem.id === productToAdd.id);

  if (exists) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const cartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        cartCount,
        addItemToCart : (productToAdd) => {
            setCartItems(checkExistingItem(cartItems, productToAdd));
        },
        removeItemFromCart: (productToRemove) => {
            const newCartItems = cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
            setCartItems(newCartItems);
        }
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}