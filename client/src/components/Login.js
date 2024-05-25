//import backgroundImage from "../background.jpg";
import backgroundVideo from "../clip.mp4";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

//    TODO: use .env for the URL's

import "./css/Login.css";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SOCKET_SERVER}/auth/profile`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          navigate("/home");
        }
      } catch (error) {
        if (error.response) {
        } else {
          console.error("Failed to check authentication:", error);
        }
      }
    };

    checkAuthentication();
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_SOCKET_SERVER}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.REACT_APP_SOCKET_SERVER}/auth/facebook`;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* <img
        src={backgroundImage}
        alt="Background"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          zIndex: -1,
        }}
      /> */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          zIndex: -1,
          transform: "translate(-50%, -50%)",
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <img
        src="/famcupid.png"
        alt="Famcupid"
        className="animated-image"
        style={{ marginBottom: "20px" }}
      />
      <div className="button-container">
        <button className="google-btn" onClick={handleGoogleLogin}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path
              fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Sign in with Google
        </button>

        <span className="or-text">OR</span>

        <button className="facebook-btn" onClick={handleFacebookLogin}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path
              fill="#039be5"
              d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
            ></path>
            <path
              fill="#fff"
              d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
            ></path>
          </svg>
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
}

export default Login;
