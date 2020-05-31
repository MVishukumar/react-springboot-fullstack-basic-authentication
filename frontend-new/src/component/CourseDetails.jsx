import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import CourseDataService from "../service/CourseDataService";
import errorHandler from "./error/ErrorComponent";
import { useHistory } from "react-router";

const CourseDetails = (props) => {
  let history = useHistory();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchCourse = () => {
      CourseDataService.retrieveCourse("", props.match.params.id)
        .then(({ data: course }) => {
          setCourse(course);
        })
        .catch((error) => {
          console.log("Errrrrrror" + error);
          errorHandler(error, history);
        });
    };
    fetchCourse();
  }, []);

  const onSubmit = (values) => {
    console.log("on submit");
    let tempCourse = {
      id: values.id,
      description: values.description,
    };

    CourseDataService.updateCourse("", tempCourse.id, tempCourse).then(() =>
      history.push(`/courses`)
    );
  };

  const validate = (values) => {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a Description";
    } else if (values.description.length < 5) {
      errors.description = "Enter atleast 5 Characters in Description";
    }

    return errors;
  };

  let { id = "", description = "" } = course;

  return (
    <div>
      <p>Course Details Page</p>
      <>
        <div>
          <h3>Course</h3>
          <div className="container">
            <Formik
              initialValues={{ id, description }}
              onSubmit={onSubmit}
              validateOnChange={false}
              validateOnBlur={false}
              validate={validate}
              enableReinitialize={true}
            >
              {(props) => (
                <Form>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="alert alert-warning"
                  />
                  <fieldset className="form-group">
                    <label>ID </label>
                    <Field
                      className="form-control"
                      type="text"
                      name="id"
                      disabled
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Description </label>
                    <Field
                      className="form-control"
                      type="text"
                      name="description"
                    />
                  </fieldset>
                  <button className="btn btn-success" type="submit">
                    Save
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </>
    </div>
  );
};

export default CourseDetails;
