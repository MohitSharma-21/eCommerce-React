import React, { useState } from 'react';
import axios from "axios";
const LogIn = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const onFormSubmit = (event) => {
        event.preventDefault();
        
        const data = {
            email: email,
            password: pass,
          };
          console.log(data);
      
          axios
            .post("http://localhost:5000/auth/login", data)
            .then((res) => console.log("gfhgfhf"));
    }

    return (
        <div className="mainContainer">
            <form class="ui form">
                <div class="field">
                    <label>Email ID</label>
                    <input type="text" value={email} placeholder="john@gmail.com" onChange={e => setEmail(e.target.value)} />
                </div>
                <div class="field">
                    <label>Password</label>
                    <input type="password" value={pass} placeholder="Enter Password" onChange={e => setPass(e.target.value)} />
                </div>
                <button class="ui button" type="submit" onClick={onFormSubmit}>Log In</button>
            </form>
        </div>
    );
}

export default LogIn;