import React, { useState, useEffect } from "react";
import { ButtonContainer, DeleteButton, EditButton, Container, TableContainer, Table, TableHeader, TableBody, Button, TableCell, TableHeaderCell } from "./TablesStyles"; 
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit, FiXCircle, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; 

const URLCuotas = 'http://localhost:4567/ferro/cuotas/Todos';  
const URLTiposCuota = 'http://localhost:4567/ferro/TipoCuota/Todos';
const URLCuotaNueva = 'http://localhost:4567/ferro/cuotas/crear';
const URLCuotaEliminar = 'http://localhost:4567/ferro/cuotas/eliminar';

// Función para conectar con el backend y manejar los datos de cuotas
function useCuotas(URL) {
    const [cuotas, setCuotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL);
                if (!res.ok) throw new Error('Error al obtener los datos');
                const data = await res.json();
                setCuotas(data || []);  
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [URL]);

    return { cuotas, loading, error };
}

function useTiposCuota(URL) {
    const [tiposCuota, setTiposCuota] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL);
                if (!res.ok) throw new Error('Error al obtener los tipos de cuota');
                const data = await res.json();
                setTiposCuota(data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [URL]);

    return { tiposCuota, loading, error };
}

export default function Cuotas() {
    const [i, setI] = useState(0);  // Paginación
    const [nuevaCuota, setNuevaCuota] = useState({ nombreCuota: "", Monto: "", diadeVencimiento: "", ID_TipoCuota: "" });
    const { cuotas, loading, error } = useCuotas(URLCuotas);
    const { tiposCuota } = useTiposCuota(URLTiposCuota);
    const navigate = useNavigate(); // Inicializar el hook useNavigate

    const handleEdit = (cuota) => {        
        navigate(`/editar-cuota/${cuota.ID_Cuota}`); 
    };

    const handleDelete = async (cuota) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar la cuota?");
        if (confirmDelete) {
            try {
                const res = await fetch(`${URLCuotaEliminar}/${cuota.ID_Cuota}`, {
                    method: 'DELETE'
                });

                if (!res.ok) throw new Error('Error al eliminar la cuota');

                // Recargar datos después de eliminar
                window.location.reload();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleAddCuota = async () => {
        try {
            const res = await fetch(URLCuotaNueva, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaCuota)
            });

            if (!res.ok) throw new Error('Error al agregar la cuota');

            // Limpiar el formulario
            setNuevaCuota({ nombreCuota: "", Monto: "", diadeVencimiento: "", ID_TipoCuota: "" });

            // Recargar datos después de agregar
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    
    const handleManageTiposCuota = () => {
        navigate("/tipos-cuota"); 
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <h2>Configuración de Cuotas</h2>

            {/* Botón para gestionar tipos de cuota */}
            <ButtonContainer>
                <Button onClick={handleManageTiposCuota}>Gestionar Tipos de Cuota</Button>
            </ButtonContainer>

            <div>
                <input
                    type="text"
                    placeholder="Nombre Cuota"
                    value={nuevaCuota.nombreCuota}
                    onChange={(e) => setNuevaCuota({ ...nuevaCuota, nombreCuota: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Monto"
                    value={nuevaCuota.Monto}
                    onChange={(e) => setNuevaCuota({ ...nuevaCuota, Monto: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Día de Vencimiento"
                    value={nuevaCuota.diadeVencimiento}
                    onChange={(e) => setNuevaCuota({ ...nuevaCuota, diadeVencimiento: e.target.value })}
                />
                <select
                    value={nuevaCuota.ID_TipoCuota}
                    onChange={(e) => setNuevaCuota({ ...nuevaCuota, ID_TipoCuota: e.target.value })}
                >
                    <option value="">Seleccionar Tipo de Cuota</option>
                    {tiposCuota.map(tipo => (
                        <option key={tipo.ID_TipoCuota} value={tipo.ID_TipoCuota}>
                            {tipo.nombreTipoCuota}
                        </option>
                    ))}
                </select>

                <Button onClick={handleAddCuota}>Agregar Cuota</Button>
            </div>

            {cuotas && cuotas.length > 0 ? (
                <>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <tr>                                    
                                    <TableHeaderCell>Nombre de Cuota</TableHeaderCell>
                                    <TableHeaderCell>Monto</TableHeaderCell>
                                    <TableHeaderCell>Día de Vencimiento</TableHeaderCell>
                                    <TableHeaderCell>Tipo de Cuota</TableHeaderCell>
                                    <TableHeaderCell>Acciones</TableHeaderCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {cuotas.slice(i, i + 10).map((cuota) => (
                                    <tr key={cuota.ID_Cuota}>                                        
                                        <TableCell>{cuota.nombreCuota}</TableCell>
                                        <TableCell>{cuota.Monto}</TableCell>
                                        <TableCell>{cuota.diadeVencimiento}</TableCell>
                                        <TableCell>{tiposCuota.find(tipo => tipo.ID_TipoCuota === cuota.ID_TipoCuota)?.nombreTipoCuota}</TableCell>
                                        <TableCell>
                                            <ButtonContainer>
                                                <EditButton onClick={() => handleEdit(cuota)}>
                                                    <FiEdit size={20} />
                                                </EditButton>
                                                <DeleteButton onClick={() => handleDelete(cuota)}>
                                                    <BsFillTrashFill size={20} />
                                                </DeleteButton>
                                            </ButtonContainer>
                                        </TableCell>
                                    </tr>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Paginación */}
                    <div>
                        <Button onClick={() => setI(i > 0 ? i - 10 : 0)}>Anterior</Button>
                        <Button onClick={() => setI(i + 10)}>Siguiente</Button>
                    </div>
                </>
            ) : (
                <p>No hay cuotas disponibles.</p>
            )}
        </Container>
    );
}
