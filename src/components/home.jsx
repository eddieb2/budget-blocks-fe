import React, {useEffect} from "react";
import logo from "../media/image/Logo.svg";
import budgetImg from "../media/image/budget_blocks.png";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {PageView, GAevent} from "./google_analytics/index.js"

const Home = () => {
  useEffect(() =>{
    PageView()
  })

  let trackSignUp = () => {
    GAevent("Landing Page Buttons", "User clicked sign-up button", "New User Flow")
  }

  return (
    <div className="home">
      <Container maxWidth="sm">
        <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
          <img src={logo} className="App-logo" alt="logo" />
          <img src={budgetImg} className="budget_img" alt="budget_blocks" />

          <div className="buttons">
            <Link to="/register" className="links">
              <Button variant="outlined" className="signup" onClick={trackSignUp}>
                Sign Up
              </Button>
            </Link>
            <Link to="/login" className="links">
              <Button variant="outlined" className="signin">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
