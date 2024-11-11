import React, { useState, useEffect } from "react"; 
import styled from "styled-components";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";

export default function Navbar() {
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const storedRol = localStorage.getItem("userRole");
    setRol(storedRol);
  }, []);

  const links = [
    { name: "Inicio", link: "/home" },
    { name: "Socios", link: "/table" },
    {
      name: "Cuotas",
      link: "/cuota",
      sublinks: [
        { name: "Cuotas de Socios", link: "/cuota" },
        // Condicionalmente mostrar el sublink solo si el rol no es 1 o 3
        ...(rol === "1" || rol === "3" ? [{ name: "Configuración de Cuotas", link: "/config-cuota" }] : []),
      ],
    },
    { name: "Pagos", link: "/pay" },
  ];

  return (
    <Container>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {links.map(({ name, link, sublinks }) => (
              <li className="nav-item" key={name}>
                {sublinks ? (
                  <Dropdown>
                    <Dropdown.Toggle as={StyledLink} className="nav-link">
                      {name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {sublinks.map(({ name: subName, link: subLink }) => (
                        <Dropdown.Item key={subName} as={Link} to={subLink}>
                          {subName}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <StyledLink className="nav-link" to={link}>
                    {name}
                  </StyledLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  background-color: #045d42; /* Verde más claro */
  position: fixed;
  top: 100px;
  width: 100%;
  z-index: 999;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  color: white !important;
  text-decoration: none !important;
  padding: 12px 20px;
  font-size: 1.1em;
  font-weight: 500;
  margin: 0 15px;
  border-radius: 6px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #66bb6a; /* Un verde más suave */
    color: #004d33 !important;
    transform: translateY(-2px);
  }
`;
