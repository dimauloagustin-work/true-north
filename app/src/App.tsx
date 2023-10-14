import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./views/login";
import { UserContext } from "./UserContext";
import { useState } from "react";
import Calculator from "./views/calculator";
import History from "./views/history";
import { OpenAPI } from "./client/api";

OpenAPI.BASE = process.env["REACT_APP_URL"]!;

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
              {isLogged && (
                <div
                  className="collapse navbar-collapse"
                  id="navbarTogglerDemo02"
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        onClick={() => setIsLogged(false)}
                      >
                        Logout
                      </button>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/calculator"}>
                        Calculator
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/history"}>
                        History
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
          {isLogged ? (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/history" element={<History />} />
            </Routes>
          ) : (
            <Login />
          )}
        </div>
      </Router>
    </UserContext.Provider>
  );
}
export default App;
