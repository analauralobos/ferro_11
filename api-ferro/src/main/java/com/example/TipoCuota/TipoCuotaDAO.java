package com.example.TipoCuota;

import java.util.List;

import org.sql2o.Connection;

import com.example.db.Sql2oDAO;

public class TipoCuotaDAO {
    //obtener todos los tipos de cuotas 
    public List<TipoCuota> selectAll() {
        String selectAllSQL = "SELECT * FROM tipo_cuota";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(TipoCuota.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Insertar una nueva persona
    public boolean insert(TipoCuota tipoCuota) {
        String insertSQL = "INSERT INTO tipo_cuota (nombreTipoCuota, cantidad) VALUES (:nombreTipoCuota, :cantidad)";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(insertSQL)
               .addParameter("nombreTipoCuota",tipoCuota.getNombreTipoCuota())
               .addParameter("cantidad", tipoCuota.getCantidad())
               .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al insertar un tipo de cuota: " + e.getMessage());
            return false;
        }
    }

    public boolean update(Integer ID_TipoCuota, TipoCuota tipoCuota) {
        String updateSQL = "UPDATE tipo_cuota SET nombreTipoCuota=:nombreTipoCuota, cantidad = :cantidad WHERE ID_TipoCuota = :ID_TipoCuota";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            int result = con.createQuery(updateSQL)
                .addParameter("nombreTipoCuota",tipoCuota.getNombreTipoCuota())
                .addParameter("cantidad", tipoCuota.getCantidad())
                .addParameter("ID_TipoCuota", ID_TipoCuota)
                .executeUpdate()
                .getResult();
            return result > 0;
        } catch (Exception e) {
            System.err.println("Error al modificar el tipo de cuota: " + e.getMessage());
            return false;
        }
    }   


    // Eliminar una persona por ID
    public boolean delete(Integer id) {
        String deleteSQL = "DELETE FROM tipo_cuota WHERE ID_TipoCuota = :id";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            int result = con.createQuery(deleteSQL)
                            .addParameter("id", id)
                            .executeUpdate()
                            .getResult();
            return result > 0;
        } catch (Exception e) {
            System.err.println("Error al eliminar el tipo de cuota: " + e.getMessage());
            return false;
        }
    }
}
