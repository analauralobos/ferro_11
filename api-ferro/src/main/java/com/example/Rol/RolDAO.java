package com.example.Rol;

import java.util.List;

import org.sql2o.Connection;

import com.example.db.Sql2oDAO;

public class RolDAO {
    // Seleccionar todos los roles
     public List<Rol> selectAll() {
        String selectAllSQL = "SELECT * FROM rol";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Rol.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }
}