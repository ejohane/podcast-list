import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./context/auth";
import { CssBaseline } from "@material-ui/core";

function App() {
  const [authToken, setAuthToken] = useState<string>(sessionStorage.getItem("token"));

  const setToken = (token: string) => {
    sessionStorage.setItem("token", token)
    setAuthToken(token);
  };

  return (

    <AuthContext.Provider value={{ token: authToken, setToken: setToken }}>
      <CssBaseline />
      <Router>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
