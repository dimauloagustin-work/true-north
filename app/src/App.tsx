import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./views/login";
import { UserContext } from "./UserContext";
import { useState } from "react";
import Calculator from "./views/calculator";
//TODO - borrar token
function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <UserContext.Provider
      value={{
        isLogged,
        login: () => setIsLogged(true),
        logout: () => setIsLogged(false),
      }}
    >
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>
                Challenge
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  {!isLogged ? (
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>
                        Login
                      </Link>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        onClick={() => setIsLogged(false)}
                      >
                        Logout
                      </button>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link className="nav-link" to={"/calculator"}>
                      Calculator
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/calculator" element={<Calculator />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </UserContext.Provider>
  );
}
export default App;
