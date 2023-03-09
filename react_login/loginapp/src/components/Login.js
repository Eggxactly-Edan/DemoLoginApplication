import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { withRouter } from '../common/WithRouter';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);

    this.state = {
      userName: "",
      userPassword: "",
      loading: false,
      message: ""
    };
  }

  onChangeUserName(e) {
    this.setState({
      userName: e.target.value
    });
  }

  onChangeUserPassword(e) {
    this.setState({
      userPassword: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.userName, this.state.userPassword).then(
        () => {
          this.props.router.navigate("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      ).then((res) => {console.log(res.data.message)}) 
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <Input
                type="text"
                className="form-control"
                name="userName"
                value={this.state.userName}
                onChange={this.onChangeUserName}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="userPassword">Password</label>
              <Input
                type="password"
                className="form-control"
                name="userPassword"
                value={this.state.userPassword}
                onChange={this.onChangeUserPassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);