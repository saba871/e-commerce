import { createContext, useContext, useEffect, useState } from "react";


const ItemContext = createContext();

export const useItem = () => useContext(ItemContext);


const API_URL = import.meta.env.VITE_API_URL + '/api/marketplace';

export const ItemProvider = ({ children }) => {

    const [items, setItems] = useState([]);

    const getItems = async () => {
        try {
            const res = await fetch(`${API_URL}`)

            const result = await res.json()

            setItems(result)
        } catch (error) {
            console.log("error in getItems", error);
        }
    }

    useEffect(() => {
        getItems()
    }, [])


    // admin can add items
    const addItem = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObj),
                credentials: 'include'
            })

            const result = await res.json()

            setItems(prev => [...prev, result])
        } catch (error) {
            console.log("error in addItem", error);
        }
    }


    // admin can delete items
    const deleteItem = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            const result = await res.json()

            setItems(prev => prev.filter(item => item._id !== id))
        } catch (error) {
            console.log("error in deleteItem", error);
        }
    }


    // admin car update

    const updateItem = async (id, formObj) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObj),
                credentials: 'include'
            })

            const result = await res.json()
            setItems(prev => prev.map(item => item._id === id ? result : item))
        } catch (error) {
            console.log("error in updateItem", error);
        }
    }

    return (
        <ItemContext.Provider value={{ items, getItems, addItem, deleteItem, updateItem }}>
            {children}
        </ItemContext.Provider>
    )
}
