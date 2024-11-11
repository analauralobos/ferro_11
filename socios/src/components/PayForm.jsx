import React, { useState, useEffect } from "react";
import { CancelButton, FormContainer, Button } from "./TablesStyles";
import { useNavigate, useParams } from "react-router-dom";

const URLPagos = "http://localhost:4567/ferro/pagos/crear";
const URLPersona = "http://localhost:4567/ferro/personas/";
const URLCuotaXpersona = "http://localhost:4567/ferro/cuotaXpersona/Todos/";
const URLCuota = "http://localhost:4567/ferro/cuotas/Todos";
const URLMetodoPago = "http://localhost:4567/ferro/MetodoPago/Todos";
const URLTipoCuota = "http://localhost:4567/ferro/TipoCuota/Todos";

export default function PayForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [monto, setMonto] = useState(0);
  const [cantidadCuotasPagadas, setCantidadCuotasPagadas] = useState(1);
  const [ID_Persona, setID_Persona] = useState(null);
  const [ID_Cuota, setID_Cuota] = useState(null);
  const [ID_MetodoPago, setID_MetodoPago] = useState(null);
  const [nro_socio, setNro_socio] = useState(null);
  const [apellido_nombre, setApellido_nombre] = useState("");
  const [tipoCuota, setTipoCuota] = useState(0);
  const [restan, setRestan] = useState(0);
  const [cantidadMaximaCuotas, setCantidadMaximaCuotas] = useState(0);
  const [metodosPago, setMetodosPago] = useState([]);
  const [nombreCuota, setNombreCuota] = useState("");

  const fetchCantidadMaximaCuotas = async (ID_TipoCuota) => {
    try {
      const res = await fetch(URLTipoCuota);
      const data = await res.json();
      const tipoCuotaData = data.find(
        (tipo) => tipo.ID_TipoCuota === ID_TipoCuota
      );
      if (tipoCuotaData) {
        setCantidadMaximaCuotas(tipoCuotaData.cantidad);
      }
    } catch (err) {
      setError("Error al cargar la cantidad máxima de cuotas");
    }
  };

  useEffect(() => {
    const fetchCuota = async (ID_Cuota) => {
      try {
        const res = await fetch(URLCuota);
        const data = await res.json();

        const cuota = data.find((cuota) => cuota.ID_Cuota === ID_Cuota);

        if (cuota) {
          setMonto(cuota.Monto);
          setNombreCuota(cuota.nombreCuota);
          setTipoCuota(cuota.ID_TipoCuota);
          fetchCantidadMaximaCuotas(cuota.ID_TipoCuota);
          return cuota;
        } else {
          setError("No se encontró la cuota con ID: " + ID_Cuota);
          return null;
        }
      } catch (err) {
        setError("Error al cargar los datos de la cuota: " + err.message);
        return null;
      }
    };

    const fetchCuotaXpersona = async () => {
      try {
        const res = await fetch(`${URLCuotaXpersona}${id}`);
        const data = await res.json();

        if (data && data.length > 0) {
          const cuotaData = await fetchCuota(data[0].ID_Cuota);
          if (cuotaData) {
            await fetchPersona(data[0].ID_Persona);
            setCuotaXpersonaData(data[0], cuotaData);
          }
        } else {
          setError("No se encontraron datos de cuota por persona.");
        }
      } catch (err) {
        setError("Error al cargar la cuota por persona: " + err.message);
      }
    };

    const fetchPersona = async (ID_Persona) => {
      try {
        const res = await fetch(`${URLPersona}${ID_Persona}`);
        const data = await res.json();
        if (data && data[0]) {
          setNro_socio(data[0].nro_socio);
          setApellido_nombre(data[0].apellido_nombre);
        } else {
          setError("No se encontraron datos de persona.");
        }
      } catch (err) {
        setError("Error al cargar la persona: " + err.message);
      }
    };

    const fetchMetodosPago = async () => {
      try {
        const res = await fetch(URLMetodoPago);
        const data = await res.json();
        setMetodosPago(data);
      } catch (err) {
        setError("Error al cargar los métodos de pago: " + err.message);
      }
    };

    fetchCuotaXpersona();
    fetchMetodosPago();
  }, [id]);

  const setCuotaXpersonaData = (cuotaXpersona, cuotaData) => {
    setID_Persona(cuotaXpersona.ID_Persona);
    setID_Cuota(cuotaXpersona.ID_Cuota);
    setRestan(cuotaXpersona.restan);
    setMonto(cuotaData.Monto);
    setNombreCuota(cuotaData.nombreCuota);
    fetchCantidadMaximaCuotas(cuotaData.ID_TipoCuota);
  };

  const handleCantidadCuotasChange = (e) => {
    const cantidad = parseInt(e.target.value) || 1;
    const maxCantidadCuotas = restan;
    if (cantidad > maxCantidadCuotas) {
      alert(`No puedes pagar más de ${maxCantidadCuotas} cuotas.`);
      setCantidadCuotasPagadas(maxCantidadCuotas);
    } else {
      setCantidadCuotasPagadas(cantidad);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem("userRole"));
    const fechaActual = new Date().toISOString().slice(0, 10);
  
    const montoTotal = monto * cantidadCuotasPagadas;
  
    const nuevoPagoRealizado = {
      Fecha_Pago: fechaActual,
      ID_Persona,
      ID_Cuota,
      ID_Usuario: usuario.ID_Usuario,
      monto: montoTotal,
      ID_MetodoPago,
      cantidadCuotasPagadas,
    };
  
    try {
      const res = await fetch(URLPagos, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoPagoRealizado),
      });
  
      if (res.ok) {
        const nuevoPago = await res.json();       
        alert("¡Pago Realizado con Éxito!");
  
        const nuevaRestan = restan - cantidadCuotasPagadas;
  
        // Actualizar la cuota
        await fetch(
          `http://localhost:4567/ferro/cuotasXpersonas/modificar/${ID_Persona}/${ID_Cuota}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ restan: nuevaRestan }),
          }
        );
  
        // Redirigir a otra página después de la notificación
        navigate("/cuota");
      } else {
        const errorMessage = await res.text();
        setError("Error al crear el pago: " + errorMessage);
      }
    } catch (err) {
      setError("Error al realizar el pago: " + err.message);
    }
  };
  
  return (
    <FormContainer>
      <h1>Nuevo Pago</h1>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>N° Socio:</label>
          <input type="number" value={nro_socio || ""} readOnly />
        </div>
        <div>
          <label>Nombre:</label>
          <input type="text" value={apellido_nombre || ""} readOnly />
        </div>
        <div>
          <label>Cuota: </label>
          <input type="text" value={nombreCuota || ""} readOnly />
        </div>
        <div>
          <label>Cantidad de cuotas a pagar:</label>
          <input
            type="number"
            value={cantidadCuotasPagadas}
            onChange={handleCantidadCuotasChange}
          />
        </div>
        <div>
          <label>Monto Total a Pagar:</label>
          <input type="number" value={monto * cantidadCuotasPagadas} readOnly />
        </div>
        <div>
          <label>Metodo de Pago:</label>
          <select
            onChange={(e) => setID_MetodoPago(e.target.value)}
            value={ID_MetodoPago || ""}
          >
            <option value="">Seleccionar</option>
            {metodosPago.map((metodo) => (
              <option key={metodo.ID_MetodoPago} value={metodo.ID_MetodoPago}>
                {metodo.nombreMetodoPago}
              </option>
            ))}
          </select>
        </div>
        <div className="button-group">
          <Button type="submit">Realizar Pago</Button>
          <CancelButton onClick={() => navigate("/cuota")}>
            Cancelar
          </CancelButton>
        </div>
      </form>
      
    </FormContainer>
  );
}
