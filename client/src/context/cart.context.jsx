import { createContext, useContext, useEffect, useMemo, useReducer } from "react"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

const STORAGE_KEY = "lumen_cart_v1"

const initialState = {
    items: [],
    isOpen: false,
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case "HYDRATE_ITEMS":
            return { ...state, items: action.payload }
        case "TOGGLE_CART":
            return { ...state, isOpen: typeof action.payload === "boolean" ? action.payload : !state.isOpen }
        case "ADD_ITEM": {
            const existing = state.items.find((cartItem) => cartItem.id === action.payload.id)
            let updatedItems

            if (existing) {
                updatedItems = state.items.map((cartItem) =>
                    cartItem.id === action.payload.id
                        ? { ...cartItem, quantity: Math.min(cartItem.quantity + action.payload.quantity, 10) }
                        : cartItem,
                )
            } else {
                updatedItems = [...state.items, action.payload]
            }

            return { ...state, items: updatedItems, isOpen: true }
        }
        case "UPDATE_QUANTITY": {
            const { id, quantity } = action.payload
            if (quantity <= 0) {
                return { ...state, items: state.items.filter((item) => item.id !== id) }
            }
            return {
                ...state,
                items: state.items.map((item) => (item.id === id ? { ...item, quantity: Math.min(quantity, 10) } : item)),
            }
        }
        case "REMOVE_ITEM":
            return { ...state, items: state.items.filter((item) => item.id !== action.payload) }
        case "CLEAR_CART":
            return { ...state, items: [] }
        default:
            return state
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    // hydrate from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (!stored) return
        try {
            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed)) {
                dispatch({ type: "HYDRATE_ITEMS", payload: parsed })
            }
        } catch (error) {
            console.error("Error parsing cart storage", error)
        }
    }, [])

    // persist to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    }, [state.items])

    const addToCart = (product, quantity = 1) => {
        if (!product?._id) return
        dispatch({
            type: "ADD_ITEM",
            payload: {
                id: product._id,
                name: product.name,
                price: Number(product.price) || 0,
                image: product.image?.[0] ?? "",
                category: product.category,
                inStock: product.inStock,
                quantity,
            },
        })
    }

    const updateQuantity = (id, quantity) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })

    const removeFromCart = (id) => dispatch({ type: "REMOVE_ITEM", payload: id })

    const clearCart = () => dispatch({ type: "CLEAR_CART" })

    const toggleCart = (value) => dispatch({ type: "TOGGLE_CART", payload: value })

    const cartCount = useMemo(() => state.items.reduce((acc, item) => acc + item.quantity, 0), [state.items])

    const cartTotal = useMemo(() => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0), [state.items])

    const value = {
        cartItems: state.items,
        isCartOpen: state.isOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleCart,
        cartCount,
        cartTotal,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
