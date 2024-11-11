import React from "react";
import styled from "styled-components";

export default function Footer() {
    return (
        <FooterContainer>
            <div className="footer-content">
                <p>© 2024 Club Ferro Carril Oeste. Todos los derechos reservados.</p>
                <p>Contacto: info@clubferro.com.ar</p>
            </div>
        </FooterContainer>
    );
}

const FooterContainer = styled.footer`
    background-color: #f1f1f1; /* Un grisecito suave */
    color: #555; /* Un gris más oscuro para el texto */
    padding: 20px;
    text-align: center;
    border-top: 1px solid #e0e0e0; /* Borde sutil */
    position: relative;
    bottom: 0;
    width: 100%;

    .footer-content {
        font-size: 14px;
        line-height: 1.5;
    }

    p {
        margin: 0;
        padding: 5px 0;
    }
`;
