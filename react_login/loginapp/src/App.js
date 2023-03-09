import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Profile from './components/Profile';
import UserPage from './components/UserPage';
import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from './services/AuthService';
import EventBus from './common/EventBus';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import BoardModerator from './components/ModPage';
import ManagerPage from './components/ManagerPage';
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showManagerBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showManagerBoard: user.userRoles.includes("ROLE_MANAGER"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showManagerBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showManagerBoard} = this.state;

    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                {/* <MenuIcon /> */}
              </IconButton>


              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to={"/"} className="navbar-brand">
                  Login Application
                </Link>
              </Typography>
              <Button color="inherit" >
                <Link to={"/home"} className="nav-link">
                  Home
                </Link></Button>

              {currentUser ? (

                <><Button color="inherit" >
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.userName}
                  </Link></Button>

                  <Button color="inherit" >
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </Button>

                </>

              ) : (

                <><Button color="inherit">
                  <Link to={"/Login"} className="nav-link">
                    Login
                  </Link>
                </Button>
                  <Button color="inherit">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </Button>
                </>

              )}

              {currentUser && (
                <Button color="inherit">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </Button>
              )}

              {showManagerBoard && (
                <Button color="inherit">
                  <Link to={"/manager"} className="nav-link">
                    Manager
                  </Link>
                </Button>
              )}


            </Toolbar>
          </AppBar>
        </Box>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/manager" element={<ManagerPage />} />
          </Routes>
        </div>

      </div>
    );
  }
}

export default App;
