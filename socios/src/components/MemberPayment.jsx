import React, { useState, useEffect } from "react";
import {
    Container,
    Table,
    TableHeader,
    TableBody,
    Button,
    TableHeaderCell,
    TableCell,
    TableContainer
} from "./TablesStyles";
import { useNavigate } from "react-router-dom";

const URLPagos = 'http://localhost:4567/ferro/pagos/Todos';
const URLSocios = 'http://localhost:4567/ferro/personas/Todos';
const URLCuotas = 'http://localhost:4567/ferro/cuotas/Todos';

export default function Pagos() {
    const [pagos, setPagos] = useState([]);
    const [socios, setSocios] = useState([]);
    const [cuotas, setCuotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [socioBusqueda, setSocioBusqueda] = useState('');
    const [pagosFiltrados, setPagosFiltrados] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resPagos = await fetch(URLPagos);
                if (!resPagos.ok) throw new Error('Error al obtener los pagos');
                const dataPagos = await resPagos.json();
                setPagos(dataPagos || []);

                const resSocios = await fetch(URLSocios);
                if (!resSocios.ok) throw new Error('Error al obtener los socios');
                const dataSocios = await resSocios.json();
                setSocios(dataSocios || []);

                const resCuotas = await fetch(URLCuotas);
                if (!resCuotas.ok) throw new Error('Error al obtener las cuotas');
                const dataCuotas = await resCuotas.json();
                setCuotas(dataCuotas || []);

                setPagosFiltrados(dataPagos); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtrados = pagos.filter(pago => {
            const socio = socios.find(s => s.ID_Persona === pago.ID_Persona);
            if (!socio) return false;

            const socioNombre = socio.apellido_nombre.toLowerCase();
            const socioDocumento = socio.documento.toString();
            const socioNumero = socio.nro_socio.toString();

            return (
                socioNombre.includes(socioBusqueda.toLowerCase()) ||
                socioNumero.includes(socioBusqueda) ||
                socioDocumento.includes(socioBusqueda)
            );
        });

        setPagosFiltrados(filtrados);
    }, [socioBusqueda, pagos, socios]);

    const handleImprimir = (idPago) => {
        // Implementar la lógica para imprimir el pago
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <h2>Historial de Pagos</h2>
            <div>
                <input
                    type="text"
                    value={socioBusqueda}
                    onChange={(e) => setSocioBusqueda(e.target.value)}
                    placeholder="Buscar por nombre o N° socio"
                />
            </div>
            <TableContainer>
                {pagosFiltrados.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableHeaderCell>Fecha Pago</TableHeaderCell>
                                <TableHeaderCell>Cuotas Pagadas</TableHeaderCell>
                                <TableHeaderCell>Monto Total</TableHeaderCell>
                                <TableHeaderCell>N° Socio</TableHeaderCell>
                                <TableHeaderCell>Nombre</TableHeaderCell>
                                <TableHeaderCell>Cuota</TableHeaderCell>
                                <TableHeaderCell>Acciones</TableHeaderCell>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {pagosFiltrados.map(pago => {
                                const socio = socios.find(s => s.ID_Persona === pago.ID_Persona);
                                const cuota = cuotas.find(c => c.ID_Cuota === pago.ID_Cuota); // Define la cuota correspondiente

                                return (
                                    <tr key={pago.ID_Pago}>
                                        <TableCell>{new Date(pago.Fecha_Pago).toLocaleDateString()}</TableCell>
                                        <TableCell>{pago.cantidadCuotasPagadas}</TableCell>
                                        <TableCell>{pago.monto}</TableCell>
                                        <TableCell>{socio ? socio.nro_socio : 'Desconocido'}</TableCell>
                                        <TableCell>{socio ? socio.apellido_nombre : 'Desconocido'}</TableCell>
                                        <TableCell>{cuota ? cuota.nombreCuota : 'Desconocido'}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleImprimir(pago.ID_Pago)}>Imprimir</Button>
                                        </TableCell>
                                    </tr>
                                );
                            })}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No se encontraron pagos para este socio.</p>
                )}
            </TableContainer>
        </Container>
    );
}
