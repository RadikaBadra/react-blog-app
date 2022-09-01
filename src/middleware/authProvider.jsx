    import React from "react";
    import { createContext, useState } from "react";
    import { useNavigate } from "react-router-dom";

    const AuthContext = createContext(null);

    export function AuthProvider({ children }) {
        const [token, setToken] = useState(localStorage.getItem("token") || null);
        const navigate = useNavigate();

        function isLogin(token) {
            localStorage.setItem("token", token);

            setToken(token);
            navigate("/");
        }

        function isLogout(){
            localStorage.removeItem("token");

            setToken(null);
            navigate("/login");
        }

        const data = {
            token,
            isLogin,
            isLogout
        }

        return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
    }

    export default AuthContext;