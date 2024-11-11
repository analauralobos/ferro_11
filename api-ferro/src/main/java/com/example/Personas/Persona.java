package com.example.Personas;

import lombok.Data;

@Data
public class Persona {
    private Integer ID_Persona;
    private Integer nro_socio;
    private String apellido_nombre;
    private String documento;
    private String direccion;
    private String telefono;
    private String email;
    private String fecha_inicio;
    private String fecha_nacimiento;
}
