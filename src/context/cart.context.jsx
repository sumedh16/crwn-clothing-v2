import { createContext, useReducer } from "react";

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

const cartInitialState = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {}
};

const CartReducer = (state,action) => {
  console.log("action",{action});
  switch(action.type) {
    case 'SET_CART_OPEN': {
      return {
        ...state,
        isCartOpen: action.payload.isCartOpen
      }
    }
    case 'ADD_ITEM_TO_CART': {
      return {
        ...state,
        cartItems: checkExistingandAddItem(state.cartItems, action.payload.productToAdd)
      }
    }
    case 'REMOVE_ITEM_FROM_CART': {
      return {
        ...state,
        cartItems: checkExistingandRemoveItem(state.cartItems, action.payload.productToRemove)
      }
    }
    case 'CLEAR_ITEM_FROM_CART': {
      return {
        ...state,
        cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.productToClear.id)
      }
    }
    default:
      throw new Error(`Unhandled type ${action.type} in CartReducer`);
  }

}

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
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);

    const [state, dispatch] = useReducer(CartReducer, cartInitialState);
    const { isCartOpen, cartItems } = state;
    const cartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const cartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
    const value = {
        isCartOpen,
        cartItems,
        cartCount,
        cartTotal,
        setIsCartOpen: (isCartOpen) => {
            // setIsCartOpen(isCartOpen);
            dispatch({ type: 'SET_CART_OPEN', payload: { isCartOpen } });
        },
        addItemToCart : (productToAdd) => {
            // setCartItems(checkExistingandAddItem(cartItems, productToAdd));
            dispatch({ type: 'ADD_ITEM_TO_CART', payload: { productToAdd } });
        },
        removeItemFromCart: (productToRemove) => {
            // setCartItems(checkExistingandRemoveItem(cartItems,productToRemove));
            dispatch({type: 'REMOVE_ITEM_FROM_CART',payload :  { productToRemove }  });
        },
        clearItemFromCart: (productToClear) => {
            // setCartItems(cartItems.filter(cartItem => cartItem.id !== productToClear.id));
            dispatch({type: 'CLEAR_ITEM_FROM_CART', payload: { productToClear } });
        }
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}