import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";


const accessTokenKey = 'access_token'

/**
 * The login page
 */
const Login = () => {

  const location = useLocation();

  const history = useHistory();

  const { token, setToken } = useAuth()

  /**
   * Redirect the user to the home page if they have a valid token   
   */
  useEffect(() => {

    if (token) {
      history.replace('/')
    } else if (location.hash.startsWith(`#${accessTokenKey}=`)) {
      const authToken = location.hash.split("&")
        .find((param) => param.includes(accessTokenKey))
        .split(`${accessTokenKey}=`)[1]

      setToken(authToken)
      history.replace('/')
    }
  });

  /**
   * Login to spotify
   */
  const onLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;

    const redirectUri = process.env.REACT_APP_LOGIN_REDIRECT_URL;

    window.location.href = encodeURI(
      `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`
    )

  };

  return (
    <div style={{
      textAlign: "center",
      padding: "5%"
    }}>
      <Button variant="contained" onClick={onLogin}>Login to Spotify</Button>
    </div>
  );
};

export default Login;
