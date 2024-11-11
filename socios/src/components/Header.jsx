import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { BsPersonCircle } from "react-icons/bs";

export default function Header(props) {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        if (storedRole) {
            setUserRole(storedRole); // Cargar el rol desde localStorage
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        navigate("/"); // Redirige al inicio de sesión
    };

    return (
        <Container className="flex a-center j-between">
            <div className="header">
                <div className="header_logo" onClick={() => navigate("/home")}>
                    <img src={logo} alt="Logo" />
                </div>
                <div className="header_text">
                    <h1>C. S. y A. Ferro Carril Oeste</h1>
                </div>
                <div className="header_text_CS">
                    <BsPersonCircle size={'4rem'} color="white" />
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    .header {
        position: fixed;
        width: 100%;
        height: 100px;
        background-color: #016536;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        flex-wrap: wrap; /* Permite que los elementos se ajusten en pantallas pequeñas */
    }

    img {
        height: 80px;
        cursor: pointer;
    }

    h1 {
        color: white;
        font-size: 2rem;
        margin: 0 10px;
        flex: 1; /* Hace que el texto ocupe el espacio disponible */
    }

    .header_text_CS {
        display: flex;
        align-items: center;
        gap: 10px;

        button {
            padding: 0.5rem 1rem;
            border: none;
            cursor: pointer;
            border-radius: 0.2rem;
            font-size: 1rem;
            background-color: #ffffff;
            color: #065f46;
            text-decoration: none;
            transition: background-color 0.3s ease, color 0.3s ease;

            &:hover {
                background-color: #10b981;
                color: white;
            }
        }
    }

    @media (max-width: 768px) {
        .header {
            padding: 0 10px;
            height: 80px; /* Reducir altura en pantallas pequeñas */
            justify-content: space-between;
        }

        h1 {
            font-size: 1.5rem; /* Reducir tamaño del texto en pantallas pequeñas */
        }

        img {
            height: 60px; /* Reducir tamaño del logo en pantallas pequeñas */
        }

        .header_text_CS {
            gap: 5px;
        }
    }
`;
