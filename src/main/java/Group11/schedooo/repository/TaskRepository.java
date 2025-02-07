package Group11.schedooo.repository;

import java.util.List;

import Group11.schedooo.model.Task;

public interface TaskRepository {

    public int save(Task task);

    public Task findTaskByTaskIDAndUsername(String username, int taskID);

    public List<Task> findTaskByUsername(String username);

    public List<Task> findTaskByDate(String username, String date);

    public List<Task> findAll();
    
    public int deleteTask(int taskID, String username);

    public int editTask(Task task);

    public int updateTaskID(int taskID, String username);

    public int getMaxID(String username);

}
