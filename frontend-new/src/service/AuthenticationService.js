import axios from "axios";

const LOGIN_URL = "/api/basicauth";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "legendary_app_user";

class AuthenticationService {
  executeBasicAuthenticationService(un, pw) {
    console.log(`> executeBasicAuthenticationService, un=${un}, pw=${pw}`);
    return axios.get(`${LOGIN_URL}`, {
      headers: { authorization: this.createBasicAuthToken(un, pw) },
    });
  }

  createBasicAuthToken(un, pw) {
    console.log(`> createBasicAuthToken`);
    var result = "Basic " + window.btoa(un + ":" + pw);
    console.log(result);
    return "Basic " + window.btoa(un + ":" + pw);
  }

  registerSuccessfulLogin(un, pw) {
    console.log(
      `> registerSuccessfulLogin, session attribute name = ${USER_NAME_SESSION_ATTRIBUTE_NAME}`
    );
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, un);
    this.setupAxiosInterceptors(this.createBasicAuthToken(un, pw));
  }

  setupAxiosInterceptors(token) {
    console.log("> setupAxiosInterceptors");
    axios.interceptors.request.use((config) => {
      console.log(`>> config ${config}`);
      if (this.isUserLoggedIn) {
        config.headers.authorization = token;
      }
      return config;
    });
  }

  isUserLoggedIn() {
    console.log(`> isUserLoggedIn`);
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    console.log(">> isUserLoggedIn, user = " + user);
    if (user === null) {
      console.log(`>> returning false`);
      return false;
    }
    console.log(`>> returning true`);
    return true;
  }

  logout() {
    console.log(`> logout`);
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  getLoggedInUser() {
    sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }
}

export default new AuthenticationService();
