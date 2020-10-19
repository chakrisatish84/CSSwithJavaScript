import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../App.css";
import { Dashboard } from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import { PrivateRoute } from "./PrivateRoute";
import Signup from "./Signup";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <switch>
            <PrivateRoute path="/" exact component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/updateProfile" component={UpdateProfile} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </switch>
        </Router>
      </div>
    </Container>
  );
}

export default App;
