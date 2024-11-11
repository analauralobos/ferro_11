package com.example.CuotaXPersona;

import java.util.List;

import com.google.gson.Gson;

import spark.Request;
import spark.Response;
import spark.Route;

public class CuotaXpersonaController {
    public static Route getAllCuotasXpersonas = (Request request, Response response) -> {
        response.type("application/json");
        try {
            CuotaXpersonaDAO cuotaXpersonaDAO = new CuotaXpersonaDAO();
            return new Gson().toJson(cuotaXpersonaDAO.selectAll());
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error al obtener cuotas por personas: " + e.getMessage());
        }
    };
 // Obtener cuota por id
public static Route getAllCuotasXpersonasID = (Request request, Response response) -> {
    response.type("application/json");
    try {
        String idParam = request.params(":id");
        if (idParam == null || !idParam.matches("\\d+")) {
            response.status(400); // Bad Request
            return new Gson().toJson("ID inválido.");
        }
        
        Integer id = Integer.parseInt(idParam);
        CuotaXpersonaDAO p = new CuotaXpersonaDAO();
        List<CuotaXpersona> res = p.selectCuota(id);
        
        if (res.isEmpty()) {
            response.status(404); // Not Found
            return new Gson().toJson("Cuota no encontrada con el ID: " + id);
        }

        return new Gson().toJson(res);
    } catch (Exception e) {
        response.status(500); // Internal Server Error
        return new Gson().toJson("Error controlador: " + e.getMessage());
    }
};

    // Inicializar restan
    public static Route inicializarRestan = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idPersona = Integer.parseInt(request.params(":idPersona"));
            int idCuota = Integer.parseInt(request.params(":idCuota"));

            CuotaXpersonaDAO cuotaXpersonaDAO = new CuotaXpersonaDAO();
            cuotaXpersonaDAO.inicializarRestan(idPersona, idCuota);

            response.status(200);
            return new Gson().toJson("Cuota inicializada correctamente para la persona con ID " + idPersona);
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error al inicializar la cuota: " + e.getMessage());
        }
    };

    // Modificar restan
    public static Route modificarRestan = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idPersona = Integer.parseInt(request.params(":idPersona"));
            int idCuota = Integer.parseInt(request.params(":idCuota")); 

            CuotaXpersona cuotaXpersona = new Gson().fromJson(request.body(), CuotaXpersona.class);

            CuotaXpersonaDAO cuotaXpersonaDAO = new CuotaXpersonaDAO();
            cuotaXpersonaDAO.modificarRestan(idPersona, idCuota, cuotaXpersona);

            response.status(200);
            return new Gson().toJson("Cuota modificada correctamente para la persona con ID " + idPersona);
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error al modificar la cuota: " + e.getMessage());
        }
    };
}
