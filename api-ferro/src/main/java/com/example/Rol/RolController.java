package com.example.Rol;

import java.util.List;

import com.google.gson.Gson;

import spark.Request;
import spark.Response;
import spark.Route;

public class RolController {
    // Obtener todos los roles
    public static Route getTodosRoles = (Request request, Response response) ->
    {
        response.type("application/json");
        try {
        RolDAO p = new RolDAO();
        List<Rol> res = p.selectAll();
        return new Gson().toJson(res);
        } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };
}
