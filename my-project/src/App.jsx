import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import axios from"axios"
import AuthRedirect from "./components/AuthRedirect";
import { useContext, useEffect } from "react";
import { UserContext } from "./Contexts/User.context";
import Home from "./components/Home";
function App() {

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/google" element={<AuthRedirect />} />
        <Route
          path="*"
          element={
            <div>
              Err 404 not found
              <Link to="/">Go back ro homepage</Link>
            </div>
          }
        />
      </Routes>

    </div>
  );
}

export default App;
