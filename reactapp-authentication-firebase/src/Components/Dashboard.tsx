import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Alert from "react-bootstrap/Alert";

export const Dashboard: React.FC = () => {
  const { logout, currentUser } = useAuth();
  const history = useHistory();
  const [error, setError] = useState<string>("");

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    // e.preventDefault();
    try {
      setError("");
      await logout();
      history.push("/login");
    } catch (error) {
      setError("Failed to log out");
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser?.email}
          <Link to="/UpdateProfile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};
