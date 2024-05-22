import React from 'react';
import {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import './style.css'

const Login=()=>{
    const [auth,setAuth] = useState(false);
    const [data,setData] = useState({
            email: '',
            password: '',
        })
    const changeHandler = e => {
            setData({...data,[e.target.name]:e.target.value})
        }
    const submitHamdler = e => {
            e.preventDefault();
            axios.post('http://localhost:5000/login',data).then(
                // res => console.log(res.data)
                res => {localStorage.setItem('token',res.data.token);
                setAuth(true)}
            )
        }
    if(auth){
        return <Navigate to="/dashboard" />
    }
    return (
        <div id='log-all'>
            <section id="header">
              <h1>
                  <Link to='/'><i className="fas fa-code"></i> Developers Hub</Link>
              </h1>
              <div>
                <ul id="navbar">
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
              </div>
            </section>
            <section id="sin">
                <div className="signin">
                    <div className="signinchild">
                        Sign In
                    </div>
                </div>
            </section>
            <section className="log-container">
                <p className="lead"><i className="fa fa-user"></i> Sign into Your Account</p>
                <form className="form" onSubmit={submitHamdler} autoComplete="off">
                    <div className="form-group">
                        <div className='log-auth'>Email id</div>
                        <input type="email"  
                        name="email" 
                        onChange={changeHandler}
                        required/>
                    </div>
                    <div className="form-group">
                        <div className='log-auth'>Password</div>
                        <input type="password" 
                        name="password" 
                        onChange={changeHandler}
                        />
                    </div>
                    <input type="submit" className="log-login" value="Login" />
                </form>
                <p className="log-my-1">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
        </div>
      )
    }
  

export default Login