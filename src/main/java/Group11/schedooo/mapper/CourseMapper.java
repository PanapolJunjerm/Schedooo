package Group11.schedooo.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import Group11.schedooo.model.Course;

public class CourseMapper implements RowMapper<Course>{

    @Override
    public Course mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        Course c = new Course();
        c.setCourseID(resultSet.getString("CourseID"));
        c.setCourseName(resultSet.getString("CourseName"));
        c.setProfessorName(resultSet.getString("ProfessorName"));
        c.setDayOfWeek(resultSet.getString("DayOfWeek"));
        c.setStartTime(resultSet.getString("StartTime"));
        c.setEndTime(resultSet.getString("EndTime"));
        c.setColorCourse(resultSet.getString("ColorCourse"));
        c.setUsername(resultSet.getString("Username"));

        return c;
    }
}
