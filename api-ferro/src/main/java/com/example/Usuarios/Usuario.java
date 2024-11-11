package com.example.Usuarios;

import lombok.Data;

@Data
public class Usuario {
    private Integer ID_Usuario;
    private String nombreUsuario;
    private String contraseña;
    private String ID_Rol;
}