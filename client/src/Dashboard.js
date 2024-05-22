import React, { useEffect, useState } from 'react';
import {Link,Navigate,useParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const Dashboard = () => {
    const [data,setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/allprofiles', {
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setData(res.data))
    },[])
    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }
    return(
            <div>
                <section id='header'>
                    <h1>
                        <Link to='/'><i className="fa fa-code"></i> Developers Hub</Link>
                    </h1>
                    <div>
                        <ul id="navbar">
                            <li><Link to="/myprofile">My Profile</Link></li>
                            <li><Link to="/login" onClick={() => localStorage.removeItem('token')}>Logout</Link></li>
                        </ul>
                    </div>
                </section>
                <section className="dash-container">
                    <h1 className="dash-text-primary">Developers</h1>
                    <p className="dash-lead">
                    <i className="fab fa-connectdevelop"></i> Browse and connect with developers </p>
                    <div className="dash-profiles">
                        {data.length >= 1 ? 
                        data.map(profile =>
                            <div className="solo-profile">
                                <img
                                className="round-img"
                                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y6s=200"
                                alt=""/>
                                <div>
                                    <h2 className='fullname'>{profile.fullname}</h2>
                                    <p>{profile.email}</p>
                                    <p>India</p>
                                    <Link to={`/indprofile/${profile.fullname}/${profile.email}/${profile.skill}/${profile._id}`} className="dash-viewprof">View Profile</Link> 
                                </div>
                                <div className='dash-skills'>
                                    <ul className="skill-list">
                                        {profile.skill.split(",").map(skill => 
                                        <li >
                                        <i className="fas fa-check"></i> {skill}
                                        </li>
                                        )}
                                    </ul> 
                                </div>
                            </div>
                        )
                        :null}
                        
                        
                    </div>
                </section>
            </div>
        )
}

export default Dashboard;
