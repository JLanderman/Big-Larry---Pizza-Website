import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useAuth } from '../contexts/authContext';

const Admin = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!auth) navigate('/');
    });

    const token = Cookies.get('x-auth-token');
    return ( // render admin page
        <div>admin</div>
    )
};

export default Admin;
