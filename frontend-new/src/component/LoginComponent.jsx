import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // for confirm dialog

import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router";

import "react-confirm-alert/src/react-confirm-alert.css"; //css for confirm dialog

import AuthenticationService from "../service/AuthenticationService";

import errorHandler from "./error/ErrorComponent";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleUsername = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(username + "," + password);

    AuthenticationService.executeBasicAuthenticationService(username, password)
      .then((response) => {
        console.log("success");
        console.log(response);
        AuthenticationService.registerSuccessfulLogin(username, password);
        history.push("/courses");
      })
      .catch((error) => {
        errorHandler(error, history);
        //history.push("/handleError");
      });

    //redirect to login
    //<Redirect to="/login" />;
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsername}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />

        <button type="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;
