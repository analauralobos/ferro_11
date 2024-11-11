import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CancelButton,
  ContainerSec,
  FormContainer,
} from "./TablesStyles";

const URLAgregarSocio = "http://localhost:4567/ferro/personas/crear";
const URLTipoCuotas = "http://localhost:4567/ferro/TipoCuota/Todos";
const URLCuotas = "http://localhost:4567/ferro/cuotas/Todos";
const URLCuotaXpersona = "http://localhost:4567/ferro/cuotasXpersona/Iniciar";

export default function AgregarSocio() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nro_socio: "",
    apellido_nombre: "",
    documento: "",
    direccion: "",
    telefono: "",
    email: "",
    fecha_inicio: "",
    fecha_nacimiento: "",
  });
  const [cuotasXper, setCuotasXper] = useState({
    ID_Persona: "",
    ID_Cuota: "",
  });
  const [cuotas, setCuotas] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCuotaChange = (e) => {
    const { value } = e.target;
    setCuotasXper({ ...cuotasXper, ID_Cuota: value });
  };

  const handleCancel = () => {
    navigate("/table");
  };

  const handleSubmitPersona = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URLAgregarSocio, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al agregar socio");

      const data = await response.json();
      const nro_socio = formData.nro_socio;

      if (nro_socio) {
        const cuotaResponse = await fetch(
          `http://localhost:4567/ferro/personas/socio/${nro_socio}`
        );

        if (!cuotaResponse.ok) throw new Error("Error al obtener el ID de persona");

        const cuotaData = await cuotaResponse.json();
        const numpersona = cuotaData[0]?.ID_Persona;

        if (numpersona) {
          setCuotasXper({ ...cuotasXper, ID_Persona: numpersona });
          setStep(2); // Pasar al siguiente paso
        } else {
          alert("Error: ID de persona no encontrado");
        }
      } else {
        alert("Error: No se ha obtenido el nro_socio");
      }
    } catch (error) {
      console.error("Error al agregar el socio:", error);
    }
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
        navigate("/table");
      } else {
        alert("Error al asignar la cuota");
      }
    } catch (error) {
      console.error("Error al asignar la cuota:", error);
    }
  };

  useEffect(() => {
    const fetchCuotas = async () => {
      try {
        const response = await fetch(URLCuotas);
        const data = await response.json();
        if (Array.isArray(data)) {
          setCuotas(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
      } catch (error) {
        console.error("Error al obtener las cuotas:", error);
      }
    };
    fetchCuotas();
  }, []);

  return (
    <ContainerSec>
      <FormContainer>
        {step === 1 ? (
          <form onSubmit={handleSubmitPersona}>
            <h1>Agregar Socio</h1>

            <label>Número de Socio:</label>
            <input
              type="text"
              className="form-control"
              name="nro_socio"
              value={formData.nro_socio}
              onChange={handleInputChange}
            />

            <label>Apellido y Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="apellido_nombre"
              value={formData.apellido_nombre}
              onChange={handleInputChange}
            />

            <label>Documento:</label>
            <input
              type="text"
              className="form-control"
              name="documento"
              value={formData.documento}
              onChange={handleInputChange}
            />

            <label>Dirección:</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
            />

            <label>Teléfono:</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
            />

            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <label>Fecha de Inicio:</label>
            <input
              type="date"
              className="form-control"
              name="fecha_inicio"
              value={formData.fecha_inicio}
              onChange={handleInputChange}
            />

            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              className="form-control"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleInputChange}
            />

            <div className="button-group">
              <Button type="submit">Siguiente</Button>
              <CancelButton type="button" onClick={handleCancel}>
                Cancelar
              </CancelButton>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitCuota}>
            <h1>Seleccionar Cuota</h1>
            <label>Cuota:</label>
            <select
              className="form-control"
              name="ID_Cuota"
              value={cuotasXper.ID_Cuota}
              onChange={handleCuotaChange}
            >
              <option value="">Seleccione una cuota</option>
              {cuotas.map((cuota) => (
                <option key={cuota.ID_Cuota} value={cuota.ID_Cuota}>
                  {cuota.nombreCuota} - ${cuota.Monto} - Día de vencimiento: {cuota.diadeVencimiento} 
                </option>
              ))}
            </select>
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
