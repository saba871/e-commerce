import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = import.meta.env.VITE_API_URL + "/api/auth";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allUser, setAllUser] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const autoLogin = async () => {
            try {
                const res = await fetch(`${API_URL}/autoLogin`, {
                    method: "POST",
                    credentials: "include",
                });

                if (!res.ok) return;

                const result = await res.json();

                setUser(result.user);
                navigate("/panel");
            } catch (error) {
                console.log("error in autoLogin", error);
            }
        };

        autoLogin();
    }, []);

    const getAllUser = async () => {
        try {
            const res = await fetch(`${API_URL}`, {
                method: "GET",
                credentials: "include",
            });

            const result = await res.json();
            setAllUser(result);
        } catch (error) {
            console.log("error in getAllUser", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            const result = await res.json();
            setAllUser((prev) => prev.filter((user) => user._id !== id));
        } catch (error) {
            console.log("error in deleteUser", error);
        }
    };

    const changeUser = async (id, formObj) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formObj),
                credentials: "include",
            });

            const result = await res.json();
            setAllUser((prev) => prev.map((user) => (user._id === id ? result : user)));
        } catch (error) {
            console.log("error in changeUser", error);
        }
    };

    const signup = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formObj),
                credentials: "include",
            });

            const result = await res.json();
            setUser(result);
            navigate("/panel");
            console.log(result);
        } catch (error) {
            console.log("error in signup", error);
        }
    };

    const logIn = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formObj),
                credentials: "include",
            });

            const result = await res.json();
            setUser(result);
            navigate("/panel");
            console.log(result);
        } catch (error) {
            console.log("error in login", error);
        }
    };

    const logout = () => {
        try {
            const res = fetch(`${API_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });

            setUser(null);
            navigate("/");
        } catch (error) {
            console.log("error in logout", error);
        }
    };

    return <AuthContext.Provider value={{ user, signup, logIn, logout, getAllUser, allUser, deleteUser, changeUser }}>{children}</AuthContext.Provider>;
};
