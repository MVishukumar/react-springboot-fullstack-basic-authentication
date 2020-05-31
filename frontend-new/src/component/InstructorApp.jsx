import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginComponent from "./LoginComponent";
import CoursesComponent from "./CoursesComponent";
import AuthenticatedRoute from "./AuthenticatedRoute";
import CourseDetails from "./CourseDetails";
import AddCourse from "./AddCourse";
import ClientError from "./error/component/ClientError";
import ServerError from "./error/component/ServerError";
import OtherError from "./error/component/OtherError";

const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

const ErrorPage = () => {
  return <h3>Something went wrong... Try again</h3>;
};

function InstructorApp() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/login" exact component={LoginComponent} />
          <AuthenticatedRoute
            path="/courses"
            exact
            component={CoursesComponent}
          />
          <AuthenticatedRoute
            path="/courses/:id"
            exact
            component={CourseDetails}
          />
          <AuthenticatedRoute
            path="/courses/add/new"
            exact
            component={AddCourse}
          />
          <Route path="/serverError" exact component={ServerError} />
          <Route path="/clientError" exact component={ClientError} />
          <Route path="/error" exact component={OtherError} />
        </Switch>
      </Router>
    </div>
  );
}

export default InstructorApp;
