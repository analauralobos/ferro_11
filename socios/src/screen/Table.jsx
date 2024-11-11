import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Tables from "../components/Tables";
import Footer from "../components/Footer";

export default function Table(){
    return(
        <Container >
            <Header/>
            <Navbar/>
            <MainContent>
              <Tables/>
            </MainContent> 
            <Footer/>     
        </Container >
      );
}

// Contenedor principal para estructurar la página
const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Se asegura que la página ocupe toda la altura de la ventana */
`;

// Contenido principal con margen para el header y navbar
const MainContent = styled.div`
    flex: 1; /* Hace que el contenido ocupe el espacio restante disponible */
    padding-top: 100px; /* Ajusta este valor según la altura del header y navbar */
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    overflow-y: auto; /* Permite scroll si el contenido es demasiado grande */
`;
