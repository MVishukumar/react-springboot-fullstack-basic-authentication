import React, { useState, useEffect } from "react";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import CourseDataService from "../service/CourseDataService";
import ErrorComponent from "./error/ErrorComponent";
import { useField } from "formik";
import { useHistory } from "react-router";

const updateAlert = () => {
  confirmAlert({
    title: "Confirm!",
    message: "Are you sure you want to update this?",
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          alert("Click Yes");
          //props.history.push(`/courses/${id}`);
        },
      },
      {
        label: "No",
        onClick: () => alert("Click No"),
      },
    ],
  });
};

function ListCourses() {
  const [course, setCourse] = useState([]);
  const [page, setPage] = useState(1);
  let history = useHistory();

  useEffect(() => {
    const fetchCourses = () => {
      CourseDataService.retrieveAllCourses()
        .then(({ data: course }) => {
          setCourse(course);
        })
        .catch((error) => {
          ErrorComponent(error);
        });
    };
    fetchCourses();
  }, [page]);

  console.log(course);

  const deleteCourseClicked = (courseId) => {
    console.log(`Delete course: ${courseId}`);
    deleteAlert(courseId);
    //CourseDataService.deleteCourse(courseId);
    //setPage(page + 1);
  };

  const updateCourseClicked = (courseId) => {
    console.log(`Update course: ${courseId}`);
    //updateAlert();
    history.push(`/courses/${courseId}`);
  };

  const deleteAlert = (courseId) => {
    console.log("Course id in deleteAlert: " + courseId);
    confirmAlert({
      title: "Confirm!",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            CourseDataService.deleteCourse(courseId);
            setPage(page + 1);
          },
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const addCourseHandler = () => {
    console.log("Add course clicked");
    history.push(`/courses/add/new`);
  };

  return (
    <div>
      <button onClick={addCourseHandler}>Add Course</button>
      <h3>All Courses</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <td>Delete</td>
              <td>Update</td>
            </tr>
          </thead>
          <tbody>
            {course.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.description}</td>
                <td>
                  <button onClick={() => deleteCourseClicked(course.id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button onClick={() => updateCourseClicked(course.id)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListCourses;
