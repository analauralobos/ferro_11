import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";

Chart.register(...registerables);

// Estilos personalizados
const ContainerSec = styled(Container)`
  background-color: #ffffff; /* Fondo blanco */
  padding: 20px;
  border-radius: 8px;
`;

const HeaderText = styled.h2`
  color: #006637; /* Verde oscuro para los encabezados */
  font-weight: bold;
`;

const StyledCard = styled(Card)`
  border: 1px solid #006637; /* Verde oscuro */
`;

const PrimaryButton = styled(Button)`
  background-color: #047857; /* Verde más oscuro */
  border: none;
  &:hover {
    background-color: #006637; /* Verde del club */
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #66bb6a; /* Verde más suave */
  border: none;
  &:hover {
    background-color: #4caf50; /* Verde más oscuro */
  }
`;

export default function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [cuotasPendientesData, setCuotasPendientesData] = useState(null);
  const [pagosPorMesData, setPagosPorMesData] = useState(null);
  const [recaudacionPorMesData, setRecaudacionPorMesData] = useState(null);
  const [totalSocios, setTotalSocios] = useState(0);
  const [totalAbonados, setTotalAbonados] = useState(0);
  const [cuotasPendientes, setCuotasPendientes] = useState(0);
  const [rol, setRol] = useState(null); // Estado para el rol del usuario

  useEffect(() => {
    // Obtener el rol desde localStorage
    const storedRol = localStorage.getItem("userRole");
    setRol(storedRol);

    async function fetchData() {
      try {
        const responseSocios = await axios.get("http://localhost:4567/ferro/personas/TodosSocios");
        const responseAbonados = await axios.get("http://localhost:4567/ferro/personas/TodosAbonados");
        const responseCuotasXPersona = await axios.get("http://localhost:4567/ferro/cuotaXpersona/Todos");
        const responsePagos = await axios.get("http://localhost:4567/ferro/pagos/Todos");

        setTotalSocios(responseSocios.data.length);
        setTotalAbonados(responseAbonados.data.length);

        // Calcular cuotas pendientes y pagadas en general
        let cuotasPendientesTotal = 0;
        let cuotasPagadasTotal = 0;

        responseCuotasXPersona.data.forEach(item => {
          if (item.restan > 0) {
            cuotasPendientesTotal += 1;
          } else {
            cuotasPagadasTotal += 1;
          }
        });

        setCuotasPendientesData({
          labels: ["Cuotas Pendientes", "Cuotas Pagadas"],
          datasets: [
            {
              label: "Estado de Cuotas",
              data: [cuotasPendientesTotal, cuotasPagadasTotal],
              backgroundColor: ["#d7e8e0", "#3b8c64"],
              borderColor: ["#3b8c64", "#3b8c64"],
              borderWidth: 1,
            },
          ],
        });

        // Procesar pagos por mes y recaudación por mes
        const pagosPorMes = {};
        const recaudacionPorMes = {};

        responsePagos.data.forEach(pago => {
          const mes = new Date(pago.Fecha_Pago).toLocaleString("es-ES", { month: "long" });
          pagosPorMes[mes] = (pagosPorMes[mes] || 0) + 1;
          recaudacionPorMes[mes] = (recaudacionPorMes[mes] || 0) + pago.monto;
        });

        setPagosPorMesData({
          labels: Object.keys(pagosPorMes),
          datasets: [
            {
              label: "Pagos Realizados por Mes",
              data: Object.values(pagosPorMes),
              backgroundColor: "#D1D1D1",
              borderColor: "#D1D1D1",
              borderWidth: 1,
            },
          ],
        });

        setRecaudacionPorMesData({
          labels: Object.keys(recaudacionPorMes),
          datasets: [
            {
              label: "Recaudación por Mes",
              data: Object.values(recaudacionPorMes),
              backgroundColor: "#D1D1D1",
              borderColor: "#D1D1D1",
              borderWidth: 1,
            },
          ],
        });

      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <ContainerSec fluid>
      <HeaderText className="my-4">Bienvenido a la Administración del Club</HeaderText>
      <Row>
        <Col md={8}>
          <StyledCard className="mb-4">
            <Card.Header style={{ backgroundColor: "#3b8c64", color: "white" }}>Pagos Realizados por Mes</Card.Header>
            <Card.Body>
              {pagosPorMesData && <Bar data={pagosPorMesData} />}
            </Card.Body>
          </StyledCard>
        </Col>
        <Col md={4}>
          <StyledCard className="mb-4">
            <Card.Header style={{ backgroundColor: "#3b8c64", color: "white" }}>Información General</Card.Header>
            <Card.Body>
              <p><strong>Total de Socios:</strong> {totalSocios}</p>
              <p><strong>Total de Abonados:</strong> {totalAbonados}</p>
              <p><strong>Cuotas Pendientes:</strong> {cuotasPendientes}</p>
            </Card.Body>
          </StyledCard>

          {/* Acciones Rápidas */}
          <StyledCard>
            <Card.Header style={{ backgroundColor: "#3b8c64", color: "white" }}>Acciones Rápidas</Card.Header>
            <Card.Body>
              <SecondaryButton 
                className="w-100 mb-2" 
                onClick={() => navigate("/agregar-socio")} 
                disabled={rol !== "1"} // Deshabilitar si el rol no es 1
              >
                Agregar Socio
              </SecondaryButton>
              <SecondaryButton 
                className="w-100 mb-2" 
                onClick={() => navigate("/cuota")} 
                
              >
                Ver Cuotas
              </SecondaryButton>              
              <SecondaryButton 
                className="w-100" 
                onClick={() => navigate("/table")} 
                disabled={rol !== "1"} // Deshabilitar si el rol no es 1
              >
                Administrar Usuarios
              </SecondaryButton>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>

      {/* Gráficos más pequeños uno al lado del otro */}
      <Row>
        <Col md={6}>
          <StyledCard className="mb-4">
            <Card.Header style={{ backgroundColor: "#3b8c64", color: "white" }}>Recaudación por Mes</Card.Header>
            <Card.Body>
              {recaudacionPorMesData && <Bar data={recaudacionPorMesData} options={{ responsive: true, maintainAspectRatio: true, height: 200 }} />}
            </Card.Body>
          </StyledCard>
        </Col>
        <Col md={6}>
          <StyledCard className="mb-4">
            <Card.Header style={{ backgroundColor: "#3b8c64", color: "white" }}>Estado General de Cuotas</Card.Header>
            <Card.Body>
              {cuotasPendientesData && <Pie data={cuotasPendientesData} options={{ responsive: true, maintainAspectRatio: true, height: 100, width: 100 }} />}
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>
    </ContainerSec>
  );
}
