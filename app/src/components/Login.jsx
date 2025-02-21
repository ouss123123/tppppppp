import { useState } from "react";
import db from "../db.json";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsConnected }) => { 

    const [form, setForm] = useState({
        login: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const users = db.users; 
        if (Array.isArray(users)) {
            users.map((user) => {
                if (user.email === form.login && user.password === form.password) {
                    setIsConnected({ status: true, role: user.role, id: user.id });
                    navigate(`/${user.role}/${user.id}`);
                }
            });
        } else {
            console.error("Users data is not an array");
        }
    };

    return (
        <div className="login-container">
            <input type="text" placeholder="Enter your username" onChange={(e) => setForm({ ...form, login: e.target.value })} />
            <input type="password" placeholder="Enter your password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;