package com.example.Personas;

import java.util.List;

import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;

public class PersonaController {
    // Obtener todas las personas
    public static Route getTodosPersonas = (Request request, Response response) ->
    {
        response.type("application/json");
        try {
        PersonaDAO p = new PersonaDAO();
        List<Persona> res = p.selectAll();
        return new Gson().toJson(res);
        } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };

    // Obtener todos los socios
    public static Route getTodosSocios = (Request request, Response response) ->
    {
        response.type("application/json");
        try {
        PersonaDAO p = new PersonaDAO();
        List<Persona> res = p.selectSocios();
        return new Gson().toJson(res);
        } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };

    // Obtener todos los abonados
    public static Route getTodosAbonados = (Request request, Response response) ->
    {
        response.type("application/json");
        try {
        PersonaDAO p = new PersonaDAO();
        List<Persona> res = p.selectAbonados();
        return new Gson().toJson(res);
        } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };
    
     // Obtener persona por id
    public static Route getPersona = (Request request, Response response) -> {
    response.type("application/json");
    try {
        String idParam = request.params(":id");
        if (idParam == null || !idParam.matches("\\d+")) {
            response.status(400); 
            return new Gson().toJson("ID inválido.");
        }
        
        Integer ID_Persona = Integer.parseInt(idParam);
        PersonaDAO p = new PersonaDAO();
        List<Persona> res = p.selectPersona(ID_Persona);
        
        if (res == null || res.isEmpty()) {
            response.status(404); 
            return new Gson().toJson("Persona no encontrada con el ID: " + ID_Persona);
        }

        return new Gson().toJson(res);
    } catch (Exception e) {
        response.status(500); // Internal Server Error
        return new Gson().toJson("Error controlador: " + e.getMessage());
    }
};

// Obtener socio por nro_socio
public static Route getSocio = (Request request, Response response) -> {
    response.type("application/json");
    try {
        String idParam = request.params(":id");
        if (idParam == null || !idParam.matches("\\d+")) {
            response.status(400); 
            return new Gson().toJson("ID inválido.");
        }
        
        Integer nro_socio = Integer.parseInt(idParam);
        PersonaDAO p = new PersonaDAO();
        List<Persona> res = p.selectSocio(nro_socio);
        
        if (res == null || res.isEmpty()) {
            response.status(404); 
            return new Gson().toJson("Socio no encontrado con el nro de socio: " + nro_socio);
        }

        return new Gson().toJson(res);
    } catch (Exception e) {
        response.status(500); // Internal Server Error
        return new Gson().toJson("Error controlador: " + e.getMessage());
    }
};


    // Crear una nueva persona
    public static Route crearPersona = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Persona nuevaPersona = new Gson().fromJson(request.body(), Persona.class); // Convertir JSON a objeto
            PersonaDAO p = new PersonaDAO();
            boolean resultado = p.insert(nuevaPersona);
            if (resultado) {
                response.status(201); // Creado
                return new Gson().toJson("Persona creada exitosamente");
            } else {
                response.status(400); // Error en la solicitud
                return new Gson().toJson("Error al crear la persona");
            }
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error en crearPersona: " + e.getMessage());
        }
    };

    // Modificar una persona existente por ID
public static Route modificarPersona = (Request request, Response response) -> {
    response.type("application/json");
    try {
        Integer nro_socio = Integer.parseInt(request.params(":id")); 
        Persona personaModificada = new Gson().fromJson(request.body(), Persona.class); 
        PersonaDAO p = new PersonaDAO();
        boolean resultado = p.update(nro_socio, personaModificada);
        if (resultado) {
            response.status(200); // OK
            return new Gson().toJson("Persona modificada exitosamente");
        } else {
            response.status(404); // No encontrado
            return new Gson().toJson("Persona no encontrada");
        }
    } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error en modificarPersona: " + e.getMessage());
    }
};


    // Eliminar una cuota por ID
    public static Route eliminarPersona = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Integer id = Integer.parseInt(request.params(":id"));
            PersonaDAO p = new PersonaDAO();
            boolean resultado = p.delete(id);
            if (resultado) {
                response.status(200); // OK
                return new Gson().toJson("Persona eliminada exitosamente");
            } else {
                response.status(404); // No encontrado
                return new Gson().toJson("Persona no encontrada");
            }
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error en eliminarPersona: " + e.getMessage());
        }
    };
}