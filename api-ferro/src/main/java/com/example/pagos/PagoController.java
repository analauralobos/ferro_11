package com.example.pagos;

import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;

public class PagoController {
    private static final Gson gson = new Gson();
    // Crear un nuevo pago
    public static Route createPago = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Pago pago = gson.fromJson(request.body(), Pago.class);
            
            boolean isCreated = PagoDAO.create(pago);
            
            if (isCreated) {
                response.status(201); // 201 Created
                return gson.toJson("Pago creado correctamente");
            } else {
                response.status(500); // Internal Server Error
                return gson.toJson("Error al crear el pago ");
            }
        } catch (Exception e) {
            response.status(500); // Internal Server Error
            return gson.toJson("Error al crear el pago : " + e.getMessage());
        }
    };

    // Obtener un pago por ID
    public static Route getPagoById = (Request request, Response response) -> {
        response.type("application/json");
        try {
            PagoDAO pagoDAO = new PagoDAO();
            Integer idPago = Integer.parseInt(request.params(":id"));
            Pago pago = pagoDAO.getById(idPago);
            if (pago != null) {
                return new Gson().toJson(pago);
            } else {
                response.status(404); // 404 Not Found
                return new Gson().toJson("Pago no encontrado");
            }
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error al obtener el pago: " + e.getMessage());
        }
    };

    // Obtener un pago por persona
    public static Route getPagoByPersona = (Request request, Response response) -> {
        response.type("application/json");
        try {
            PagoDAO pagoDAO = new PagoDAO();
            Integer idPersona = Integer.parseInt(request.params(":id"));
            return new Gson().toJson(pagoDAO.getByPersona(idPersona));
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error al obtener el pago: " + e.getMessage());
        }
    };

    // Obtener un pago por cuota
    public static Route getPagoByCuota = (Request request, Response response) -> {
        response.type("application/json");
        try {
            PagoDAO pagoDAO = new PagoDAO();
            Integer idCuota = Integer.parseInt(request.params(":id"));
            return new Gson().toJson(pagoDAO.getByCuota(idCuota));
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error al obtener el pagos: " + e.getMessage());
        }
    };

    // Obtener un pago por ID
    public static Route getPagoByUsuario = (Request request, Response response) -> {
        response.type("application/json");
        try {
            PagoDAO pagoDAO = new PagoDAO();
            Integer idUsuario = Integer.parseInt(request.params(":id"));
            return new Gson().toJson(pagoDAO.getByUsuario(idUsuario));
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error al obtener el pagos: " + e.getMessage());
        }
    };

    // Obtener todos los pagos
    public static Route getAllPagos = (Request request, Response response) -> {
        response.type("application/json");
        try {
            PagoDAO pagoDAO = new PagoDAO();
            return new Gson().toJson(pagoDAO.getAll());
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error al obtener los pagos: " + e.getMessage());
        }
    };

    // Actualizar un pago
public static Route updatePago = (Request request, Response response) -> {
    response.type("application/json");
    try {
        Integer idPago = Integer.parseInt(request.params(":id")); 
        Pago pago = new Gson().fromJson(request.body(), Pago.class); 
        boolean updated = PagoDAO.updatePago(idPago, pago); 
        if (updated) {
            return new Gson().toJson("Pago actualizado correctamente");
        } else {
            response.status(404);
            return new Gson().toJson("Pago no encontrado");
        }
    } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error al actualizar el pago: " + e.getMessage());
    }
};


    // Eliminar un pago
    public static Route deletePago = (Request request, Response response) -> {
        response.type("application/json");
        try {
            PagoDAO pagoDAO = new PagoDAO();
            Integer idPago = Integer.parseInt(request.params(":id"));
            boolean deleted = pagoDAO.delete(idPago);
            if (deleted) {
                return new Gson().toJson("Pago eliminado correctamente");
            } else {
                response.status(404);
                return new Gson().toJson("Pago no encontrado");
            }
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error al eliminar el pago: " + e.getMessage());
        }
    };
}

