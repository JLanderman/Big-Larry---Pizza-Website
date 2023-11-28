import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decodeJwt } from "jose";

const AuthContext = createContext({
    auth: false, // authorized admin
    loggedIn: false, // login status
    setAuth: () => {},
    setLoggedIn: () => {},
});

export const useAuth = () => useContext(AuthContext); // used by children

const AuthProvider = ({ children, initialState }) => {
    const [auth, setAuth] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => { // Set initial auth status based on presence of token
        const jwt = Cookies.get('x-auth-token');

        if (jwt){
            const claims = decodeJwt(jwt);
            const exp = new Date(claims.expiration);
            const now = new Date().getTime();
        
            if (now > exp){ // expired token
                Cookies.remove('x-auth-token');
            } else { // currently logged in
                setLoggedIn(true);
                if (claims.user.isAdmin && claims.user.isAdmin == true) setAuth(true);
            }
        };

        // Initializes context with values. Used for testing.
        if (initialState){
            setLoggedIn(initialState.loggedIn || false);
            setAuth(initialState.loggedIn || false);
        }
    }, []);

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