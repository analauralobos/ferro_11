import React, { useState, useEffect } from "react";
import {
  ButtonContainer,
  Container,
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  Button,
  TableCell,
  TableHeaderCell,
} from "./TablesStyles";
import { useNavigate } from "react-router-dom";

const URLCuotas = "http://localhost:4567/ferro/cuotaXpersona/Todos";
const URLCuotasTodas = "http://localhost:4567/ferro/cuotas/Todos";
const URLTiposCuota = "http://localhost:4567/ferro/TipoCuota/Todos";
const URLPersonas = "http://localhost:4567/ferro/personas/Todos";

function useCuotas(URL) {
  const [cuotas, setCuotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Error al obtener los datos");
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

function usePersonas(URL) {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Error al obtener las personas");
        const data = await res.json();
        setPersonas(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [URL]);

  return { personas, loading, error };
}

export default function Cuotas() {
  const [i, setI] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { cuotas, loading, error } = useCuotas(URLCuotas);
  const { personas } = usePersonas(URLPersonas);
  const { cuotas: cuotast } = useCuotas(URLCuotasTodas); 
  const navigate = useNavigate();
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const storedRol = localStorage.getItem("userRole");
    setRol(storedRol);
  }, []);

  const handlePagar = (cuota) => {
    if (rol === "1" || rol === "3") {
      navigate(`/pagar-cuota/${cuota}`);
    } else {
      alert("No tienes permiso para realizar un pago");
    }
  };

  const handleVerCuotasId = (cuota) => {
    navigate(`/pagos-realizados/${cuota}`);
  };

  const handleAsignarCuota = () => {
    if (rol === "1" || rol === "3") {
      navigate(`/asignar-cuota`);
    } else {
      alert("No tienes permiso para asignar cuotas");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filtrar cuotas según el término de búsqueda
  const filteredCuotas = cuotas.filter((cuota) => {
    const persona = personas.find((p) => p.ID_Persona === cuota.ID_Persona);
    const nombre = persona ? persona.apellido_nombre.toLowerCase() : "";
    const nroSocio = persona ? persona.nro_socio.toString() : "";
    return (
      nombre.includes(searchTerm.toLowerCase()) || nroSocio.includes(searchTerm)
    );
  });

  return (
    <Container>
      <h2>Cuotas Activas</h2>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Buscar por Nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "70%", padding: "5px" }}
        />
        <Button onClick={handleAsignarCuota} style={{ marginLeft: "10px" }}>
          Asignar Cuota a Persona
        </Button>
      </div>

      {filteredCuotas && filteredCuotas.length > 0 ? (
        <>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>N° de Socio</TableHeaderCell>
                  <TableHeaderCell>Nombre</TableHeaderCell>
                  <TableHeaderCell>Cuota</TableHeaderCell>
                  <TableHeaderCell>Cuotas Pendientes</TableHeaderCell>
                  <TableHeaderCell>Acciones</TableHeaderCell>
                </tr>
              </TableHeader>
              <TableBody>
                {filteredCuotas.slice(i, i + 10).map((cuota) => {
                  const persona = personas.find((p) => p.ID_Persona === cuota.ID_Persona);
                  const cuotaInfo = cuotast.find((ct) => ct.ID_Cuota === cuota.ID_Cuota);

                  return (
                    <tr key={cuota.ID_Cuota}>
                      <TableCell>{persona ? persona.nro_socio : "Desconocido"}</TableCell>
                      <TableCell>{persona ? persona.apellido_nombre : "Desconocido"}</TableCell>
                      <TableCell>{cuotaInfo ? cuotaInfo.nombreCuota : "Desconocido"}</TableCell>
                      <TableCell>{cuota.restan}</TableCell>
                      <TableCell>
                        <ButtonContainer>
                          <Button onClick={() => handlePagar(cuota.ID_CuotaXpersona)}>Pagar</Button>
                          <Button onClick={() => handleVerCuotasId(cuota.ID_CuotaXpersona)}>Ver</Button>
                        </ButtonContainer>
                      </TableCell>
                    </tr>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          
        </>
      ) : (
        <p>No se encontraron cuotas.</p>
      )}
    </Container>
  );
}
