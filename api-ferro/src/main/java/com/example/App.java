package com.example;

import static spark.Spark.*;
import org.sql2o.Sql2o;

import com.example.Coutas.CuotaController;
import com.example.CuotaXPersona.CuotaXpersonaController;
import com.example.MetodoPago.MetodoPagoController;
import com.example.Personas.PersonaController;
import com.example.Rol.RolController;
import com.example.TipoCuota.TipoCuotaController;
import com.example.Usuarios.UsuarioController;
import com.example.db.Sql2oDAO;
import com.example.pagos.PagoController;


public class App {
    public static void main(String[] args) {
        try {
            Sql2o sql2o = Sql2oDAO.getSql2o();
            System.out.println("Conexión exitosa a la base de datos");
        } catch (Exception e) {
            System.out.println("No se pudo conectar a la base de datos: " + e.getMessage());
        }

        // Habilitar CORS antes de definir las rutas
        enableCORS("http://localhost:3000", "*", "*");

        //MUESTRA TODAS LAS CUOTAS POR PERSONA
        get("ferro/cuotaXpersona/Todos",CuotaXpersonaController.getAllCuotasXpersonas);
        get("ferro/cuotaXpersona/Todos/:id",CuotaXpersonaController.getAllCuotasXpersonasID);
        

        //INICIALIZA EL RESTA SEGUN LA EL TIPO DE CUOTA Q SE LE AGREGUE
        post("ferro/cuotasXpersona/Iniciar/:idPersona/:idCuota", CuotaXpersonaController.inicializarRestan);
        //MODIFICA EL RESTA
        post("ferro/cuotasXpersonas/modificar/:idPersona/:idCuota", CuotaXpersonaController.modificarRestan);

        //MOSTRAR TODOS LOS PAGOS (EJEMPLO SACAR REPORTE MENSUAL)
        get("ferro/pagos/Todos",PagoController.getAllPagos);
        //BUSCAR UN PAGO PARA REALIZAR UN RECIBO
        get("ferro/pagos/:id",PagoController.getPagoById);
        //BUSCAR PAGOS DE UNA PERSONA PARA VER CUOTAS
        get("ferro/pagos/persona/:id",PagoController.getPagoByPersona);
        //BUSCAR PAGO POR USUARIO PARA SACAR CUANDO COBRO CADA COBRADOR
        get("ferro/pagos/usuarios/:id",PagoController.getPagoByUsuario);
        //BUSCAR PAGOS POR CUOTAS PARA REPORTES
        get("ferro/pagos/cuotas/:id",PagoController.getPagoByCuota);
        //CREAR UN NUEVO PAGO
        post("ferro/pagos/crear", PagoController.createPago);
        //MODIFICAR UN PAGO
        post("ferro/pagos/modificar/:id", PagoController.updatePago);
        //ELIMINAR UN PAGO
        delete("ferro/pagos/eliminar/:id", PagoController.deletePago);

        //OBTENER TODAS LAS CUOTAS
        get("ferro/cuotas/Todos", CuotaController.getTodosCuotas);
        //CREAR UNA NUEVA CUOTA
        post("ferro/cuotas/crear", CuotaController.crearCuota);
        //BUSCAR UNA CUOTA POR ID
        get("ferro/cuotas/:id",CuotaController.getCuota);
        //MODIFICAR UNA CUOTA
        post("ferro/cuotas/modificar/:id", CuotaController.modificarCuota);
        //ELIMINAR UNA CUOTA
        delete("ferro/cuotas/eliminar/:id", CuotaController.eliminarCuota);

        //OBTENER TODOS LOS TIPOS DE CUOTAS
        get("ferro/TipoCuota/Todos",TipoCuotaController.getTodosTipoCuotas);
        //CREAR UN NUEVO TIPO DE CUOTA (SOLO PARA ADMINISTRADORES)
        post("ferro/TipoCuota/crear", TipoCuotaController.crearTipoCuota);
        //MODIFICAR UN NUEVO TIPO DE CUOTA (SOLO PARA ADMINISTRADORES)
        post("ferro/TipoCuota/modificar/:id", TipoCuotaController.modificarTipoCuota);
        //ELIMINAR UN TIPO DE CUOTA (SOLO PARA ADMINISTRADORES)
        delete("ferro/TipoCuota/eliminar/:id", TipoCuotaController.eliminarTipoCuota);


        //OBTENER LOS METODOS DE PAGO PARA SELECCIONAR AL PAGAR UNA CUOTA
        get("ferro/MetodoPago/Todos",MetodoPagoController.getTodosMetodosPago);
        
        //OBTENER TODAS LAS PERSONAS
        get("ferro/personas/Todos", PersonaController.getTodosPersonas);
        //OBTENER SOLO LOS SOCIOS
        get("ferro/personas/TodosSocios", PersonaController.getTodosSocios);
        //OBTENER SOLO LAS PERSONAS QUE TIENEN CUOTAS DE RIFA
        get("ferro/personas/TodosAbonados", PersonaController.getTodosAbonados);
        //OBTENER UNA PERSONA POR ID_PERSONA
        get("ferro/personas/:id",PersonaController.getPersona); 
        //OBTENER UNA PERSONA POR NRO SOCIO
        get("ferro/personas/socio/:id",PersonaController.getSocio); 
        //CREAR UNA PERSONA
        post("ferro/personas/crear", PersonaController.crearPersona);
        //MODIFICAR UNA PERSONA
        put("ferro/personas/modificar/:id", PersonaController.modificarPersona); 
        //ELIMINAR UNA PERSONA 
        delete("ferro/personas/eliminar/:id", PersonaController.eliminarPersona);

        //MANEJA EL SISTEMA COMPLETO
        get("ferro/usuarios/administradores", UsuarioController.getTodosAdministradores);
        // PUEDE MODIFICAR Y AGREGAR PAGOS PERO NO AGREGAR NUEVAS CUOTAS
        get("ferro/usuarios/cobradores", UsuarioController.getTodosCobradores);
        // SOLO VA A IMPRIMIR LOS REPORTES Y VER SIN PODES MODIFICAR
        get("ferro/usuarios/invitados", UsuarioController.getTodosInvitados);
        // RUTA PARA INGRESAR AL SISTEMA
        get("ferro/usuarios/todos", UsuarioController.getTodosUsuarios);

        //PARA PONER EN EL ICONO DE PERSONAS PARA Q LOS ADMINISTRADORES PUEDAS AGREGAR
        //COBRADORES O INVITADOS O NUEVOS ADMINISTRADORES O ELIMINARLOS SI YA NO TRABAJAN
        //CREAR NUEVO USUARIO
        post("ferro/usuarios/crear", UsuarioController.crearUsuario);
        //MODIFICAR USUARIO
        post("ferro/usuarios/modificar/:id", UsuarioController.modificarUsuario);
        //ELIMINAR USUARIO
        delete("ferro/usuarios/eliminar/:id", UsuarioController.eliminarUsuario);

        //RUTA PARA OBTENER LOS ROLES 
        //PENSADO PARA QUE LOS ADMINISTRADORES PUEDAN CREAR NUEVOS USUARIOS
        get("ferro/roles/todos",RolController.getTodosRoles);

      
    }

    // Método para habilitar CORS
    private static void enableCORS(final String origin, final String methods, final String headers) {
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", origin);
            response.header("Access-Control-Request-Method", methods);
            response.header("Access-Control-Allow-Headers", headers);
        });
    }
}

