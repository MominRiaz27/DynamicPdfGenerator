import Google from "./img/google.png";
import Facebook from "./img/facebook.png";
import Github from "./img/github.png";
import "./App.css"
import { useEffect, useState } from "react";
import PDF from "./assets/pdf"
const App = () => {
  const [user, setUser] = useState(null);

  const google = () => {
    
    window.open("http://localhost:3000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:3000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:3000/auth/facebook", "_self");
  };

  const logout = () => {
    window.open("http://localhost:3000/auth/logout", "_self");
  };

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <>
    {!user && <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
          <div className="loginButton github" onClick={logout}>
            Logout
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button className="submit">Login</button>
        </div>
        
      </div>
    </div>}
    {user && <PDF/>}
    </>
  );
};

export default App;
