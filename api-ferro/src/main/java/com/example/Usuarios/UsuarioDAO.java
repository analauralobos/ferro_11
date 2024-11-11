package com.example.Usuarios;

import java.util.List;

import org.sql2o.Connection;

import com.example.db.Sql2oDAO;

public class UsuarioDAO {
    // Seleccionar todos los usuario
     public List<Usuario> selectAll() {
        String selectAllSQL = "SELECT * FROM usuarios";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Usuario.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Seleccionar todos los cobradores
    public List<Usuario> selectCobrador() {
        String selectAllSQL = "SELECT * FROM usuarios where ID_Rol=3";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Usuario.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Seleccionar todos los administradores
    public List<Usuario> selectAdministrador() {
        String selectAllSQL = "SELECT * FROM usuarios where ID_Rol=1";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Usuario.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Seleccionar todos los Invitados
    public List<Usuario> selectInvitado() {
        String selectAllSQL = "SELECT * FROM usuarios where ID_Rol=2";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Usuario.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }


    // Insertar un nuevo usuario
    public boolean insert(Usuario usuario) {
        String insertSQL = "INSERT INTO usuarios (nombreUsuario, contraseña, ID_Rol) VALUES (:nombreUsuario, :contraseña, :ID_Rol)";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(insertSQL)
                .addParameter("nombreUsuario",usuario.getNombreUsuario())
               .addParameter("contraseña", usuario.getContraseña())
               .addParameter("ID_Rol", usuario.getID_Rol())
               .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al insertar el usuario: " + e.getMessage());
            return false;
        }
    }

    //modificar una persona
    public boolean update(Integer ID_Usuario, Usuario usuario) {
        String updateSQL = "UPDATE usuarios SET nombreUsuario=:nombreUsuario, contraseña = :contraseña, ID_Rol = :ID_Rol WHERE ID_Usuario = :ID_Usuario";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            int result = con.createQuery(updateSQL)
                .addParameter("nombreUsuario",usuario.getNombreUsuario())
                .addParameter("contraseña", usuario.getContraseña())
                .addParameter("ID_Rol", usuario.getID_Rol())
                .addParameter("ID_Usuario", ID_Usuario)
                .executeUpdate()
                .getResult();
            return result > 0;
        } catch (Exception e) {
            System.err.println("Error al modificar la persona: " + e.getMessage());
            return false;
        }
    }
    


    // Eliminar una usuario por ID
    public boolean delete(Integer id) {
        String deleteSQL = "DELETE FROM usuarios WHERE ID_Usuario = :id";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            int result = con.createQuery(deleteSQL)
                            .addParameter("id", id)
                            .executeUpdate()
                            .getResult();
            return result > 0;
        } catch (Exception e) {
            System.err.println("Error al eliminar usuario: " + e.getMessage());
            return false;
        }
    }

}
