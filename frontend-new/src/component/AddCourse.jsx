import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

import CourseDataService from "../service/CourseDataService";
import { useHistory } from "react-router";

const AddCourse = () => {
  let history = useHistory();

  let tempCourse = {
    id: "",
    description: "",
  };

  let { description, id } = tempCourse;

  const validate = (values) => {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a Description";
    } else if (values.description.length < 5) {
      errors.description = "Enter atleast 5 Characters in Description";
    }

    return errors;
  };

  const onSubmit = (values) => {
    console.log("Form values=" + values);

    tempCourse.id = -1;
    tempCourse.description = values.description;

    console.log(
      `(id:description) = (${tempCourse.id} : ${tempCourse.description})`
    );

    CourseDataService.createCourse("", tempCourse).then(() =>
      history.push(`/courses`)
    );
  };

  return (
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
                  <label hidden>ID </label>
                  <Field
                    className="form-control"
                    type="text"
                    name="id"
                    hidden
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
  );
};

export default AddCourse;
