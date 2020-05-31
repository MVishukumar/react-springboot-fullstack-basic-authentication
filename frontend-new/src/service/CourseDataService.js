import axios from "axios";

//localhost:8080
const COURSE_URL = "/api/instructors/authorx/courses";
const INSTRUCTOR = "in28minutes";
const PASSWORD = "dummypass";

class CourseDataService {
  retrieveAllCourses() {
    console.log("executed service");
    return axios.get(
      `${COURSE_URL}`
      //{ headers: { authorization: 'Basic ' + window.btoa(INSTRUCTOR + ":" + PASSWORD) } }
    );
  }

  //@DeleteMapping("/api/instructors/{username}/courses/{id}")
  deleteCourse(id) {
    console.log("deleteCourse method in CourseDataService, id=" + id);
    return axios.delete(`${COURSE_URL}/${id}`);
  }

  //@GetMapping("/api/instructors/{username}/courses/count")
  getCourseCount() {
    return axios.get(
      `${COURSE_URL}/count`
      //{ headers: { authorization: 'Basic ' + window.btoa(INSTRUCTOR + ":" + PASSWORD) } }
    );
  }

  //@PutMapping("/api/instructors/{username}/courses/{id}")
  updateCourse(name, id, course) {
    console.log("updateCourse method in CourseDataService");
    return axios.put(`${COURSE_URL}/${id}`, course);
  }

  //@GetMapping("/api/instructors/{username}/courses/{id}")
  retrieveCourse(name, id) {
    console.log("retrieveCourse method in CourseDataService");
    //console.log(`${INSTRUCTOR_API_URL}/courses/${id}`);
    return axios.get(`${COURSE_URL}/${id}`);
  }

  //@PostMapping("/api/instructors/{username}/courses")
  createCourse(name, course) {
    console.log("createCourse method in CourseDataService");
    return axios.post(`${COURSE_URL}`, course);
  }
}

export default new CourseDataService();
