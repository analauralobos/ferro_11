package com.example.Coutas;

import java.util.List;
import org.sql2o.Connection;

import com.example.db.Sql2oDAO;

public class CuotaDAO {
     // Seleccionar todas las cuotas
     public List<Cuota> selectAll() {
        String selectAllSQL = "SELECT * FROM cuota;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Cuota.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Seleccionar cuotas por id
    public List<Cuota> selectCuota(Integer ID_Cuota) {
    String selectAllSQL = "SELECT * FROM cuota WHERE ID_Cuota = :ID_Cuota;";
    try (Connection con = Sql2oDAO.getSql2o().open()) {
        return con.createQuery(selectAllSQL)
                  .addParameter("ID_Cuota", ID_Cuota)  // Asigna el valor del parámetro
                  .executeAndFetch(Cuota.class);
    } catch (Exception e) {
        System.err.println("Error al ejecutar la query: " + e.getMessage());
        return null;
    }
}


    // Insertar una nueva cuota
    public boolean insert(Cuota cuota) {
        String insertSQL = "INSERT INTO cuota (nombreCuota, Monto, diadeVencimiento, ID_TipoCuota) VALUES (:nombreCuota, :Monto, :diadeVencimiento, :ID_TipoCuota)";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(insertSQL)
               .addParameter("nombreCuota", cuota.getNombreCuota())
               .addParameter("Monto", cuota.getMonto())
               .addParameter("diadeVencimiento", cuota.getDiadeVencimiento())
               .addParameter("ID_TipoCuota", cuota.getID_TipoCuota())
               .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al insertar la cuota: " + e.getMessage());
            return false;
        }
    }

    // Actualizar una cuota existente
public boolean update(Integer ID_Cuota, Cuota cuota) {
    String updateSQL = "UPDATE cuota SET nombreCuota = :nombreCuota, Monto = :Monto, diadeVencimiento = :diadeVencimiento, " +
                       "ID_TipoCuota = :ID_TipoCuota WHERE ID_Cuota = :ID_Cuota"; 
    try (Connection con = Sql2oDAO.getSql2o().open()) {
        int result = con.createQuery(updateSQL)
            .addParameter("nombreCuota", cuota.getNombreCuota())
            .addParameter("Monto", cuota.getMonto())
            .addParameter("diadeVencimiento", cuota.getDiadeVencimiento())
            .addParameter("ID_TipoCuota", cuota.getID_TipoCuota())
            .addParameter("ID_Cuota",ID_Cuota)
            .executeUpdate()
            .getResult();
        return result > 0;
    } catch (Exception e) {
        System.err.println("Error al modificar la cuota: " + e.getMessage());
        return false;
    }
}

    // Eliminar una cuota por ID
    public boolean delete(Integer id) {
        String deleteSQL = "DELETE FROM cuota WHERE ID_Cuota = :ID_Cuota";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            int result = con.createQuery(deleteSQL)
                            .addParameter("ID_Cuota", id)
                            .executeUpdate()
                            .getResult();
            return result > 0;
        } catch (Exception e) {
            System.err.println("Error al eliminar la cuota: " + e.getMessage());
            return false;
        }
    }
}
