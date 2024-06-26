package com.lenigir.tomtickets.DAO;

import com.lenigir.tomtickets.beans.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.ArrayList;
import java.util.List;

// This class provides the following methods:
// - void AggiungiProfilo(ProfiloBean, Connection)
// - void EliminaProfilo(ProfileBean, Connection)
// - ProfiloBean GetProfiloBean(String username, Connection)
// - List<ProfiloBean> GetProfili(Connection)
// - void IncreaseAcquisti(ProfiloBean, Connection)
// - boolean UserExists(string username, Connection)
// - boolean isAdmin(string username, Connection)
public class ProfiloDAO {

    // Adds a new ProfiloBean enty in the DB
    //
    // Arguments:
    // - ProfiloBean
    // - Connection
    //
    // Returns value:
    // The number of rows affected by the change
    //
    // Throws:
    // SQLException
    public static void AggiungiProfilo(ProfiloBean profilo, Connection con) throws SQLException {
        
        try {
            if (UserExists(profilo.getUsername(), con)) return;
            
            String query = "INSERT INTO Profili VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";

            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, profilo.getUsername());
            ps.setString(2, profilo.getPassword());
            ps.setString(3, profilo.getNome());
            ps.setString(4, profilo.getCognome());
            ps.setString(5, profilo.getBirthDate());
            ps.setString(6, profilo.getEmail());
            ps.setString(7, profilo.getPhoneNumber());
            ps.setInt(8, profilo.getAcquisti());
            ps.setBoolean(9, profilo.isAdmin());
            ps.executeUpdate();
            return;

        } catch (SQLException e) {
            throw new SQLException(e);
        }

    }

    // Deletes a ProfiloBean from the DB
    // Arguments:
    // - ProfiloBean
    // - Connection
    //
    // Return value:
    // The number of rows affected by the change
    //
    // Throws:
    // SQLException
    public static void EliminaProfilo(ProfiloBean profilo, Connection con) throws SQLException {
        try {

            if (!UserExists(profilo.getUsername(), con)) {
                throw new SQLException("User does not exist");
            }
            
            String query = "DELETE FROM Profili WHERE username=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, profilo.getUsername());
            ps.executeUpdate();
            return;

        } catch (SQLException e) {
            throw new SQLException(e);
        }
    }

    // Returns a ProfiloBean from the DB
    //
    // Arguments:
    // - String username
    // - Connection
    //
    // Return value:
    // A ProfiloBean corresponding to the username
    //
    // Throws:
    // SQLException
    public static ProfiloBean GetProfiloBean(String username, Connection con) throws SQLException {

        try {
        
            String query = "SELECT * FROM Profili WHERE username=?";

            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();

            ProfiloBean profilo = new ProfiloBean();
            
            while (rs.next()) {

                profilo.setUsername(rs.getString("username"));
                profilo.setPassword(rs.getString("password"));
                profilo.setNome(rs.getString("nome")); 
                profilo.setCognome(rs.getString("cognome"));
                profilo.setBirthDate(rs.getString("birthdate"));
                profilo.setEmail(rs.getString("email"));
                profilo.setPhoneNumber(rs.getString("phonenumber"));
                profilo.setAcquisti(Integer.valueOf(rs.getString("numeroacquisti")));
                profilo.setAdmin(rs.getBoolean("isadmin"));
            }

            return profilo;

        }
        catch(SQLException e) {
            throw new SQLException(e);
        }
    }

    // Returns a List of all the profiles in the DB
    //
    // Arguments:
    // - Connection
    //
    // Return value:
    // A List<ProfileBean> with all the profiles from the DB
    //
    // Throws:
    // SQLException
    public static List<ProfiloBean> GetProfili(Connection con) throws SQLException {
       
        List<ProfiloBean> profili = new ArrayList<>(); 

        try {
       
            Statement stm = con.createStatement();
            String query = "SELECT * FROM Profili";
            ResultSet rs = stm.executeQuery(query);;
            
            while (rs.next()) {
                
                ProfiloBean profilo = new ProfiloBean();
                
                profilo.setUsername(rs.getString("username"));
                profilo.setPassword(rs.getString("password"));
                profilo.setNome(rs.getString("nome")); 
                profilo.setCognome(rs.getString("cognome"));
                profilo.setBirthDate(rs.getString("birthdate"));
                profilo.setEmail(rs.getString("email"));
                profilo.setPhoneNumber(rs.getString("phonenumber"));
                profilo.setAcquisti(Integer.valueOf(rs.getString("numeroacquisti")));
                profilo.setAdmin(rs.getBoolean("isadmin"));

                profili.add(profilo);
            }

        }
        catch(SQLException e) {
            throw new SQLException(e);
        }
        
        return profili;
    }

    // Returns true if an user with the same username passed as arg already
    // exists in the database
    //
    // Arguments:
    // - String username
    // - Connection
    //
    // Return value:
    // Boolean
    //
    // Throws:
    // SQLException
    public static boolean UserExists(String username, Connection con) throws SQLException {

        try {

            String query = "SELECT username FROM Profili WHERE username=?";

            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();

            if(rs.next() == true){
                return true;
            }else{
                return false;
            }

        } catch (SQLException e) {
            throw new SQLException(e);
        }
    }
    public static boolean isAdmin(String username, Connection con) throws SQLException {
    try {
        String query = "SELECT isAdmin FROM Profili WHERE username=?";
        PreparedStatement ps = con.prepareStatement(query);
        ps.setString(1, username);
        ResultSet rs = ps.executeQuery();

        if (rs.next()) {
            // Assuming 'isAdmin' column is a boolean in the database
            return rs.getBoolean("isAdmin");
        } else {
            // If user not found or admin status not set
            return false;
        }
    } catch (SQLException e) {
        // Handle SQL exception
        throw new SQLException(e);
    }
    }


    // Increases the number of purchases of a ProfiloBean
    // Arguments:
    // - ProfiloBean
    // - Connection
    //
    // Return value:
    // The number of rows affected by the change
    //
    // Throws:
    // SQLException
    public static void IncreaseAcquisti(ProfiloBean profilo, Connection con, int numeroAcquisti) throws SQLException {
       
        try {

            if (!UserExists(profilo.getUsername(), con)) return;
            
            String query = "UPDATE Profili SET numeroAcquisti=? WHERE username=?";

            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, String.valueOf(profilo.getAcquisti() + numeroAcquisti));
            ps.setString(2, profilo.getUsername());
            ps.executeUpdate();
            return;

        } catch (SQLException e) {
            throw new SQLException(e);
        }
    }


}
