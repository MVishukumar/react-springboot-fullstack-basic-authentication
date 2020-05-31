import React from "react";

const errorHandler = (error, history) => {
  if (error.response.status > 500) {
    history.push("/serverError");
  } else if (error.request) {
    history.push("/clientError");
  } else {
    history.push("/error");
  }
};

export default errorHandler;
