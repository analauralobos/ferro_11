import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; // Ocupa el 100% de la altura de la ventana
    padding: 20px;

    form {
        width: 100%; // Permite que el formulario ocupe todo el espacio disponible
        max-width: 400px; // Ancho máximo del formulario
        background-color: rgba(255, 255, 255, 0.9); // Fondo blanco con opacidad
        border-radius: 8px; // Bordes redondeados
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // Sombra sutil
        padding: 20px;
    }

    h1 {
        text-align: center; // Centra el título
    }
`;

const URLPagos = 'http://localhost:4567/ferro/pagos/Todos';

export default function EditarPago() {
    const { id } = useParams(); 
    const [pago, setPago] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPago = async () => {
            try {
                const response = await fetch(`${URLPagos}/${id}`);
                if (!response.ok) {
                    const errorMessage = await response.text(); 
                    throw new Error(`Error al obtener el pago: ${errorMessage}`);
                }
                const data = await response.json();
                setPago(data.data);
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        };
        

        fetchPago();
    }, [id]);

    const handleChange = (e) => {
        setPago({ ...pago, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { Fecha_Inicio, Fecha_Vencimiento, Cuotas_Pagadas, Monto_Total } = pago; 
            const response = await fetch(`${URLPagos}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Fecha_Inicio, Fecha_Vencimiento, Cuotas_Pagadas, Monto_Total }),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error al actualizar el pago: ${errorMessage}`);
            }
            alert('Pago actualizado exitosamente!');
            navigate('/pay');
        } catch (error) {
            console.log("Error:", error);
            alert(`Error: ${error.message}`);
        }
    };
    

    if (!pago) return <p>Cargando...</p>; 

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <h1>Pagar Cuota</h1>
                <Form.Group controlId="formMontoTotal">
                    <Form.Label>Monto Total:</Form.Label>
                    <Form.Control
                        type="number"
                        name="Monto_Total"
                        value={pago.Monto_Total}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formCuotasPagadas">
                    <Form.Label>Cuotas Pagadas:</Form.Label>
                    <Form.Control
                        type="number"
                        name="Cuotas_Pagadas"
                        value={pago.Cuotas_Pagadas}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formFechaInicio">
                    <Form.Label>Fecha de Inicio:</Form.Label>
                    <Form.Control
                        type="date"
                        name="Fecha_Inicio"
                        value={new Date(pago.Fecha_Inicio).toISOString().split('T')[0]} 
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formFechaVencimiento">
                    <Form.Label>Fecha de Vencimiento:</Form.Label>
                    <Form.Control
                        type="date"
                        name="Fecha_Vencimiento"
                        value={new Date(pago.Fecha_Vencimiento).toISOString().split('T')[0]} // Formato para el input de fecha
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <div className="text-center">
                    <Button type="submit" variant="primary">Guardar Cambios</Button>
                    <Button variant="secondary" onClick={() => navigate('/pay')} style={{ marginLeft: '10px' }}>Cancelar</Button>
                </div>
            </Form>
        </FormContainer>
    );
}

