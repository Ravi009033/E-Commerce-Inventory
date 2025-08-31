import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }){
    const [cart, setCart] =useState([]);

    const addToCart = (product, quantity = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item._id === product._id);
            if(existing){
                return prev.map(item =>
                    item._id === product._id ? {
                        ...item, quantity: item.quantity + quantity 
                    } : item)
            }
            return [...prev, { ...product, quantity }];
        });
    }

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item._id !== productId));
    }

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}