import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/AdminHome";
import UserAppointments from "./components/user/UserAppointments";

function App() {
  const userLoggedIn = !!localStorage.getItem("userData");
  return (
    <div style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "125vh"
    }} className="App">
      <Router>
        <CookiesProvider>
        <div className="content" style={{flex: 1}}>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            {userLoggedIn ? (
              <>
                <Route path="/adminhome" element={<AdminHome />} />
                <Route path="/userhome" element={<UserHome />} />
                <Route path="/userhome/userappointments/:doctorId" element={<UserAppointments />} />
              </>
            ) : (
              <Route path="/login" element={<Login />} />
            )}
          </Routes>
          </div>
          <br />
        </CookiesProvider>
      </Router>
      <footer className="bg-light text-center" style={{position:"relative"}}>
            <div className="text-center p-3" style={
              {
                position: "static",
                // bottom: "0",
                width: "100%",
                // height:"1rem"
              }
          }>© 2024 Copyright: HealPlus<span>&#43;</span></div>
        </footer>
    </div>
  );
}

export default App;
