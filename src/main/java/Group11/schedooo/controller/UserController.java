package Group11.schedooo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Group11.schedooo.model.User;
import Group11.schedooo.repository.UserRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    /*@PostMapping("/register")
    public String register(@RequestParam(value = "username") String username,
                           @RequestParam(value = "password") String password){
        User u = new User(username, password);
        //System.out.println(u.getUsername() + u.getPassword());
        //userRepository.save(u);
        if(userRepository.isUsernameAlreadyUsed(username)){
            System.out.println("Username is Already Used");
        }
        return "hello";
    }*/

    /*@PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam(value = "username") String username,
                                           @RequestParam(value = "password") String password){
        User u = new User(username, password);
        //System.out.println(u.getUsername() + u.getPassword());
        //userRepository.save(u);
        String res;
        if(userRepository.isUsernameAlreadyUsed(username)){
            res="Username is Already Used";
        }
        else{
            res="PASS";
        }
        System.out.println(res);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }*/

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user){
        //User u = new User(username, password);
        //System.out.println(u.getUsername() + u.getPassword());
        //userRepository.save(u);
        //System.out.println(user.getUsername());
        String username = user.getUsername();
        String respone;
        if(!userRepository.isUsernameAlreadyUsed(username)){

            userRepository.save(user);
            respone="register success";
            System.out.println(respone + " : " + username);
            return ResponseEntity.status(HttpStatus.OK).body(respone);
            /* 
            if(userRepository.save(user) == 1) {
                respone="register success";
                System.out.println(respone + " : " + username);
                return ResponseEntity.status(HttpStatus.OK).body(respone);
            }
            else {
                respone="register error";
                System.out.println(respone + " : " + username);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(respone);
            }*/
            
        }
        else{
            respone="Username ถูกใช้ไปแล้ว";
            System.out.println(respone);
            System.out.println(respone + " : " + username);
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(respone);
        }
        
    }

    /*@PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        //TODO: process POST request
        User u = userRepository.login(user.getUsername(), user.getPassword());
        //userRepository.login(user.getUsername(), uesr.getPassword());
        //userRepository.finda();
        if(u != null){
            System.out.println(u.getUsername() + u.getPassword());
            return ResponseEntity.status(HttpStatus.OK).body(u);
        }
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body();
    }*/
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {

        String u = userRepository.login(user);
        //userRepository.login(user.getUsername(), uesr.getPassword());
        //userRepository.finda();
        if(u != null){
            System.out.println("login : " + u);
            return ResponseEntity.status(HttpStatus.OK).body("login!");
        }
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username หรือ Password ไม่ถูกต้อง");
    }
    



    /*@DeleteMapping("/deleteAll")
    public ResponseEntity<String> deleteAllTutorials() {
        try {
            int numRows = tu.deleteAll();
            return new ResponseEntity<>("Deleted " + numRows + " AddDrop(s) successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Cannot delete AddDrop.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/

}
