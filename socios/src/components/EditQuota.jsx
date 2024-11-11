import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, ContainerSec, FormContainer, CancelButton } from "./TablesStyles";

const URLCuotaModificar = 'http://localhost:4567/ferro/cuotas/modificar';
const URLTiposCuota = 'http://localhost:4567/ferro/TipoCuota/Todos';
const URLCuotaid = 'http://localhost:4567/ferro/cuotas';

export default function EditQuota() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cuota, setCuota] = useState(null);
    const [tiposCuota, setTiposCuota] = useState([]);
    const [nombreCuotaEditado, setNombreCuotaEditado] = useState("");
    const [montoEditado, setMontoEditado] = useState("");
    const [diaVencimientoEditada, setDiaVencimientoEditada] = useState("");
    const [tipoEditado, setTipoEditado] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Obtiene la cuota específica
        const fetchCuota = async () => {
            try {
                const res = await fetch(`${URLCuotaid}/${id}`);
                if (!res.ok) throw new Error('Error al obtener los datos de la cuota');
                
                const data = await res.json();
                const cuotaData = data[0];
                console.log("Datos de cuota recibidos:", cuotaData);

                setCuota(cuotaData);
                setNombreCuotaEditado(cuotaData.nombreCuota);
                setMontoEditado(cuotaData.Monto);
                setDiaVencimientoEditada(cuotaData.diadeVencimiento);
                setTipoEditado(cuotaData.ID_TipoCuota);
            } catch (error) {
                console.error(error);
            }
        };

        // Obtiene los tipos de cuota
        const fetchTiposCuota = async () => {
            try {
                const res = await fetch(URLTiposCuota);
                if (!res.ok) throw new Error('Error al obtener los tipos de cuota');
                
                const data = await res.json();
                console.log("Tipos de cuota recibidos:", data);
                setTiposCuota(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCuota();
        fetchTiposCuota();
    }, [id]);

    const handleSave = async () => {
        try {
            const updatedCuota = {
                nombreCuota: nombreCuotaEditado,
                Monto: parseFloat(montoEditado),
                diadeVencimiento: parseInt(diaVencimientoEditada),
                ID_TipoCuota: parseInt(tipoEditado),
            };
            console.log("Datos enviados para actualización:", updatedCuota);

            const res = await fetch(`${URLCuotaModificar}/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCuota)
            });

            if (!res.ok) throw new Error('Error al actualizar la cuota');

            
            setSuccessMessage("¡La cuota se guardó exitosamente!");
            setTimeout(() => {
                setSuccessMessage("");
                navigate('/cuota');
            }, 2000); // El mensaje se mostrará durante 2 segundos antes de redirigir
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancel = () => {
        navigate("/config-cuota");
    };

    if (!cuota) return <p>Cargando cuota...</p>;

    return (
        <ContainerSec>
            <FormContainer>
                <div>
                    <h2>Editar Cuota</h2>
                    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                    <input
                        type="text"
                        placeholder="Nombre Cuota"
                        value={nombreCuotaEditado}
                        onChange={(e) => setNombreCuotaEditado(e.target.value)}
                    />
                    
                    <input
                        type="number"
                        placeholder="Monto"
                        value={montoEditado}
                        onChange={(e) => setMontoEditado(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Día de Vencimiento"
                        value={diaVencimientoEditada}
                        onChange={(e) => setDiaVencimientoEditada(e.target.value)}
                    />
                    <select
                        value={tipoEditado}
                        onChange={(e) => setTipoEditado(e.target.value)}
                    >
                        <option value="">Seleccionar Tipo de Cuota</option>
                        {tiposCuota.map(tipo => (
                            <option key={tipo.ID_TipoCuota} value={tipo.ID_TipoCuota}>
                                {tipo.nombreTipoCuota}
                            </option>
                        ))}
                    </select>
                    <Button onClick={handleSave}>Guardar</Button>
                    <CancelButton type="button" onClick={handleCancel}>Cancelar</CancelButton>
                </div>
            </FormContainer>
        </ContainerSec>
    );
}
