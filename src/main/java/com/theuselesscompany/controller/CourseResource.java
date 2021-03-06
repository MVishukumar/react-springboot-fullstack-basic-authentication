package com.theuselesscompany.controller;

import com.theuselesscompany.model.Course;
import com.theuselesscompany.service.CoursesHardcodedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class CourseResource {

	@Autowired
	private CoursesHardcodedService courseManagementService;

	@GetMapping("/api/instructors/{username}/courses")
	public List<Course> getAllCourses(@PathVariable String username) {
		return courseManagementService.findAll();
	}

	@GetMapping("/api/instructors/{username}/courses/count")
	public Long getAllCoursesCount(@PathVariable String username) {
		return Long.valueOf(courseManagementService.findAll().size());
	}

	@GetMapping("/api/instructors/{username}/courses/{id}")
	public Course getCourse(@PathVariable String username, @PathVariable long id) {
		return courseManagementService.findById(id);
	}

	@DeleteMapping("/api/instructors/{username}/courses/{id}")
	public ResponseEntity<Void> deleteCourse(@PathVariable String username, @PathVariable long id) {

		Course course = courseManagementService.deleteById(id);

		if (course != null) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}

	@PutMapping("/api/instructors/{username}/courses/{id}")
	public ResponseEntity<Course> updateCourse(@PathVariable String username, @PathVariable long id,
											   @RequestBody Course course) {

		Course courseUpdated = courseManagementService.save(course);

		return new ResponseEntity<Course>(course, HttpStatus.OK);
	}

	@PostMapping("/api/instructors/{username}/courses")
	public ResponseEntity<Void> createCourse(@PathVariable String username, @RequestBody Course course) {

		Course createdCourse = courseManagementService.save(course);

		// Location
		// Get current resource url
		/// {id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdCourse.getId())
				.toUri();

		return ResponseEntity.created(uri).build();
	}
}