import "../styles/genstyles.css";
import {React, useState} from 'react';
import { useNavigate } from "react-router";

async function SignupUser(credientials){
    return fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credientials),
        // redirect: 'follow',
      })
}

const Signup = () => {
    const [isInstructor, setisInstructor] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [description, setDescription] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        SignupUser({
          username,
          password,
          name,
          email,
          isInstructor,
          description
        }).then(res => {
            if (res.ok) {
                res.json().then(function(value) {
                    alert("Welcome to Learning Gate, " + username + "!");
                    // localStorage.setItem("username", formData[0].value);
                    window.location.href = "/";
                    return;
                });
            }else{
                alert("Username already exits");
                return;
            }
        }).then(res => {
            if (res.ok) {
                res.json().then(function(value) {
                    alert("Welcome to Learning Gate, " + username + "!");
                    // localStorage.setItem("username", formData[0].value);
                    window.location.href = "/";
                    return;
                });
            }
            if (!res.ok) {
                alert("Username already exits");
                return;
            }
        }) .catch(err => console.log(err))
      }

    const handleChange = () =>{
        setisInstructor(!isInstructor);
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="container">
                <h2>Sign Up</h2>
                <div>
                    <label htmlFor="uname">Username</label>
                    <input 
                        type="text" 
                        placeholder="Enter Username" 
                        name="uname" 
                        onChange={(e)=>{
                            setUsername(e.target.value)
                        }} 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="psw">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter Password" 
                        name="psw" 
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }} 
                        required/>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id = "name"
                        name = "name"
                        placeholder="Your name.." 
                        onChange={(e)=>{
                            setName(e.target.value)
                        }} 
                        required/>
                </div>
                <div>
                    <input type="checkbox" checked={isInstructor} onChange={handleChange} name="isInstructor"/> Sign up as instructor
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        placeholder="Your email.." 
                        name="email" 
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }} 
                        required/>
                </div>
                <div>
                    <label htmlFor="dscrp">Description</label>
                    <input 
                        type="text" 
                        placeholder="An description of you.."
                        name="description" 
                        onChange={(e)=>{
                            setDescription(e.target.value)
                        }} 
                        required/>
                </div>
                <a href="login">Already have an account?</a>
                <button type="submit" className="button">Sign up</button>
                <a href = "/" className="button">Cancel</a>
            </div>
        </form>
    );
}

export default Signup;