import React, { useState, useEffect } from "react";
import {
  ButtonContainer,
  EditButton,
  DeleteButton,
  Container,
  Table,
  TableHeader,
  TableBody,
  TableHeaderCell,
  TableCell,
  Button,
  TableContainer,
} from "./TablesStyles";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

const URLTodos = "http://localhost:4567/ferro/personas/Todos";
const URLBorrarPersona = "http://localhost:4567/ferro/personas/eliminar";

function Conectar(URL, searchTerm) {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Error al obtener los datos");
        const data = await res.json();
        setPersonas(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [URL]);

  const filteredPersonas = personas.filter((persona) => {
    const apellidoNombre = persona.apellido_nombre
      ? persona.apellido_nombre.toLowerCase()
      : "";
    return apellidoNombre.includes(searchTerm.toLowerCase());
  });

  return { personTable: filteredPersonas, loading, error };
}

export default function Tables() {
  const [url] = useState(URLTodos);
  const [searchTerm, setSearchTerm] = useState("");
  const { personTable, loading, error } = Conectar(url, searchTerm);
  const navigate = useNavigate();

  const [rol, setRol] = useState(null);

  useEffect(() => {
    const storedRol = localStorage.getItem("userRole");
    setRol(storedRol);
  }, []);

  const handleFilterChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (ID_Persona) => {
    if (rol === "1") {
      const confirmDelete = window.confirm(
        "¿Estás seguro de que quieres eliminar este socio?"
      );
      if (confirmDelete) {
        try {
          const response = await fetch(`${URLBorrarPersona}/${ID_Persona}`, {
            method: "DELETE",
          });
          if (response.ok) {
            alert("Socio eliminado con éxito");
            window.location.reload();
          } else {
            alert("Error al eliminar el socio");
          }
        } catch (error) {
          console.error("Error al eliminar el socio:", error);
        }
      }
    } else {
      alert("No tienes permiso para eliminar socios");
    }
  };

  const handleEdit = (ID_Persona) => {
    if (rol === "1") {
      navigate(`/editar-socio/${ID_Persona}`);
    } else {
      alert("No tienes permiso para editar socios");
    }
  };

  const handleAdd = () => {
    if (rol === "1") {
      navigate(`/agregar-socio`);
    } else {
      alert("No tienes permiso para agregar socios");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <h2>Socios</h2>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Buscar por nombre o apellido"
          value={searchTerm}
          onChange={handleFilterChange}
          style={{ width: "70%", padding: "5px" }}
        />
        <Button onClick={handleAdd} style={{ marginLeft: "10px" }}>
          Agregar Socio
        </Button>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>Nº Socio</TableHeaderCell>
              <TableHeaderCell>Apellido y Nombre</TableHeaderCell>
              <TableHeaderCell>Dirección</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {personTable.map((persona) => (
              <tr key={persona.nro_socio}>
                <TableCell>{persona.nro_socio}</TableCell>
                <TableCell>{persona.apellido_nombre}</TableCell>
                <TableCell>{persona.direccion}</TableCell>
                <TableCell>
                  <ButtonContainer>
                    <EditButton onClick={() => handleEdit(persona.ID_Persona)}>
                      <FiEdit size={20} />
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(persona.ID_Persona)}>
                      <BsFillTrashFill size={20} />
                    </DeleteButton>
                  </ButtonContainer>
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
