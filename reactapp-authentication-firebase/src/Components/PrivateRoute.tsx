import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}: any) => {
  const { currentUser } = useAuth();
  const routeComponent = (props: any) =>
    currentUser ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  return <Route {...rest} render={routeComponent}></Route>;
};
