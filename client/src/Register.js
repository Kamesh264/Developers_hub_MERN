import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css'

function Register(){
    const [data,setData] = useState({
        fullname: '',
        email: '',
        mobile: '',
        skill: '',
        password: '',
        confirmpassword: ''

    })
    const changeHandler = e => {
            setData({...data,[e.target.name]:e.target.value})
        }
        // const submitHandler = e => {
        //     e.preventDefault();
            
        //     console.log(data)
        //   };

          const submitHandler = e => {
            e.preventDefault();
            
            
            const registrationURL = 'http://localhost:5000/register';
          
            axios.post(registrationURL, data)
              .then(response => {
                
                console.log(response.data);
              })
              .catch(error => {
                
                console.error(error);
              });
          };


      return (
        <div>
            <div id='reg-all'>
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
                <section className="reg-container">
                        <h1 className="reg-signup">Sign Up</h1>
                        <p className="reg-lead"><i id = "reg-user" className="fas fa-user"></i> Create Your Account</p>
                        <form className="form" onSubmit={submitHandler} autoComplete="off">
                            <div className="reg-form-group">
                                <input type="text" placeholder="Name" name="fullname" 
                                onChange={changeHandler}
                                required />
                            </div>
                            <div className="reg-form-group">
                                <input type="email" placeholder="Email Address" name="email"
                                onChange={changeHandler} />
                            </div>
                            <div className="reg-form-group">
                                <input type="password" placeholder="Mobile" name="mobile"
                                onChange={changeHandler} />
                            </div>
                            <div className="reg-form-group">
                                <input type="text" placeholder="Skill" name="skill"
                                onChange={changeHandler} />
                                
                                <small className="reg-form-text">
                                    Please provide skills by seperation of comma <b> (,) </b>
                                </small>
                            </div>
                            <div className="reg-form-group">
                                <input type="password" placeholder="Password" name="password"
                                onChange={changeHandler} />
                            </div>
                            <div className="reg-form-group">
                                <input type="password" placeholder="Confirm Password" name="confirmpassword"
                                onChange={changeHandler} />
                            </div>
                            <button type="submit" className="reg-button">Register</button>
                        </form>

                        <p className="reg-my-1">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                </section>
            </div>
        </div>
      )
    }

export default Register