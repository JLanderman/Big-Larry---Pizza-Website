import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decodeJwt } from "jose";

const AuthContext = createContext({
    auth: false, // authorized admin
    loggedIn: false, // login status
    setAuth: () => { },
    setLoggedIn: () => { },
});

export const useAuth = () => useContext(AuthContext); // used by children

const AuthProvider = ({ children, initialState }) => {
    const [auth, setAuth] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => { // Set initial auth status based on presence of token
        if (initialState) { // Initializes context with values. Used for testing.
            setLoggedIn(initialState.loggedIn || false);
            setAuth(initialState.auth || false);
            return;
        }

        const jwt = Cookies.get('x-auth-token');

        if (jwt) { // Uses cookie to generate context
            const claims = decodeJwt(jwt);
            const exp = new Date(claims.expiration);
            const now = new Date().getTime();

            if (now > exp) { // Expired token
                Cookies.remove('x-auth-token');
            } else { // Currently logged in
                setLoggedIn(true);
                if (claims.user.isAdmin && claims.user.isAdmin === true) setAuth(true);
            }
        };
    }, [initialState]);

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