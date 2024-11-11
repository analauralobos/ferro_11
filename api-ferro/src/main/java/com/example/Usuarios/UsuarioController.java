package com.example.Usuarios;

import java.util.List;

import com.google.gson.Gson;

import spark.Request;
import spark.Response;
import spark.Route;

public class UsuarioController {
    // Obtener todos los Usuarios
    public static Route getTodosUsuarios = (Request request, Response response) ->
    {
        response.type("application/json");
        try {
        UsuarioDAO p = new UsuarioDAO();
        List<Usuario> res = p.selectAll();
        return new Gson().toJson(res);
        } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };

    // Obtener todos los Administradores
    public static Route getTodosAdministradores = (Request request, Response response) ->
    {
        response.type("application/json");
        try {
        UsuarioDAO p = new UsuarioDAO();
        List<Usuario> res = p.selectAdministrador();
        return new Gson().toJson(res);
        } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };

    // Obtener todos los Cobradores
    public static Route getTodosCobradores = (Request request, Response response) ->
    {
        response.type("application/json");
        try {
        UsuarioDAO p = new UsuarioDAO();
        List<Usuario> res = p.selectCobrador();
        return new Gson().toJson(res);
        } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };

    // Obtener todos los Invitados
    public static Route getTodosInvitados = (Request request, Response response) ->
    {
        response.type("application/json");
        try {
        UsuarioDAO p = new UsuarioDAO();
        List<Usuario> res = p.selectInvitado();
        return new Gson().toJson(res);
        } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };

    // Crear una nueva persona
    public static Route crearUsuario = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Usuario nuevoUsuario = new Gson().fromJson(request.body(), Usuario.class); // Convertir JSON a objeto
            UsuarioDAO p = new UsuarioDAO();
            boolean resultado = p.insert(nuevoUsuario);
            if (resultado) {
                response.status(201); // Creado
                return new Gson().toJson("Usuario creada exitosamente");
            } else {
                response.status(400); // Error en la solicitud
                return new Gson().toJson("Error al crear usuario");
            }
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error en crear Usuario: " + e.getMessage());
        }
    };

    // Modificar una persona existente por ID
public static Route modificarUsuario = (Request request, Response response) -> {
    response.type("application/json");
    try {
        Integer ID_Usuario = Integer.parseInt(request.params(":id")); // Obtener el ID de los parámetros
        Usuario usuarioModificado = new Gson().fromJson(request.body(), Usuario.class); // Convertir JSON a objeto
        UsuarioDAO p = new UsuarioDAO();
        boolean resultado = p.update(ID_Usuario, usuarioModificado); // Pasar el nro_socio y el objeto persona
        if (resultado) {
            response.status(200); // OK
            return new Gson().toJson("Usuario modificada exitosamente");
        } else {
            response.status(404); // No encontrado
            return new Gson().toJson("Usuario no encontrada");
        }
    } catch (Exception e) {
        response.status(500);
        return new Gson().toJson("Error en modificar Usuario: " + e.getMessage());
    }
};


    // Eliminar una cuota por ID
    public static Route eliminarUsuario = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Integer id = Integer.parseInt(request.params(":id"));
            UsuarioDAO p = new UsuarioDAO();
            boolean resultado = p.delete(id);
            if (resultado) {
                response.status(200); // OK
                return new Gson().toJson("Usuario eliminada exitosamente");
            } else {
                response.status(404); // No encontrado
                return new Gson().toJson("Usuario no encontrada");
            }
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error en eliminar usuario: " + e.getMessage());
        }
    };
}


