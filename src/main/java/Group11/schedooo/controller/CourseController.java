package Group11.schedooo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import Group11.schedooo.model.Course;
import Group11.schedooo.repository.CourseRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CourseController {

    @Autowired
    CourseRepository courseRepository;

    @PostMapping("/addCourse")
    public ResponseEntity<String> addCourse(@RequestBody Course course) {
        //System.out.println(course.toString());
        System.out.println(courseRepository.isCollison(course));
        if(!courseRepository.isCourseAlreadyExist(course.getCourseID(), course.getUsername()) && !courseRepository.isCollison(course)){
            courseRepository.save(course);
            return ResponseEntity.status(HttpStatus.OK).body("Add Course Success");
        }
        else{
            System.out.println("ERROR");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Course is Already Exist");
        }
    }

    @PostMapping("/deleteCourse")
    public void deleteCourse(@RequestParam(value= "courseID") String courseID, @RequestParam(value="username") String username) {
        System.out.println(courseRepository.deleteCourse(courseID, username));
    }

    @GetMapping("/findCourseByUsername")
    public ResponseEntity<List<Course>> findCourseByUsername(@RequestParam(value= "username") String username) {
        List<Course> courseList = courseRepository.findCourseByUsername(username);
        /*for (Course course : courseList) {
            System.out.println(course.toString());
        }*/
        return ResponseEntity.status(HttpStatus.OK).body(courseList);
    }

    @GetMapping("/findCourseByUsernameAndCourseID")
    public ResponseEntity<Course> findCourseByUsername(@RequestParam(value= "username") String username, @RequestParam(value="courseID") String courseID) {
        System.out.println("/findCourseByUsernameAndCourseID = " + username+courseID);
        Course course = courseRepository.findCourseByCourseIDAndUsername(courseID, username);
        return ResponseEntity.status(HttpStatus.OK).body(course);
    }

    @PostMapping("/editCourse")
    public String editCourse(@RequestBody Course course) {
        //TODO: process POST request
        System.out.println("newCouseID = " + course.getNewCourseID());
        System.out.println("oldCouseID = " + course.getCourseID());
        courseRepository.editCourse(course);
        return null;
    }
    
    

}
