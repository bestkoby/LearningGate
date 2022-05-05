import "../styles/genstyles.css";
import {React, useState} from 'react';

async function loginUser(credientials){
    return fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credientials),
        // redirect: 'follow',
      })
}

const Login = () => {
    const [checked, setChecked] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e =>{
        e.preventDefault();
        loginUser({
            username,
            password
        }).then(res=>{
            if (res.ok) {
                res.json().then(function(value) {
                  // document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";  // clear cookie
                  // var info = "username="+encodeURIComponent(value.username)+"; isInstructor="+encodeURIComponent(value.isInstructor);
                  // coki += "; expires=Thu, 30 Mar 2022 00:00:00 GMT";
                  // console.log(coki);
                  // document.cookie = coki;
    
                  // document.cookie = "username="+String(value.username);
                  // document.cookie = "isInstructor="+String(value.isInstructor);
                  // console.log(document.cookie);
                  console.log(value)
                  sessionStorage.setItem('username', value.username);
                  sessionStorage.setItem('isInstructor', value.isInstructor);
                  alert("Welcome back, " + String(value.username) + "!");
                  window.location.href = "/";
                });
                return;
              }else{
                alert("Wrong username or password");
                return;
              }
           }
        ).catch(err => console.log(err))
    }

    const handleChange = () =>{
        setChecked(!checked);
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <div className="container">
                <h2>Login</h2>
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
                    <input type="checkbox" checked={checked} onChange={handleChange} name="remember"/> Remember me
                    <a href="#">Forget password?</a>
                </div>
                <a href="signup">Do not have an account?</a>
                <button type="submit" className="button">Login</button>
                <a href = "/" className = "button">Cancel</a>
            </div>
        </form>
    );
}

export default Login;