package com.example.pagos;

import lombok.Data;

@Data
public class Pago {
    private Integer ID_Pago;
    private String Fecha_Pago;
    private Integer ID_Persona;
    private Integer ID_Cuota;
    private Integer ID_Usuario;
    private Float monto;
    private Integer ID_MetodoPago;
    private Integer cantidadCuotasPagadas;
   
}
