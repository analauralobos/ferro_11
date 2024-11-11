package com.example.Personas;

import java.util.List;
import org.sql2o.Connection;

import com.example.db.Sql2oDAO;

public class PersonaDAO {
    // Seleccionar todas las personas
     public List<Persona> selectAll() {
        String selectAllSQL = "SELECT * FROM personas;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Persona.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Seleccionar todos los socio
    public List<Persona> selectSocios() {
        String selectAllSQL = "SELECT * FROM personas WHERE nro_socio IS NOT NULL;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Persona.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Seleccionar todos los abonados
    public List<Persona> selectAbonados() {
        String selectAllSQL = "SELECT personas.ID_Persona, personas.apellido_nombre FROM personas JOIN cuotaXpersona  ON personas.ID_Persona = cuotaxpersona.ID_Persona JOIN cuota ON cuota.ID_Cuota = cuotaxpersona.ID_Cuota JOIN tipo_cuota  ON cuota.ID_TipoCuota = tipo_cuota.ID_TipoCuota WHERE tipo_cuota.ID_TipoCuota = 2";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Persona.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Seleccionar una persona por id
    public List<Persona> selectPersona(Integer ID_Persona) {
        String selectSocioSQL = "SELECT * FROM personas WHERE ID_Persona = :ID_Persona;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectSocioSQL)
                      .addParameter("ID_Persona", ID_Persona)
                      .executeAndFetch(Persona.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }
    // Seleccionar una persona por nro_socio
    public List<Persona> selectSocio(Integer nro_socio) {
    String selectSocioSQL = "SELECT * FROM personas WHERE nro_socio = :nro_socio;";
    try (Connection con = Sql2oDAO.getSql2o().open()) {
        return con.createQuery(selectSocioSQL)
                  .addParameter("nro_socio", nro_socio)
                  .executeAndFetch(Persona.class);
    } catch (Exception e) {
        System.err.println("Error al ejecutar la query: " + e.getMessage());
        return null;
    }
}


    // Insertar una nueva persona
    public boolean insert(Persona persona) {
        String insertSQL = "INSERT INTO personas (nro_socio, apellido_nombre, documento, direccion, telefono, email, fecha_inicio, fecha_nacimiento) VALUES (:nro_socio, :apellido_nombre, :documento, :direccion, :telefono, :email, :fecha_inicio, :fecha_nacimiento)";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(insertSQL)
                .addParameter("nro_socio",persona.getNro_socio())
               .addParameter("apellido_nombre", persona.getApellido_nombre())
               .addParameter("documento", persona.getDocumento())
               .addParameter("direccion", persona.getDireccion())
               .addParameter("telefono", persona.getTelefono())
               .addParameter("email", persona.getEmail())
               .addParameter("fecha_inicio", persona.getFecha_inicio())
               .addParameter("fecha_nacimiento", persona.getFecha_nacimiento())
               .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al insertar la persona: " + e.getMessage());
            return false;
        }
    }

    //modificar una persona
    public boolean update(Integer ID_Persona, Persona persona) {
        String updateSQL = "UPDATE personas SET nro_socio=:nro_socio, apellido_nombre = :apellido_nombre, documento = :documento, direccion = :direccion, telefono = :telefono, email = :email, fecha_inicio = :fecha_inicio, fecha_nacimiento= :fecha_nacimiento WHERE ID_Persona = :ID_Persona";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            int result = con.createQuery(updateSQL)
                .addParameter("nro_socio",persona.getNro_socio())
                .addParameter("apellido_nombre", persona.getApellido_nombre())
                .addParameter("documento", persona.getDocumento())
                .addParameter("direccion", persona.getDireccion())
                .addParameter("telefono", persona.getTelefono())
                .addParameter("email", persona.getEmail())
                .addParameter("fecha_inicio", persona.getFecha_inicio())
                .addParameter("fecha_nacimiento", persona.getFecha_nacimiento())
                .addParameter("ID_Persona", ID_Persona)
                .executeUpdate()
                .getResult();
            return result > 0;
        } catch (Exception e) {
            System.err.println("Error al modificar la persona: " + e.getMessage());
            return false;
        }
    }
    


    // Eliminar una persona por ID
    public boolean delete(Integer id) {
        String deleteSQL = "DELETE FROM personas WHERE ID_Persona = :id";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            int result = con.createQuery(deleteSQL)
                            .addParameter("id", id)
                            .executeUpdate()
                            .getResult();
            return result > 0;
        } catch (Exception e) {
            System.err.println("Error al eliminar la persona: " + e.getMessage());
            return false;
        }
    }
}