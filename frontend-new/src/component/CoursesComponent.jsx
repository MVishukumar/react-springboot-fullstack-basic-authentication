import React from "react";
import { useHistory } from "react-router";

import ListCourses from "./ListCourses";
import AuthenticationService from "../service/AuthenticationService";
import LoginComponent from "./LoginComponent";

function CoursesComponent() {
  return (
    <div>
      <ListCourses />
    </div>
  );
}

export default CoursesComponent;
