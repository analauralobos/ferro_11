package com.example.MetodoPago;

import java.util.List;

import org.sql2o.Connection;

import com.example.db.Sql2oDAO;

public class MetodoPagoDAO {
    // Seleccionar todos los Metodos de Pago
     public List<MetodoPago> selectAll() {
        String selectAllSQL = "SELECT * FROM metodo_pago";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(MetodoPago.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }
}
