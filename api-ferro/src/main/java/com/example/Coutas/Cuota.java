package com.example.Coutas;

import lombok.Data;

@Data
public class Cuota {
    private Integer ID_Cuota;
    private String nombreCuota;
    private Float Monto;
    private Integer diadeVencimiento;
    private Integer ID_TipoCuota; 
}