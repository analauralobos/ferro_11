import styled from "styled-components";
import 'font-awesome/css/font-awesome.min.css';
/*import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FiXCircle, FiSave } from "react-icons/fi";*/

// Contenedor principal
export const Container = styled.div`
  width: 100%;
  margin: auto;
  padding: 20px;
  padding-top: 80px;
  //background-color: #f0f0f0; /* Color de fondo gris suave */
  background-color: #ffffff; 
  border-radius: 8px; /* Bordes redondeados */
  //box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Sombra más profunda */

  h1 {
    text-align: left;
    margin-bottom: 30px; /* Más espacio debajo del título */
    font-size: 24px; /* Tamaño de fuente más grande */
    color: #333; /* Color de texto oscuro */
  }

  input, select {
    padding: 12px; /* Espaciado interno aumentado */
    margin-bottom: 20px; /* Más espacio entre los campos */
    border: 1px solid #ccc; /* Borde más claro */
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s; /* Transición suave al cambiar el borde */
    
    &:focus {
      border-color: #007A33; /* Color del borde al enfocar */
      outline: none; /* Sin contorno */
    }
  }  
`;

export const ContainerSec = styled.div`
  width: 100%;
  margin: auto;
  padding: 20px;
  padding-top: 40px;
  background-color: #ffffff; /* Color de fondo blanco */
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 600px; /* Ancho máximo para el formulario */
  margin: auto;
  padding: 20px;
  background-color: #f0f0f0; /* Color de fondo gris suave */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1); /* Sombra más profunda */

  h1 {
    text-align: center; /* Centrado del título */
    margin-bottom: 20px; /* Espacio debajo del título */
    color: #333; /* Color de texto oscuro */
  }

  form {
    display: flex;
    flex-direction: column; /* Disposición en columna */
  }

  label {
    margin-bottom: 10px; /* Espacio entre el label y el input */
    margin-right: 10px; /* Espacio entre el label y el input */
    font-weight: bold; /* Texto en negrita */
    color: #555; /* Color de texto más suave */
  }

  input, select {
    width: 100%;
    padding: 12px; /* Espaciado interno */
    margin-bottom: 20px; /* Espacio entre campos */
    border: 1px solid #ccc; /* Borde más claro */
    border-radius: 5px; /* Bordes redondeados */
    font-size: 16px; /* Tamaño de fuente */
    transition: border-color 0.3s; /* Transición suave al cambiar el borde */
    
    &:focus {
      border-color: #007A33; /* Color del borde al enfocar */
      outline: none; /* Sin contorno */
    }
  }

  .button-group {
    display: flex; /* Agrupar los botones */
    justify-content: space-between; /* Espaciado entre los botones */
  }
`;

// Contenedor para la tabla
export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* Permite el desplazamiento horizontal si es necesario */
  margin-top: 30px; /* Mayor espacio superior */
  margin-bottom: 30px;
  background-color: #f2f2f2;
`;

// Estilo para la tabla
export const Table = styled.table`
  width: 100%; /* Ancho completo de la tabla */
  border-collapse: collapse; /* Elimina espacios entre celdas */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Sombra más profunda */
  border-radius: 0.5rem; /* Bordes redondeados */
  overflow: hidden; /* Esconde bordes redondeados */
  table-layout: fixed; /* Fija el ancho de las celdas */
`;

// Estilo para el encabezado de la tabla
export const TableHeader = styled.thead`
  //background-color: #007A33; /* Color de fondo para el encabezado */
  background-color: #004d25;
  color: white; /* Color del texto */
`;

// Estilo para el cuerpo de la tabla
export const TableBody = styled.tbody`
  //background-color: #ffffff; /* Color de fondo blanco para el cuerpo */
  background-color: f2f2f2;
`;

// Estilo para las celdas de la tabla
export const TableCell = styled.td`
  padding: 10px; /* Espacio interno aumentado */
  border: 1px solid #ddd; /* Borde sutil */
  text-align: left; /* Alineación del texto */
  transition: background-color 0.3s; /* Transición suave al cambiar el fondo */  
  button {
    margin-left: 15px; /* Espacio entre botones */              
  }
  
`;

// Estilo para las celdas del encabezado de la tabla
export const TableHeaderCell = styled.th`
  padding: 15px; /* Espacio interno aumentado */
  border: 1px solid #ddd; /* Borde sutil */
  text-align: left; /* Alineación del texto */
  font-weight: bold; /* Texto en negrita para el encabezado */
`;
export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px; /* Espacio entre los botones */
`;
export const Button = styled.button`
    //background-color: #007A33; /* Color verde Ferro */
    background-color: #006637;
    color: white; /* Texto blanco */
    padding: 12px 20px; /* Espaciado interno aumentado */
    border: none; /* Sin borde */
    border-radius: 0.2rem; /* Bordes redondeados, más sutil */
    cursor: pointer; /* Manito al pasar el mouse */
    margin-top: 10px; /* Espaciado superior */
    font-size: 16px; /* Tamaño de fuente más grande */
    transition: background-color 0.3s, transform 0.3s; /* Transiciones suaves */
    
    /* Estilos para el botón en estado hover */
    &:hover {
        background-color: #004d25; /* Verde más oscuro al pasar el mouse */
        transform: scale(1.05); /* Efecto de aumento al pasar el mouse */
    }

    /* Estilos para el botón deshabilitado */
    &:disabled {
        background-color: #ccc; /* Color para botones deshabilitados */
        cursor: not-allowed; /* Cursor de no permitido */
    }

    /* Efecto de sombra suave */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const CancelButton = styled.button`
    background-color: #d32f2f; /* Color rojo oscuro para cancelar */
    color: white; /* Texto blanco */
    padding: 12px 20px; /* Espaciado interno */
    border: none; /* Sin borde */
    border-radius: 0.2rem; /* Bordes redondeados, igual que los otros botones */
    cursor: pointer; /* Manito al pasar el mouse */
    margin-top: 10px; /* Espaciado superior */
    font-size: 16px; /* Tamaño de fuente más grande */
    transition: background-color 0.3s, transform 0.3s; /* Transiciones suaves */
    display: flex;
    align-items: center;
    justify-content: center;

    /* Estilo para el botón en estado hover */
    &:hover {
        background-color: #c62828; /* Rojo más oscuro al pasar el mouse */
        transform: scale(1.05); /* Efecto de aumento al pasar el mouse */
    }

    /* Estilo para el botón deshabilitado */
    &:disabled {
        background-color: #ccc; /* Color para botones deshabilitados */
        cursor: not-allowed; /* Cursor de no permitido */
    }

    /* Efecto de sombra suave */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;


// Estilo para el botón de eliminar
export const DeleteButton = styled.button`
    background-color: #d32f2f; /* Fondo transparente para el ícono */
    color: white; /* Color rojo para el ícono */
    border: none; /* Sin borde */
    padding: 8px; /* Espaciado interno */
    border-radius: 50%; /* Redondeado para parecer un ícono circular */
    cursor: pointer; /* Manito al pasar el mouse */
    font-size: 1.2rem; /* Tamaño del ícono */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, transform 0.3s;

    /* Estilo para el botón en estado hover */
    &:hover {
        background-color: grey; /* grey más oscuro al pasar el mouse */
        transform: scale(1.05); /* Efecto de aumento al pasar el mouse */
    }
    
`;

// Botón de editar con ícono de lápiz
export const EditButton = styled.button`
    background-color: green; /* Color verde para el botón */
    color: white; /* Color blanco para el ícono */
    border: none; /* Sin borde */
    padding: 8px; /* Espaciado interno */
    border-radius: 50%; /* Redondeado para parecer un ícono circular */
    cursor: pointer; /* Manito al pasar el mouse */
    font-size: 1.2rem; /* Tamaño del ícono */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: grey; /* grey más oscuro al pasar el mouse */
        transform: scale(1.05); /* Efecto de aumento al pasar el mouse */
    }
`;


export const CancelButtonIcon = styled.button`
    background-color: #d32f2f; /* Fondo transparente para el ícono */
    color: white; /* Color rojo para el ícono */
    border: none; /* Sin borde */
    padding: 8px; /* Espaciado interno */
    border-radius: 50%; /* Redondeado para parecer un ícono circular */
    cursor: pointer; /* Manito al pasar el mouse */
    font-size: 1.2rem; /* Tamaño del ícono */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, transform 0.3s;

    /* Estilo para el botón en estado hover */
    &:hover {
        background-color: grey; /* grey más oscuro al pasar el mouse */
        transform: scale(1.05); /* Efecto de aumento al pasar el mouse */
    }
`;

export const SaveButton = styled.button`
   background-color: green; /* Color verde para el botón */
    color: white; /* Color blanco para el ícono */
    border: none; /* Sin borde */
    padding: 8px; /* Espaciado interno */
    border-radius: 50%; /* Redondeado para parecer un ícono circular */
    cursor: pointer; /* Manito al pasar el mouse */
    font-size: 1.2rem; /* Tamaño del ícono */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: grey; /* grey más oscuro al pasar el mouse */
        transform: scale(1.05); /* Efecto de aumento al pasar el mouse */
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between; /* Alinea los botones con espacio entre ellos */
    gap: 10px; /* Añade espacio entre los botones */
    margin-top: 20px; /* Si quieres algo de espacio arriba */
`;