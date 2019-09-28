import React from "react";
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import Layout from "./Layout";

// pages
import Error from "../pages/Error";
import Login from "../pages/Auth/Login";

// context
import { useUserState } from "../context/UserContext";

// Add configuration settings for react-toastify
toast.configure({
	autoClose: 8000,
	draggable: false,
	position: toast.POSITION.BOTTOM_RIGHT
});

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <BrowserRouter>
      <Switch>
      
        <Route exact path="/" render={() => <Redirect to="/hospital/bins" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/hospital/bins" />}
        />
        
        <PrivateRoute path="/hospital" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
