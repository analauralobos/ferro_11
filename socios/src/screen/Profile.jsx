import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import Navbar from "../components/Navbar";

export default function Profile(){
    <Container >
        <Header/>
        <Navbar/>
    </Container >

}

const Container = styled.div`
  position: relative
  .content {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 215, 0, 1);
    grid-template-rows: 15vh 85vh;;`