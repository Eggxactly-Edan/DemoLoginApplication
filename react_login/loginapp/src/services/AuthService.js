import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";

class AuthService {
  login(userName, userPassword) {
    return axios
      .post(API_URL + "signin", {
        userName,
        userPassword
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(userName, userEmail, userPassword) {
    return axios.post(API_URL + "signup", {
      userName,
      userEmail,
      userPassword
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
