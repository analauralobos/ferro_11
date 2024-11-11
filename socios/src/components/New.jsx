import React, { useState } from "react";
import { ContainerSec, FormContainer, Button, CancelButton } from "./TablesStyles";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from 'react-bootstrap';

export default function New() {
    const [nuevoPago, setNuevoPago] = useState({
        montoTotal: '',
        cuotasPagadas: '',
        fechaInicio: '',
        fechaVencimiento: '',
        idSocio: '',
        idCuota: '',
        idAdministrador: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setNuevoPago({ ...nuevoPago, [e.target.name]: e.target.value });
        setError(''); // Resetea el error al cambiar un campo
    };
    const handleCancel = () => {
        navigate("/pay");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Inicia el loading

        const pagoParaEnviar = {
            Fecha_Inicio: nuevoPago.fechaInicio,
            Fecha_Vencimiento: nuevoPago.fechaVencimiento,
            Cuotas_Pagadas: nuevoPago.cuotasPagadas,
            Monto_Total: nuevoPago.montoTotal,
            ID_Socio: nuevoPago.idSocio,
            ID_Cuota: nuevoPago.idCuota,
            ID_Administrador: nuevoPago.idAdministrador,
        };

        try {
            const response = await fetch('http://localhost:4567/pagos/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pagoParaEnviar),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Captura el error del backend
                throw new Error(errorData.message || 'Error al crear el nuevo pago');
            }

            const result = await response.json();
            alert('Pago registrado exitosamente!');
            navigate('/pay');
        } catch (error) {
            setError(error.message); // Almacena el mensaje de error
        } finally {
            setLoading(false); // Finaliza el loading
        }
    };

    return (
        <ContainerSec>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <h1>Registrar Nuevo Pago</h1>
                    {error && <Alert variant="danger">{error}</Alert>} {/* Mensaje de error */}

                    <label>
                        Monto Total:
                        <input
                            type="number"
                            name="montoTotal"
                            value={nuevoPago.montoTotal}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Cuotas Pagadas:
                        <input
                            type="number"
                            name="cuotasPagadas"
                            value={nuevoPago.cuotasPagadas}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Fecha de Inicio:
                        <input
                            type="date"
                            name="fechaInicio"
                            value={nuevoPago.fechaInicio}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Fecha de Vencimiento:
                        <input
                            type="date"
                            name="fechaVencimiento"
                            value={nuevoPago.fechaVencimiento}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>ID Socio:
                        <input
                            type="number"
                            name="idSocio"
                            value={nuevoPago.idSocio}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>ID Cuota:
                        <input
                            type="number"
                            name="idCuota"
                            value={nuevoPago.idCuota}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>ID Administrador:
                        <input
                            type="number"
                            name="idAdministrador"
                            value={nuevoPago.idAdministrador}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </form>
                <Button type="submit">Guardar</Button>
                <CancelButton type="button" onClick={handleCancel}>Cancelar</CancelButton>
            </FormContainer>
        </ContainerSec >
    );
}
