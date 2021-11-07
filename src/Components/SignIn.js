import React, { useState } from "react";
import axios from "axios";

import "../css/SignIn.css";

const SignIn = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const formSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: firstname + " " + lastname,
      email: email,
      password: pass,
    };

    axios.post("http://localhost:5000/auth/signin", data).then((res) => {
      localStorage.setItem("Token", res.data.token);
      window.location.href = "/";
    });
  };

  return (
    <div className="mainContainer">
      <form class="ui form">
        <div class="field">
          <label>Name</label>
          <div class="two fields">
            <div class="field">
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
            </div>
            <div class="field">
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
          </div>
        </div>
        <div class="field">
          <label>Email ID</label>
          <input
            type="text"
            value={email}
            placeholder="john@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="field">
          <label>Password</label>
          <input
            type="password"
            value={pass}
            placeholder="Enter Password"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        {/* <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" tabindex="0" class="hidden" />
            <label>I agree to the Terms and Conditions</label>
          </div>
        </div> */}
        <button class="ui button" type="submit" onClick={formSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignIn;
