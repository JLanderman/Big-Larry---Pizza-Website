import React from "react";
import styled from "styled-components";
import styles from "./details.css";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { decodeJwt } from "jose";

const Admin = () => {
    const token = Cookies.get('x-auth-token');
    const navigate = useNavigate();

    React.useEffect(() => { // check user authorization before rendering page
        async function checkAuthorization() {
            try{ 
                const claims = decodeJwt(token);
                if (!claims.user.isAdmin) navigate('/'); // user not authorized
            } catch (e){
                console.error(`Failed to check user authorization in admin.js, ${e}`);
            };
        };

        if (!token) navigate('/'); // invalid token
        checkAuthorization();
    })

    return ( // render admin page
        <div>admin</div>
    )
};

export default Admin;
