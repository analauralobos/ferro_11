import React, { useState, useEffect } from "react";
import { ButtonContainer, DeleteButton, EditButton, Button, Container, TableContainer, Table, TableHeader, TableBody, TableHeaderCell, TableCell, CancelButton } from "./TablesStyles"; 
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const URLTiposCuota = 'http://localhost:4567/ferro/TipoCuota/Todos';
const URLTipoCuotaNueva = 'http://localhost:4567/ferro/TipoCuota/crear';
const URLTipoCuotaEliminar = 'http://localhost:4567/ferro/TipoCuota/eliminar';
const URLTipoCuotaModificar = 'http://localhost:4567/ferro/TipoCuota/modificar';


function ManageTypeQuota() {
    const [tiposCuota, setTiposCuota] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nuevoTipo, setNuevoTipo] = useState({ nombreTipoCuota: "", cantidad: 0 });
    const [editMode, setEditMode] = useState(false);
    const [tipoEdicion, setTipoEdicion] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetchTiposCuota();
    }, []);

    const fetchTiposCuota = async () => {
        try {
            const res = await fetch(URLTiposCuota);
            if (!res.ok) throw new Error('Error al obtener los tipos de cuota');
            const data = await res.json();
            setTiposCuota(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTipo = async () => {
        try {
            const res = await fetch(URLTipoCuotaNueva, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoTipo)
            });

            if (!res.ok) throw new Error('Error al agregar el tipo de cuota');

            setNuevoTipo({ nombreTipoCuota: "", cantidad: 0 });
            fetchTiposCuota(); // Recargar tipos de cuota
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (tipo) => {
        setEditMode(true);
        setTipoEdicion(tipo);
        setNuevoTipo({ nombreTipoCuota: tipo.nombreTipoCuota, cantidad: tipo.cantidad });
    };

    const handleUpdateTipo = async () => {
        try {
            const res = await fetch(`${URLTipoCuotaModificar}/${tipoEdicion.ID_TipoCuota}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoTipo)
            });

            if (!res.ok) throw new Error('Error al actualizar el tipo de cuota');

            setEditMode(false);
            setTipoEdicion(null);
            setNuevoTipo({ nombreTipoCuota: "", cantidad: 0 });
            fetchTiposCuota(); // Recargar tipos de cuota
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (tipo) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar el tipo de cuota?");
        if (confirmDelete) {
            try {
                const res = await fetch(`${URLTipoCuotaEliminar}/${tipo.ID_TipoCuota}`, {
                    method: 'DELETE'
                });

                if (!res.ok) throw new Error('Error al eliminar el tipo de cuota');

                fetchTiposCuota(); // Recargar tipos de cuota
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setTipoEdicion(null);
        setNuevoTipo({ nombreTipoCuota: "", cantidad: 0 });
    };

    const handleCancelGeneral = () => {
        navigate("/config-cuota");
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <h2>Tipos de Cuota</h2>
            <div>
                <input
                    type="text"
                    placeholder="Nombre Tipo de Cuota"
                    value={nuevoTipo.nombreTipoCuota}
                    onChange={(e) => setNuevoTipo({ ...nuevoTipo, nombreTipoCuota: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={nuevoTipo.cantidad}
                    onChange={(e) => setNuevoTipo({ ...nuevoTipo, cantidad: parseInt(e.target.value) || 0 })}
                />
                {editMode ? (
                    <>
                        <Button onClick={handleUpdateTipo}>Guardar Cambios</Button>
                        <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
                    </>
                ) : (
                    <Button onClick={handleAddTipo}>Agregar Tipo de Cuota</Button>
                )}
            </div>
            
            {tiposCuota.length > 0 ? (
                <TableContainer>
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableHeaderCell>Nombre de Tipo de Cuota</TableHeaderCell>
                                <TableHeaderCell>Cantidad</TableHeaderCell>
                                <TableHeaderCell>Acciones</TableHeaderCell>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {tiposCuota.map((tipo) => (
                                <tr key={tipo.ID_TipoCuota}>
                                    <TableCell>{tipo.nombreTipoCuota}</TableCell>
                                    <TableCell>{tipo.cantidad}</TableCell>
                                    <TableCell>
                                        <ButtonContainer>
                                            <EditButton onClick={() => handleEdit(tipo)}>
                                                <FiEdit size={20} />
                                            </EditButton>
                                            <DeleteButton onClick={() => handleDelete(tipo)}>
                                                <BsFillTrashFill size={20} />
                                            </DeleteButton>
                                        </ButtonContainer>
                                    </TableCell>
                                </tr>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <p>No hay tipos de cuota disponibles.</p>
            )}
            <div><CancelButton type="button" onClick={handleCancelGeneral}>Cancelar</CancelButton></div>
        </Container>
    );
}

export default ManageTypeQuota;
