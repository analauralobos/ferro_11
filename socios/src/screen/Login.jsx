import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import backgroundImage from "../assets/img/image.png";

// URL de la API
const URL = 'http://localhost:4567/ferro/usuarios/todos';

// Hook personalizado para consumir la API
function useFetch(URL) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error('Error al obtener datos');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [URL]);

    return { data, loading, error };
}

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const resul = useFetch(URL);
    const navigate = useNavigate();

    const handleLogin = () => {
        // Verificamos si los datos de la respuesta están disponibles
        if (resul.data) {
            const usuarios = resul.data;
            // Buscamos el usuario que coincida con el nombreUsuario y la contraseña
            const usuarioEncontrado = usuarios.find(
                (usuario) => usuario.nombreUsuario === user && usuario.contraseña === password
            );
            // Si se encuentra un usuario que coincide con las credenciales
            if (usuarioEncontrado) {
                // Guardamos el rol del usuario en localStorage
                localStorage.setItem("userRole", usuarioEncontrado.ID_Rol);
                navigate("/home");  // Redirigimos al usuario a la página principal
            } else {
                alert('USUARIO O CONTRASEÑA INCORRECTOS');  // Si no hay coincidencias
            }
        } else {
            alert('Cargando datos, por favor espera');  // Si los datos aún no están disponibles
        }
    };

    return (
        <Container>
            <div className="overlay">
                <div className="content">
                    <div className="logo-container">
                        <img src={logo} alt="logo" className="logo" />
                    </div>
                    <div className="formulario">
                        <div className="form flex column a-center j-center">
                            <div className="container flex column">
                                <div className="texto_form">Usuario</div>
                                <input
                                    className="input_login"
                                    type="text"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                />
                                <div className="texto_form">Contraseña</div>
                                <input
                                    className="input_login"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <div>
                                    <button onClick={handleLogin} className="boton">Ingresar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: url(${backgroundImage}) center center/cover no-repeat; 
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content {
        background-color: rgba(255, 255, 255, 0.2);
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .logo-container {
        margin-bottom: 30px;
    }

    .logo {
        width: 150px;
        height: auto;
    }

    .formulario {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .texto_form {
        color: white;
        font-size: 18px;
        margin-bottom: 8px;
    }

    .input_login {
        border-radius: 8px;
        border: none;
        padding: 10px;
        width: 100%;
        margin-bottom: 15px;
        font-size: 16px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }

    .boton {
        background-color: #28a745;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }

    .boton:hover {
        background-color: #218838;
    }
`;
