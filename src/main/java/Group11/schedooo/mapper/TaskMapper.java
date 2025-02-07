package Group11.schedooo.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import Group11.schedooo.model.Task;
import org.springframework.jdbc.core.RowMapper;

public class TaskMapper implements RowMapper<Task>{

    @Override
    public Task mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        Task t = new Task();
        t.setTaskID(resultSet.getInt("TaskID"));
        t.setNameTask(resultSet.getString("NameTask"));
        t.setDetailTask(resultSet.getString("DetailTask"));
        t.setIsDone(resultSet.getBoolean("isDone"));
        t.setDeadlineTask(resultSet.getString("DeadlineTask"));
        t.setUsername(resultSet.getString("Username"));
        return t;
    }
}
