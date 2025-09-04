
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '@/types';

// Defines the structure of a single item in the shopping cart.
export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  isCustom: boolean; // Flag to indicate if it's a custom-sized item.
}

// Defines the shape of the context that will be provided to consuming components.
interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateItemQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

// Creates the React Context for the cart. It's initially undefined.
const CartContext = createContext<CartContextType | undefined>(undefined);

// The CartProvider component wraps parts of the app that need access to cart state.
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initializes the cart state. It tries to load the saved cart from localStorage on the client-side.
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // This check ensures localStorage is only accessed in the browser, not during server-side rendering.
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      // If a cart exists in localStorage, parse it. Otherwise, return an empty array.
      return savedCart ? JSON.parse(savedCart) : [];
    }
    // On the server, return an empty array.
    return [];
  });

  // This effect runs whenever `cartItems` changes. It saves the current cart state to localStorage.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add an item to the cart.
  const addItem = (newItem: CartItem) => {
    setCartItems(prevItems => {
      // Checks if an item with the same product ID and size already exists in the cart.
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === newItem.product.id && item.size === newItem.size
      );

      // If the item exists, update its quantity.
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // If the item is new, add it to the cart.
        return [...prevItems, newItem];
      }
    });
  };

  // Function to remove an item from the cart completely.
  const removeItem = (productId: string, size: string) => {
    setCartItems(prevItems =>
      // Filters out the item that matches the given productId and size.
      prevItems.filter(item => !(item.product.id === productId && item.size === size))
    );
  };

  // Function to update the quantity of a specific item in the cart.
  const updateItemQuantity = (productId: string, size: string, quantity: number) => {
    // If the new quantity is zero or less, remove the item from the cart.
    if (quantity <= 0) {
      removeItem(productId, size);
    } else {
      // Otherwise, update the quantity of the matching item.
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    }
  };
  
  // Function to clear all items from the cart.
  const clearCart = () => {
    setCartItems([]);
  }

  // Provides the cart state and updater functions to all children components.
  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easy access to the cart context.
export const useCart = () => {
  const context = useContext(CartContext);
  // Throws an error if the hook is used outside of a CartProvider, which is a common mistake.
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
