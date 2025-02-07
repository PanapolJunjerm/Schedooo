package Group11.schedooo.model;

public class Task {

    private String nameTask, detailTask, deadlineTask, username;
    private int taskID;
    private boolean isDone;

    public Task(){

    }

    public Task(String nameTask, String detailTask, boolean isDone, String deadlineTask, String username){
        this.nameTask = nameTask;
        this.detailTask = detailTask;
        this.isDone = isDone;
        this.deadlineTask = deadlineTask;
        this.username = username;
    }

    public Task(int taskID, String nameTask, String detailTask, boolean isDone, String deadlineTask, String username){
        this.taskID = taskID;
        this.nameTask = nameTask;
        this.detailTask = detailTask;
        this.isDone = isDone;
        this.deadlineTask = deadlineTask;
        this.username = username;
    }

    public void setTaskID(int taskID){
        this.taskID = taskID;
    }

    public void setNameTask(String nameTask){
        this.nameTask = nameTask;
    }

    public void setDetailTask(String detailTask){
        this.detailTask = detailTask;
    }

    public void setIsDone(boolean isDone){
        this.isDone = isDone;
    }

    public void setDeadlineTask(String deadlineTask){
        this.deadlineTask = deadlineTask;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public int getTaskID(){
        return taskID;
    }

    public String getNameTask(){
        return nameTask;
    }

    public String getDetailTask(){
        return detailTask;
    }

    public boolean getIsDone(){
        return isDone;
    }

    public String getDeadlineTask(){
        return deadlineTask;
    }

    public String getUsername(){
        return username;
    }

    public String toString() {
        return "Task{" +
                "nameTask='" + nameTask + '\'' +
                ", detailTask='" + detailTask + '\'' +
                ", deadlineTask='" + deadlineTask + '\'' +
                ", username='" + username + '\'' +
                ", taskID=" + taskID +
                ", isDone=" + isDone +
                '}';
    }


}
