import { createContext, useState } from "react";

const checkExistingandAddItem = (cartItems, productToAdd) => {
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

const checkExistingandRemoveItem = (cartItems, productToAdd) => {
  const exists = cartItems.some(cartItem => cartItem.id === productToAdd.id);

  if (exists) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  } else {
    return [...cartItems];
  }
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const cartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const cartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        cartCount,
        cartTotal,
        addItemToCart : (productToAdd) => {
            setCartItems(checkExistingandAddItem(cartItems, productToAdd));
        },
        removeItemFromCart: (productToRemove) => {
            setCartItems(checkExistingandRemoveItem(cartItems,productToRemove));
        },
        clearItemFromCart: (productToClear) => {
            setCartItems(cartItems.filter(cartItem => cartItem.id !== productToClear.id));
        }
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}