package com.example.MetodoPago;

import java.util.List;

import com.google.gson.Gson;

import spark.Request;
import spark.Response;
import spark.Route;

public class MetodoPagoController {
    // Obtener todos los Metodos de pago
    public static Route getTodosMetodosPago = (Request request, Response response) ->
    {
        response.type("application/json");
        try {
        MetodoPagoDAO p = new MetodoPagoDAO();
        List<MetodoPago> res = p.selectAll();
        return new Gson().toJson(res);
        } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };
}
