import React, { useEffect, useState } from "react";  
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Button,
    Table,
    TableHeader,
    TableBody,
    TableHeaderCell,
    TableCell,
    CancelButton,
} from "./TablesStyles";

const URLPagoDetalle = 'http://localhost:4567/ferro/pagos/persona'; 
const URLCuotaXPersona = "http://localhost:4567/ferro/cuotaXpersona/Todos";
const URLMetodoPago = 'http://localhost:4567/ferro/MetodoPago/Todos'; 

export default function PagosRealizados() {
    const { id } = useParams(); // Obtiene el ID de la URL
    const [pagosRealizados, setPagosRealizados] = useState([]);
    const [metodosPago, setMetodosPago] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener los métodos de pago
                const metodoPagoResponse = await fetch(URLMetodoPago);
                if (!metodoPagoResponse.ok) throw new Error('Error al obtener los métodos de pago');
                
                const metodoPagoData = await metodoPagoResponse.json();
                setMetodosPago(metodoPagoData); // Almacenar los métodos de pago

                // Obtener los datos de cuotaXpersona
                const cuotaResponse = await fetch(`${URLCuotaXPersona}/${id}`);
                if (!cuotaResponse.ok) throw new Error('Error al obtener la cuota');

                const cuotaData = await cuotaResponse.json();

                // Obtener el ID_Persona desde la cuotaData
                const idPersona = cuotaData.length > 0 ? cuotaData[0].ID_Persona : null;

                if (idPersona) {
                    // obtener los pagos utilizando el ID_Persona
                    const pagosResponse = await fetch(`${URLPagoDetalle}/${idPersona}`);
                    if (!pagosResponse.ok) throw new Error('Error al obtener los pagos realizados');

                    const pagosData = await pagosResponse.json();

                    // Filtrar los pagos que coinciden con el ID_Cuota de cuotaData
                    const filteredPagos = pagosData.filter(pago => 
                        cuotaData.some(cuota => 
                            cuota.ID_Cuota === pago.ID_Cuota && cuota.ID_Persona === idPersona
                        )
                    );

                    setPagosRealizados(filteredPagos);
                } else {
                    setPagosRealizados([]); 
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Función para obtener el nombre del método de pago
    const getMetodoPagoNombre = (id) => {
        const metodo = metodosPago.find(m => m.ID_MetodoPago === id);
        return metodo ? metodo.nombreMetodoPago : 'Desconocido';
    };

    const handleCancelar = () => {
        navigate('/cuota'); 
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <h2>Pagos Realizados</h2>
            {pagosRealizados.length > 0 ? (
                <Table>
                    <TableHeader>
                        <tr>                            
                            <TableHeaderCell>Fecha de Pago</TableHeaderCell>
                            <TableHeaderCell>Monto</TableHeaderCell>
                            <TableHeaderCell>Método de Pago</TableHeaderCell>                            
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {pagosRealizados.map((pago) => (
                            <tr key={pago.ID_Pago}>
                                <TableCell>{pago.Fecha_Pago}</TableCell>
                                <TableCell>{pago.monto}</TableCell>
                                <TableCell>{getMetodoPagoNombre(pago.ID_MetodoPago)}</TableCell>
                            </tr>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No hay pagos realizados para este socio.</p>
            )}
            <CancelButton onClick={handleCancelar}>Cancelar</CancelButton>
        </Container>
    );
}
