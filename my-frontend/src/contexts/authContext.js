import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    auth: false, // authorized admin
    loggedIn: false, // login status
    setAuth: () => {},
    setLoggedIn: () => {},
});

export const useAuth = () => useContext(AuthContext); // used by children

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const value = { // makes values visible to children
        auth,
        setAuth,
        loggedIn,
        setLoggedIn,
    };

    return ( // wraps around child nodes
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;