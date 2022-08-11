import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Campaign from "./Components/Campaign/Campaign";
import {ContextProvider} from "./Components/Context";
import Navbar from "./Components/NavBar/Navbar";
import User from "./Components/User/User";
import UsersComponent from "./Components/UsersList/UsersComponent";
import Password from "./Components/Password/Password";

function App() {
  return (
    <>
      <ContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/users" element={<UsersComponent />} />
            <Route path="/campaign" element={<Campaign />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/" />
          </Routes>
          <Password />
        </Router>
      </ContextProvider>
    </>
  );
}

export default App;
