package Group11.schedooo.repository;

import Group11.schedooo.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import Group11.schedooo.model.User;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
@Repository
public class JdbcUserRepository implements UserRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int save(User user){
        String sql = "INSERT INTO [User](Username, Password) VALUES(?, ?);";
        return jdbcTemplate.update(sql, new Object[]{user.getUsername(), getSHA256Hash(user.getPassword())});
    }

    @Override
    public User findByUsername(String username) {
        String sql = "SELECT Username, Password, Email FROM [User] WHERE Username = ? AND Password = ?;";
        try {
            return jdbcTemplate.queryForObject(sql, new UserMapper(), username);
        }catch(IncorrectResultSizeDataAccessException e){ //- if the query does not return exactly one row
            return null;
        }
    }

    @Override
    public boolean isUsernameAlreadyUsed(String username) {
        String sql = "SELECT Username, Password, Email FROM [User] WHERE Username = ? ;";
        //System.out.println(username);
        try {
            //User u = jdbcTemplate.queryForObject(sql, new UserMapper(), username);
            //jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(User.class), new Object[]{username});
            jdbcTemplate.queryForObject(sql, new UserMapper(), username);
            //String s = jdbcTemplate.queryForObject(sql, String.class, new Object[]{username});
            //System.out.println(u.getUsername());

            return true;
        }catch(IncorrectResultSizeDataAccessException e){ //- if the query does not return exactly one row
            return false;
        }
    }

    @Override
    public List<User> findAll() {
        return null;
    }

    @Override
    public void finda() {
        String sql = "SELECT * FROM [User]";
        List<User> users = jdbcTemplate.query(sql, new UserMapper());
        for (User user : users) {
            System.out.println("User: " + user.getUsername());
        }
    }

    /*@Override
    public User login(String username, String password) {
        String sql = "SELECT Username, Password, Email FROM [User] WHERE Username = ? AND Password = ?;";
        try {
            //User u = jdbcTemplate.queryForObject(sql, BeanPropertyRowMapper.newInstance(User.class), new Object[]{username});
            //User u = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(User.class), username, password);
            //System.out.println(u.getUsername());
            User s = jdbcTemplate.queryForObject(sql, new UserMapper(), username, password);
            
            return s;
        }catch(IncorrectResultSizeDataAccessException e){ //- if the query does not return exactly one row
            return null;
        }
    }*/

    @Override
    public String login(User user){
        String sql = "SELECT Username, Password, Email FROM [User] WHERE Username = ? AND Password = ?;";
        try {
            //User u = jdbcTemplate.queryForObject(sql, BeanPropertyRowMapper.newInstance(User.class), new Object[]{username});
            //User u = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(User.class), username, password);
            //System.out.println(u.getUsername());
            User s = jdbcTemplate.queryForObject(sql, new UserMapper(), user.getUsername(), getSHA256Hash(user.getPassword()));
            
            return s.getUsername();
        }catch(IncorrectResultSizeDataAccessException e){ //- if the query does not return exactly one row
            return null;
        }
    }

    public String getSHA256Hash(String input) {
        MessageDigest md;
        try {
            md = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = md.digest(input.getBytes());

            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
         return hexString.toString().substring(0, 20);
        } catch (NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return input;
        }
        
    }
}
