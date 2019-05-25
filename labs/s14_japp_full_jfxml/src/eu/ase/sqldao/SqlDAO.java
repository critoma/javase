package eu.ase.sqldao;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class SqlDAO {
	private Connection sqliteConn;
	private static SqlDAO currentInstance;
	
	private SqlDAO() {
		try {
			boolean cdb = false;
			File f = new File("./users.db");
			if (! f.exists())
				cdb = true;
			Class.forName("org.sqlite.JDBC");
			sqliteConn = DriverManager.getConnection("jdbc:sqlite:users.db");
			sqliteConn.setAutoCommit(false);
			
			if (cdb)
				createDBTable();
			
		} catch(ClassNotFoundException cnfe) {
			cnfe.printStackTrace();
		} catch(SQLException sqle) {
			sqle.printStackTrace();
		}
	}
	
	public static synchronized SqlDAO getInstance() {
		if (currentInstance == null) {
			currentInstance = new SqlDAO();
		}
		return currentInstance;
	}
	
	public void closeDB() {
		if (sqliteConn != null)
			try {
				sqliteConn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
	}
	
	private void createDBTable() 
			throws SQLException {
		Statement stmt = sqliteConn.createStatement();
		
		//String sqlDropTable = "drop table USERS";
		String sqlCreateTable = "create table USERS " +
				"(ID INT PRIMARY KEY NOT NULL," +
				"NAME TEXT NOT NULL, EMAIL CHAR(50), PASSWORD TEXT NOT NULL)";
		
//		try {
//			stmt.executeUpdate(sqlDropTable);
//		} catch(SQLException sqle) {
//			System.out.printf("%s", "\n The table users did not exist!");
//		}
		stmt.executeUpdate(sqlCreateTable);
		
		stmt.close();
		sqliteConn.commit();
	}
	
	public void insertIntoDB(int id, String name, String email, String pass) {
		try {
			Thread.sleep(10000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		try {
			if (sqliteConn != null) {
//				Statement stmt = null; String sql = null;
//				
//				stmt = sqliteConn.createStatement();
//				sql = "insert into USERS(ID, NAME, EMAIL, PASSWORD) values ("+id
//						+", '"+name+"', '"+email+"', '"+pass+"')";
//				stmt.executeUpdate(sql);
//				stmt.close();
//				return;
				
				PreparedStatement ps
					= sqliteConn.prepareStatement("insert into USERS(ID, NAME, EMAIL, PASSWORD) values (?, ?, ?, ?);");
				
				ps.setInt(1, id);
				ps.setString(2, name);
				ps.setString(3, email);
				ps.setString(4, pass);
				
				ps.executeUpdate();
				
				ps.close();
				
				sqliteConn.commit();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
    }
	
	public void displayDB() {
		System.out.println("\n Display the database: \n");
    	Statement stmt;
		try {
			stmt = sqliteConn.createStatement();
			String sqlSel = "select * from USERS;";
			
			ResultSet rs = stmt.executeQuery(sqlSel);
			while (rs.next()) {
				int id = rs.getInt("id");
				String name = rs.getString("NAME");
				String email = rs.getString("EMAIL");
				String pass = rs.getString("PASSWORD");
				
				System.out.printf("\nID = %d, Name = %s, email = %s, password = %s", id, name, email, pass);
			}
			
			rs.close();
			stmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
    }
	
}
