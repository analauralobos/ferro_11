import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CancelButton,
  ContainerSec,
  FormContainer,
} from "./TablesStyles";

const URLSocio = "http://localhost:4567/ferro/personas/Todos";
const URLTiposCuota = `http://localhost:4567/ferro/TipoCuota/Todos`;
const URLCuotasTodas = "http://localhost:4567/ferro/cuotas/Todos";
const URLCuotaXpersona = "http://localhost:4567/ferro/cuotasXpersona/Iniciar";

export default function AddQuotaMember() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [socios, setSocios] = useState([]);
  const [cuotasXper, setCuotasXper] = useState({
    ID_Persona: "",
    ID_Cuota: "",
  });
  const [tiposCuota, setTiposCuota] = useState([]);
  const [cuotas, setCuotas] = useState([]);
  const [cuotasFiltradas, setCuotasFiltradas] = useState([]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectPersona = (persona) => {
    setCuotasXper({ ...cuotasXper, ID_Persona: persona.ID_Persona });
    setStep(2);
  };

  const handleTipoCuotaChange = (e) => {
    const tipoCuotaSeleccionado = e.target.value;
    setCuotasXper({ ...cuotasXper, ID_Cuota: "" });

    // Filtra las cuotas por el ID_TipoCuota seleccionado
    const cuotasFiltradas = cuotas.filter(
      (cuota) => cuota.ID_TipoCuota === parseInt(tipoCuotaSeleccionado)
    );
    setCuotasFiltradas(cuotasFiltradas);
    console.log("Cuotas filtradas:", cuotasFiltradas); // Depuración
  };

  const handleCuotaChange = (e) => {
    setCuotasXper({ ...cuotasXper, ID_Cuota: e.target.value });
  };

  const handleCancel = () => {
    navigate("/cuota");
  };

  const handleSubmitCuota = async (e) => {
    e.preventDefault();
    try {
      if (!cuotasXper.ID_Cuota) {
        alert("Por favor, seleccione una cuota.");
        return;
      }

      const response = await fetch(
        `${URLCuotaXpersona}/${cuotasXper.ID_Persona}/${cuotasXper.ID_Cuota}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        alert("Cuota asignada con éxito");
        navigate("/cuota");
      } else {
        alert("Error al asignar la cuota");
      }
    } catch (error) {
      console.error("Error al asignar la cuota:", error);
    }
  };

  useEffect(() => {
    const fetchSocios = async () => {
      try {
        const response = await fetch(URLSocio);
        const data = await response.json();
        setSocios(data);
      } catch (error) {
        console.error("Error al obtener los socios:", error);
      }
    };

    const fetchTiposCuota = async () => {
      try {
        const response = await fetch(URLTiposCuota);
        const data = await response.json();
        setTiposCuota(data);
      } catch (error) {
        console.error("Error al obtener los tipos de cuota:", error);
      }
    };

    const fetchCuotas = async () => {
      try {
        const response = await fetch(URLCuotasTodas);
        const data = await response.json();
        setCuotas(data);
        console.log("Cuotas obtenidas:", data); // Depuración
      } catch (error) {
        console.error("Error al obtener las cuotas:", error);
      }
    };

    fetchSocios();
    fetchTiposCuota();
    fetchCuotas();
  }, []);

  return (
    <ContainerSec>
      <FormContainer>
        {step === 1 ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1>Seleccionar Socio</h1>
              <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
            </div>

            <label>Buscar por Nombre o Número de Socio:</label>

            <input
              type="text"
              className="form-control"
              value={search}
              onChange={handleSearchChange}
              placeholder="Ingrese nombre o número de socio"
            />
            <table className="table">
              <thead>
                <tr>
                  <th>Apellido y Nombre</th>
                  <th>Número de Socio</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {socios
                  .filter(
                    (socio) =>
                      socio.apellido_nombre
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      socio.nro_socio.toString().includes(search)
                  )
                  .map((socio) => (
                    <tr key={socio.ID_Persona}>
                      <td>{socio.apellido_nombre}</td>
                      <td>{socio.nro_socio}</td>
                      <td>
                        <Button onClick={() => handleSelectPersona(socio)}>
                          Seleccionar
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <form onSubmit={handleSubmitCuota}>
            <h1>Seleccionar Cuota</h1>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Tipo de Cuota:</label>
                <select
                  className="form-control"
                  onChange={handleTipoCuotaChange}
                >
                  <option value="">Seleccione un tipo de cuota</option>
                  {tiposCuota.map((tipo) => (
                    <option key={tipo.ID_TipoCuota} value={tipo.ID_TipoCuota}>
                      {tipo.nombreTipoCuota} ({tipo.cantidad} pagos)
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>Cuota:</label>
                <select
                  className="form-control"
                  name="ID_Cuota"
                  value={cuotasXper.ID_Cuota}
                  onChange={handleCuotaChange}
                >
                  <option value="">Seleccione una cuota</option>
                  {cuotasFiltradas.map((cuota) => (
                    <option key={cuota.ID_Cuota} value={cuota.ID_Cuota}>
                      {cuota.nombreCuota} - Monto: ${cuota.Monto}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="button-group">
              <Button type="submit">Guardar</Button>
              <CancelButton type="button" onClick={handleCancel}>
                Cancelar
              </CancelButton>
            </div>
          </form>
        )}
      </FormContainer>
    </ContainerSec>
  );
}
