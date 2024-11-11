package com.example.pagos;

import java.util.List;
import org.sql2o.Connection;
import com.example.db.Sql2oDAO;

public class PagoDAO {
    // Método para crear un nuevo pago
public static boolean create(Pago pago) {
    String sql = "INSERT INTO pago (Fecha_Pago, ID_Persona, ID_Cuota, ID_Usuario, Monto, ID_MetodoPago, cantidadCuotasPagadas) " +
                 "VALUES (:Fecha_Pago, :ID_Persona, :ID_Cuota, :ID_Usuario, :Monto, :ID_MetodoPago, :cantidadCuotasPagadas)";
    try (Connection con = Sql2oDAO.getSql2o().open()) {
        con.createQuery(sql)
           .addParameter("Fecha_Pago", pago.getFecha_Pago())
           .addParameter("ID_Persona", pago.getID_Persona())
           .addParameter("ID_Cuota", pago.getID_Cuota())
           .addParameter("ID_Usuario", pago.getID_Usuario())
           .addParameter("Monto", pago.getMonto())
           .addParameter("ID_MetodoPago", pago.getID_MetodoPago())
           .addParameter("cantidadCuotasPagadas", pago.getCantidadCuotasPagadas())
           .executeUpdate();
        return true;
    } catch (Exception e) {
        System.err.println("Error al crear el pago: " + e.getMessage());
        return false;
    }
}


    // Método para obtener un pago por su ID
    public Pago getById(Integer idPago) {
        String sql = "SELECT * FROM pago WHERE ID_Pago = :idPago";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(sql)
                      .addParameter("idPago", idPago)
                      .executeAndFetchFirst(Pago.class);
        } catch (Exception e) {
            System.err.println("Error al obtener el pago: " + e.getMessage());
            return null;
        }
    }

    // Método para obtener un pago por persona
    public List<Pago> getByPersona(Integer idPersona) {
        String sql = "SELECT * FROM pago WHERE ID_Persona = :idPersona";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(sql)
                      .addParameter("idPersona", idPersona)
                      .executeAndFetch(Pago.class);
        } catch (Exception e) {
            System.err.println("Error al obtener el pago: " + e.getMessage());
            return null;
        }
    }

    // Método para obtener un pago por cuota
    public List<Pago> getByCuota(Integer idCuota) {
        String sql = "SELECT * FROM pago WHERE ID_Cuota = :idCuota";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(sql)
                      .addParameter("idCuota", idCuota)
                      .executeAndFetch(Pago.class);
        } catch (Exception e) {
            System.err.println("Error al obtener el pago: " + e.getMessage());
            return null;
        }
    }

    // Método para obtener un pago por usuario
    public List<Pago> getByUsuario(Integer idUsuario) {
        String sql = "SELECT * FROM pago WHERE ID_Usuario = :idUsuario";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(sql)
                      .addParameter("idUsuario", idUsuario)
                      .executeAndFetch(Pago.class);
        } catch (Exception e) {
            System.err.println("Error al obtener el pago: " + e.getMessage());
            return null;
        }
    }

    // Método para obtener todos los pagos
    public List<Pago> getAll() {
        String sql = "SELECT * FROM pago";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(sql).executeAndFetch(Pago.class);
        } catch (Exception e) {
            System.err.println("Error al obtener todos los pagos: " + e.getMessage());
            return null;
        }
    }

// Método para actualizar un pago por su ID
public static boolean updatePago(Integer idPago, Pago pago) {
    String sql = "UPDATE pago SET fecha_pago= :Fecha_Pago,ID_Persona= :ID_Persona, ID_Cuota= :ID_Cuota,"+
    " ID_Usuario= :ID_Usuario, monto= :Monto,ID_MetodoPago= :ID_MetodoPago, cantidadCuotasPagadas= :cantidadCuotasPagadas WHERE ID_Pago= :ID_Pago;";  
    try (Connection con = Sql2oDAO.getSql2o().open()) {
        int updated = con.createQuery(sql)                         
                        .addParameter("Fecha_Pago", pago.getFecha_Pago())
                        .addParameter("ID_Persona", pago.getID_Persona())
                        .addParameter("ID_Cuota", pago.getID_Cuota())
                        .addParameter("ID_Usuario", pago.getID_Usuario())
                        .addParameter("Monto", pago.getMonto())
                        .addParameter("ID_MetodoPago", pago.getID_MetodoPago())
                        .addParameter("cantidadCuotasPagadas", pago.getCantidadCuotasPagadas())                      
                        .addParameter("ID_Pago", idPago) 
                        .executeUpdate()
                        .getResult();
        return updated > 0; // Retorna true si se actualizó al menos un registro
    } catch (Exception e) {
        System.err.println("Error al modificar el pago: " + e.getMessage());
        return false;
    }
}


    // Método para eliminar un pago por su ID
    public boolean delete(Integer idPago) {
        String sql = "DELETE FROM pago WHERE ID_Pago = :idPago";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            int deleted = con.createQuery(sql)
                             .addParameter("idPago", idPago)
                             .executeUpdate()
                             .getResult();
            return deleted > 0;
        } catch (Exception e) {
            System.err.println("Error al eliminar el pago: " + e.getMessage());
            return false;
        }
    }
}

