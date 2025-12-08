import React, { createContext, useState } from "react";
import api from "../services/api";


export const AuthContext = createContext();


export function AuthProvider({ children }) {
const [user, setUser] = useState(null);


async function login(email, senha, tipo) {
const res = await api.post(`/auth/login`, { email, senha, tipo });
setUser(res.data);
}


async function register(data) {
const res = await api.post(`/auth/register`, data);
setUser(res.data);
}


function logout() {
setUser(null);
}


return (
<AuthContext.Provider value={{ user, login, register, logout }}>
{children}
</AuthContext.Provider>
);
}