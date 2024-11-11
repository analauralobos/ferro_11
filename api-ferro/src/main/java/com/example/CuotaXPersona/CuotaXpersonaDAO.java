package com.example.CuotaXPersona;

import java.util.List;
import org.sql2o.Connection;
import com.example.db.Sql2oDAO;

public class CuotaXpersonaDAO {
    // Seleccionar todas las personas
     public List<CuotaXpersona> selectAll() {
        String selectAllSQL = "SELECT * FROM cuotaXpersona;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(CuotaXpersona.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Seleccionar cuotas por id
    public List<CuotaXpersona> selectCuota(Integer ID_CuotaXpersona) {
    String selectAllSQL = "SELECT * FROM cuotaxpersona WHERE ID_CuotaXpersona = :ID_CuotaXpersona;";
    try (Connection con = Sql2oDAO.getSql2o().open()) {
        return con.createQuery(selectAllSQL)
                  .addParameter("ID_CuotaXpersona", ID_CuotaXpersona)
                  .executeAndFetch(CuotaXpersona.class);
    } catch (Exception e) {
        System.err.println("Error al ejecutar la query: " + e.getMessage());
        return null;
    }
}


    public void inicializarRestan(int idPersona, int idCuota) {
        String sql = "INSERT INTO cuotaxpersona (ID_Persona, ID_Cuota, restan) " +
                     "SELECT :ID_Persona, :ID_Cuota, tipo_cuota.cantidad " +
                     "FROM tipo_cuota " +
                     "JOIN cuota ON cuota.ID_TipoCuota = tipo_cuota.ID_TipoCuota " +
                     "WHERE cuota.ID_Cuota = :ID_Cuota";

        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(sql)
               .addParameter("ID_Persona", idPersona)
               .addParameter("ID_Cuota", idCuota)
               .executeUpdate();
            System.out.println("Cuota inicializada correctamente para la persona con ID " + idPersona);
        } catch (Exception e) {
            System.err.println("Error al inicializar la cuota: " + e.getMessage());
        }
    }

    public void modificarRestan(int idPersona, int idCuota, CuotaXpersona cuotaXpersona) {
        String sql = "UPDATE cuotaxpersona SET restan = :restan WHERE ID_Persona = :ID_Persona AND ID_Cuota = :ID_Cuota";

        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(sql)
               .addParameter("restan",cuotaXpersona.getRestan())
               .addParameter("ID_Persona", idPersona)
               .addParameter("ID_Cuota", idCuota)
               .executeUpdate();
            System.out.println("Cuota moficada correctamente para la persona con ID " + idPersona);
        } catch (Exception e) {
            System.err.println("Error al inicializar la cuota: " + e.getMessage());
        }
    }
}
