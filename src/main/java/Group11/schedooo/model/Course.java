package Group11.schedooo.model;

public class Course {
    private String courseID, courseName, professorName, colorCourse, startTime, endTime, username;
    private String dayOfWeek, newCourseID;

    public Course(){

    }

    public Course(String courseID, String courseName, String professorName, String colorCourse, String startTime, String endTime, String dayOfWeek, String username){
        this.courseID = courseID;
        this.courseName = courseName;
        this.professorName = professorName;
        this.colorCourse = colorCourse;
        this.startTime = startTime;
        this.endTime = endTime;
        this.dayOfWeek = dayOfWeek;
        this.username = username;
    }

    public Course(String courseID, String courseName, String professorName, String colorCourse, String startTime, String endTime, String dayOfWeek, String username, String newCourseID){
        this.courseID = courseID;
        this.courseName = courseName;
        this.professorName = professorName;
        this.colorCourse = colorCourse;
        this.startTime = startTime;
        this.endTime = endTime;
        this.dayOfWeek = dayOfWeek;
        this.username = username;
        this.newCourseID = newCourseID;
    }

    public void setCourseID(String courseID){
        this.courseID = courseID;
    }

    public void setCourseName(String courseName){
        this.courseName = courseName;
    }

    public void setProfessorName(String professorName){
        this.professorName = professorName;
    }

    public void setColorCourse(String colorCourse){
        this.colorCourse = colorCourse;
    }

    public void setStartTime(String startTime){
        this.startTime = startTime;
    }

    public void setEndTime(String endTime){
        this.endTime = endTime;
    }

    public void setDayOfWeek(String dayOfWeek){
        this.dayOfWeek = dayOfWeek;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public void setNewCourseID(String newCourseID){
        this.newCourseID = newCourseID;
    }

    public String getCourseID(){
        return courseID;
    }

    public String getCourseName(){
        return courseName;
    }

    public String getProfessorName(){
        return professorName;
    }

    public String getColorCourse(){
        return colorCourse;
    }

    public String getStartTime(){
        return startTime;
    }

    public String getEndTime(){
        return endTime;
    }

    public String getDayOfWeek(){
        return dayOfWeek;
    }

    public String getUsername(){
        return username;
    }

    public String getNewCourseID(){
        return newCourseID;
    }

    public String toString() {
        return "Course{" +
                "courseID='" + courseID + '\'' +
                ", courseName='" + courseName + '\'' +
                ", professorName='" + professorName + '\'' +
                ", colorCourse='" + colorCourse + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", dayOfWeek=" + dayOfWeek +
                '}';
    }
}
