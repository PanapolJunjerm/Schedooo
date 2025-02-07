package Group11.schedooo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import Group11.schedooo.model.Task;
import Group11.schedooo.repository.TaskRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @PostMapping("/addTask")
    public ResponseEntity<String> addTask(@RequestBody Task task) {

        //System.out.println(task.getNameTask() + " : nt");
        taskRepository.save(task);
        return ResponseEntity.status(HttpStatus.OK).body(task.getNameTask());
    }

    @PostMapping("/deleteTask")
    public void deleteTask(@RequestParam(value= "taskID") int taskID, @RequestParam(value="username") String username) {
        if(taskRepository.deleteTask(taskID, username) == 1){
           taskRepository.updateTaskID(taskID, username);
        }
    }

    @GetMapping("/findTaskByUsername")
    public ResponseEntity<List<Task>> findTaskByUsername(@RequestParam(value= "username") String username) {
        List<Task> taskList = taskRepository.findTaskByUsername(username);
        /*for (Task task : taskList) {
            System.out.println(task.toString());
        }*/
        return ResponseEntity.status(HttpStatus.OK).body(taskList);
    }

    @GetMapping("/findAllTask")
    public List<Task> findAllTask() {
        List<Task> taskList = taskRepository.findAll();
        /*for (Task task : taskList) {
            System.out.println(task.toString());
        }*/
        return taskList;
    }

    @GetMapping("/findTaskByDate")
    public List<Task> findAllTask(@RequestParam(value="username") String username, @RequestParam(value="date") String date) {
        List<Task> taskList = taskRepository.findTaskByDate(username, date);
        for (Task task : taskList) {
            System.out.println(task.toString());
        }
        return taskList;
    }

    @GetMapping("/findTaskByMonth")
    public List<String> findTaskByMount(@RequestParam(value="month") int month){


        return null;
    }

    /*@GetMapping("/editTask")
    public ResponseEntity<String> editTask(@RequestBody Task task) {
        taskRepository.editTask(task);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }*/

    @PostMapping("/editTask")
    public ResponseEntity<String> editTask(@RequestBody Task task) {
        System.out.println(taskRepository.editTask(task));
        System.out.println(task.toString());
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @GetMapping("/findTaskByTaskIDAndUsername")
    public ResponseEntity<Task> findTaskByTaskIDAndUsername(@RequestParam(value="taskID")int taskID, @RequestParam(value="username")String username){
        Task task = taskRepository.findTaskByTaskIDAndUsername(username, taskID);
        return ResponseEntity.status(HttpStatus.OK).body(task);
    }

    @GetMapping("/listTest")
    public ResponseEntity<List<Task>> listTest(){

        List<Task> taskList = taskRepository.findTaskByUsername("a");
        for (Task task : taskList) {
            System.out.println(task.toString());
        }
        return ResponseEntity.status(HttpStatus.OK).body(taskList);

        /*List<Task> responseList = new ArrayList<>();
        responseList.add(newTask);
        responseList.add("Item 2");
        responseList.add("Item 3");
        return ResponseEntity.status(HttpStatus.OK).body(responseList);*/
    }
    
}
