package Group11.schedooo.repository;

import java.util.List;

import Group11.schedooo.model.Course;

public interface CourseRepository {

    public int save(Course course);

    public boolean isCourseAlreadyExist(String courseID, String username);

    public Course findCourseByCourseIDAndUsername(String courseID, String usename);

    public List<Course> findCourseByUsername(String username);

    public int deleteCourse(String courseID, String username);

    public int editCourse(Course course);

    public boolean isCollison(Course course);
}
