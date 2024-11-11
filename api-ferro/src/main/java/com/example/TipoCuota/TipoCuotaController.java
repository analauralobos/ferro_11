package com.example.TipoCuota;

import java.util.List;

import com.google.gson.Gson;

import spark.Request;
import spark.Response;
import spark.Route;

public class TipoCuotaController {
    // Obtener todos los tipos de cuota
    public static Route getTodosTipoCuotas = (Request request, Response response) ->
    {
        response.type("application/json");
        try {
        TipoCuotaDAO p = new TipoCuotaDAO();
        List<TipoCuota> res = p.selectAll();
        return new Gson().toJson(res);
        } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };

    // Crear un nuevo tipo de cuota
    public static Route crearTipoCuota = (Request request, Response response) -> {
        response.type("application/json");
        try {
            TipoCuota nuevoTipoCuota = new Gson().fromJson(request.body(), TipoCuota.class); // Convertir JSON a objeto
            TipoCuotaDAO p = new TipoCuotaDAO();
            boolean resultado = p.insert(nuevoTipoCuota);
            if (resultado) {
                response.status(201); // Creado
                return new Gson().toJson("Tipo de cuota creado exitosamente");
            } else {
                response.status(400); // Error en la solicitud
                return new Gson().toJson("Error al crear tipo de cuota");
            }
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error en crear Tipo de cuota: " + e.getMessage());
        }
    };

    // Modificar una persona existente por ID
public static Route modificarTipoCuota = (Request request, Response response) -> {
    response.type("application/json");
    try {
        Integer ID_TipoCuota = Integer.parseInt(request.params(":id")); // Obtener el ID de los parámetros
        TipoCuota tipoCuotaModificada = new Gson().fromJson(request.body(), TipoCuota.class); // Convertir JSON a objeto
        TipoCuotaDAO p = new TipoCuotaDAO();
        boolean resultado = p.update(ID_TipoCuota, tipoCuotaModificada); // Pasar el nro_socio y el objeto persona
        if (resultado) {
            response.status(200); // OK
            return new Gson().toJson("Tipo de cuota modificada exitosamente");
        } else {
            response.status(404); // No encontrado
            return new Gson().toJson("Tipo de cuota no encontrada");
        }
    } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error en modificar tipo de cuota: " + e.getMessage());
    }
};


    // Eliminar una cuota por ID
    public static Route eliminarTipoCuota = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Integer id = Integer.parseInt(request.params(":id"));
            TipoCuotaDAO p = new TipoCuotaDAO();
            boolean resultado = p.delete(id);
            if (resultado) {
                response.status(200); // OK
                return new Gson().toJson("Tipo de cuota eliminada exitosamente");
            } else {
                response.status(404); // No encontrado
                return new Gson().toJson("Tipo de cuota no encontrada");
            }
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error en eliminar tipo de cuota: " + e.getMessage());
        }
    };
}
