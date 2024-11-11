package com.example.Coutas;

import java.util.List;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;

public class CuotaController {
    // Obtener todas las cuotas
    public static Route getTodosCuotas = (Request request, Response response) ->
    {
        response.type("application/json");
        try {
        CuotaDAO p = new CuotaDAO();
        List<Cuota> res = p.selectAll();
        return new Gson().toJson(res);
        } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };

    // Obtener cuota por id
public static Route getCuota = (Request request, Response response) -> {
    response.type("application/json");
    try {
        String idParam = request.params(":id");
        if (idParam == null || !idParam.matches("\\d+")) {
            response.status(400); // Bad Request
            return new Gson().toJson("ID inválido.");
        }
        
        Integer id = Integer.parseInt(idParam);
        CuotaDAO p = new CuotaDAO();
        List<Cuota> res = p.selectCuota(id);
        
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

    
    // Crear una nueva cuota
    public static Route crearCuota = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Cuota nuevaCuota = new Gson().fromJson(request.body(), Cuota.class); // Convertir JSON a objeto
            CuotaDAO p = new CuotaDAO();
            boolean resultado = p.insert(nuevaCuota);
            if (resultado) {
                response.status(201); // Creado
                return new Gson().toJson("Cuota creada exitosamente");
            } else {
                response.status(400); // Error en la solicitud
                return new Gson().toJson("Error al crear la cuota");
            }
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error en crearCuota: " + e.getMessage());
        }
    };

    // Modificar una cuota existente por ID
    public static Route modificarCuota = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Integer id = Integer.parseInt(request.params(":id"));
            Cuota cuotaModificada = new Gson().fromJson(request.body(), Cuota.class); // Convertir JSON a objeto
            CuotaDAO p = new CuotaDAO();
            boolean resultado = p.update(id, cuotaModificada);
            if (resultado) {
                response.status(200); // OK
                return new Gson().toJson("Cuota modificada exitosamente");
            } else {
                response.status(404); // No encontrado
                return new Gson().toJson("Cuota no encontrada");
            }
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error en modificarCuota: " + e.getMessage());
        }
    };

    // Eliminar una cuota por ID
    public static Route eliminarCuota = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Integer id = Integer.parseInt(request.params(":id"));
            CuotaDAO p = new CuotaDAO();
            boolean resultado = p.delete(id);
            if (resultado) {
                response.status(200); // OK
                return new Gson().toJson("Cuota eliminada exitosamente");
            } else {
                response.status(404); // No encontrado
                return new Gson().toJson("Cuota no encontrada");
            }
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error en eliminarCuota: " + e.getMessage());
        }
    };
}


