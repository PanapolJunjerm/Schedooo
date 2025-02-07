package Group11.schedooo.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import Group11.schedooo.model.User;
import org.springframework.jdbc.core.RowMapper;

public class UserMapper implements RowMapper<User>{
    
    @Override
    public User mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        User u = new User();
        u.setUsername(resultSet.getString("Username"));
        u.setPassword(resultSet.getString("Password"));
        u.setEmail(resultSet.getString("Email"));
        return u;
    }
}
