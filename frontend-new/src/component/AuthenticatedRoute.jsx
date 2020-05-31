import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";

class AuthenticatedRoute extends Component {
  render() {
    if (AuthenticationService.isUserLoggedIn()) {
      console.log("Authenticated route... Routing to property sent in path");
      console.log(this.props);
      return <Route {...this.props} />;
    } else {
      console.log("Unauthenticated route... Redirecting to login");
      return <Redirect to="/login" />;
    }
  }
}

export default AuthenticatedRoute;
