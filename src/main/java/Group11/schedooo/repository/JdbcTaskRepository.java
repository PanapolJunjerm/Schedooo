package Group11.schedooo.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import Group11.schedooo.mapper.TaskMapper;
import Group11.schedooo.model.Task;

@Repository
public class JdbcTaskRepository implements TaskRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int save(Task task) {
        String sql = "INSERT INTO Task(TaskID, Username, NameTask, DetailTask, isDone, DeadlineTask) VALUES(?, ?, ?, ?, ?, ?);";
        int taskID = getMaxID(task.getUsername()) + 1;
        System.out.println("save : " + task.getNameTask() + " " + taskID);
        return jdbcTemplate.update(sql, new Object[]{taskID, task.getUsername(), task.getNameTask(), task.getDetailTask(), task.getIsDone(), task.getDeadlineTask()});
    }

    @Override
    public Task findTaskByTaskIDAndUsername(String username, int taskID) {
        //ใส่ try cactch ทำให้เป็น return null เมื่อ error
        //String sql = "SELECT TaskID, Username, NameTask, DetailTask, isDone, CONVERT(varchar, DeadlineTask, 103) AS DeadlineTask FROM Task WHERE Username = ? AND TaskID = ?;";
        String sql = "SELECT TaskID, Username, NameTask, DetailTask, isDone, DeadlineTask FROM Task WHERE Username = ? AND TaskID = ?;";
        return jdbcTemplate.queryForObject(sql, new TaskMapper(), username, taskID);
    }

    @Override
    public List<Task> findTaskByUsername(String username) {
        //String sql = "SELECT TaskID, Username, NameTask, DetailTask, isDone, CONVERT(varchar, DeadlineTask, 103) AS DeadlineTask FROM Task WHERE Username = ?;";
        System.out.println("find task by username " + username);
        String sql = "SELECT TaskID, Username, NameTask, DetailTask, isDone, DeadlineTask FROM Task WHERE Username = ?;";
        return jdbcTemplate.query(sql, new TaskMapper(), username);
    }

    @Override
    public List<Task> findTaskByDate(String username, String date) {
        System.out.println("findTaskByDate");
        //String sql = "SELECT TaskID, Username, NameTask, DetailTask, isDone, CONVERT(varchar, DeadlineTask, 103) AS DeadlineTask FROM Task WHERE Username = ? AND DeadlineTask = ?;";
        String sql = "SELECT TaskID, Username, NameTask, DetailTask, isDone, DeadlineTask FROM Task WHERE Username = ? AND DeadlineTask = ?;";
        return jdbcTemplate.query(sql, new TaskMapper(), username, date);
    }

    @Override
    public List<Task> findAll() {
        //String sql = "SELECT TaskID, Username, NameTask, DetailTask, isDone, CONVERT(varchar, DeadlineTask, 103) AS DeadlineTask FROM Task";
        String sql = "SELECT TaskID, Username, NameTask, DetailTask, isDone, DeadlineTask FROM Task";
        return jdbcTemplate.query(sql, new TaskMapper());
    }

    @Override
    public int deleteTask(int taskID, String username) {
        //String sql = "UPDATE Task SET TaskID = TaskID - 1 WHERE TaskID > ? AND Username = ?;";
        String sql = "DELETE FROM Task WHERE TaskID = ? AND Username = ?;";
        return jdbcTemplate.update(sql, taskID, username);
    }

    @Override
    public int editTask(Task task) {
        String sql = "UPDATE Task SET NameTask = ?, DetailTask = ?, isDone = ?, DeadlineTask = ? WHERE TaskID = ? AND Username = ?";
        return jdbcTemplate.update(sql, task.getNameTask(), task.getDetailTask(), task.getIsDone(), task.getDeadlineTask(), task.getTaskID(), task.getUsername());
    }
    
    @Override
    public int updateTaskID(int index, String username){
        String sql = "UPDATE Task SET TaskID = TaskID - 1 WHERE TaskID > ? AND Username = ?;";
        return jdbcTemplate.update(sql, index, username);
    }

    @Override
    public int getMaxID(String username) {
        String sql = "SELECT MAX(TaskID) FROM Task WHERE Username = ?;";
        Integer id = jdbcTemplate.queryForObject(sql, Integer.class, username);
        if (id != null) {
            return id.intValue();
        } else {
            return 0;
        }
    }
}
