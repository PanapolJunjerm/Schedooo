package Group11.schedooo.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import Group11.schedooo.mapper.CourseMapper;
import Group11.schedooo.model.Course;

@Repository
public class JdbcCourseRepository implements CourseRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int save(Course course) {
        String sql = "INSERT INTO Course(CourseID, Username, ColorCourse, CourseName, ProfessorName, DayOfWeek, StartTime, EndTime) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";

        return jdbcTemplate.update(sql, new Object[]{course.getCourseID(), course.getUsername(), course.getColorCourse(), course.getCourseName(), course.getProfessorName(), course.getDayOfWeek(), course.getStartTime(), course.getEndTime()});
    }

    @Override
    public Course findCourseByCourseIDAndUsername(String courseID, String username) {
        String sql = "SELECT CourseID, Username, ColorCourse, CourseName, ProfessorName, DayOfWeek, StartTime, EndTime FROM Course WHERE Username = ? AND CourseID = ?";
        return jdbcTemplate.queryForObject(sql, new CourseMapper(), username, courseID);
    }

    @Override
    public List<Course> findCourseByUsername(String username) {
        String sql = "SELECT CourseID, Username, ColorCourse, CourseName, ProfessorName, DayOfWeek, StartTime, EndTime FROM Course WHERE Username = ?";
        return jdbcTemplate.query(sql, new CourseMapper(), username);
    }

    @Override
    public int deleteCourse(String courseID, String username) {
        
        String sql = "DELETE FROM Course WHERE CourseID = ? AND Username = ?;";
        return jdbcTemplate.update(sql, courseID, username);
    }

    @Override
    public int editCourse(Course course) {
        String sql = "UPDATE Course SET CourseID = ?, CourseName = ?, ColorCourse = ?, ProfessorName = ?, DayOfWeek = ?, StartTime = ?, EndTime = ? WHERE CourseID = ? AND Username = ?;";
        return jdbcTemplate.update(sql, course.getNewCourseID(), course.getCourseName(), course.getColorCourse(), course.getProfessorName(), course.getDayOfWeek(), course.getStartTime(), course.getEndTime(), course.getCourseID(), course.getUsername());
    }

    @Override
    public boolean isCourseAlreadyExist(String courseID, String username) {
        String sql = "SELECT * FROM Course WHERE CourseID = ? AND Username = ? ;";
        //System.out.println(username);
        try {
            
            jdbcTemplate.queryForObject(sql, new CourseMapper(),courseID , username);
            return true;
        }catch(IncorrectResultSizeDataAccessException e){ //- if the query does not return exactly one row
            return false;
        }
    }

    @Override
    public boolean isCollison(Course course) {
        String sql = "SELECT CourseID, Username, ColorCourse, CourseName, ProfessorName, DayOfWeek, StartTime, EndTime FROM Course WHERE Username = ? AND DayOfWeek = ? AND StartTime < ? AND EndTime > ?";
        //Course c = jdbcTemplate.queryForObject(sql, new CourseMapper(), course.getUsername(), course.getDayOfWeek(), course.getEndTime(), course.getStartTime());
        //if(c != null) return true;
        //else return false;
        try {
            
            jdbcTemplate.queryForObject(sql, new CourseMapper(), course.getUsername(), course.getDayOfWeek(), course.getEndTime(), course.getStartTime());
            return true;
        }catch(IncorrectResultSizeDataAccessException e){ //- if the query does not return exactly one row
            return false;
        }
    }
}
