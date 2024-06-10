import React, { useEffect, useState } from 'react';
import {Navigate, Link} from 'react-router-dom';
import axios from 'axios';

const MyProfile = () => {
    const [data,setData] = useState(null);
    const [review,setReview] = useState([])
    useEffect(() => {
        axios.get('https://devhubmern.onrender.com/myprofile', {
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setData(res.data))
        axios.get('https://devhubmern.onrender.com/myreview', {
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setReview(res.data))
    },[])
    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }
    return(
        <div>
            <section id="header">
                <h1><Link to="/"><i className="fas fa-code"></i> Developers Hub</Link> </h1>
                <div>
                    <ul id='navbar'>
                        <li><Link to="/myprofile">My Profile</Link></li>
                        <li><Link to="/login">Logout</Link></li>
                    </ul>
                </div>
            </section>
            {data &&
            <section className="section-container">
                <Link to="/dashboard" className="myprof-back">Back To Profiles</Link>
                <div className="myprof-container">
                    <div className="myprof-top">
                        <img
                        className="round-img my-1"
                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y6s=200"
                        alt=""/>
                        <h1 className="myprof-large">{data.fullname}</h1>
                        <p className="myprof-lead">{data.email}</p>
                        <p>India</p>
                    </div>
                    <div className="profile-github">
                        <h2 className="text-primary my-1">
                        <i className="fab fa-github"></i> Reviews and Ratings
                        </h2>
                        <div className="all-profiles">
                            {review ?
                            review.map(review => 
                                <div>
                                    <h4><Link to="#">{review.taskprovider}</Link></h4>
                                    <p>
                                    {review.rating}/5
                                    </p>
                                </div>)
                                :
                                <p>No review added yet</p>
                            }
                            
                        </div>
                        <div className="add-review">
                            <div>
                                <h4>Enter your reviews</h4>
                                <form className="form" autocomplete="off"> <div className="form-group">
                                <input
                                type="text"
                                placeholder="Enter your rating out of 5" name="rating"
                                required='true' />
                                </div>
                                <input type="submit" className="add-rating" value="Add Rating" /> 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>    
            </section>
            }
        </div>
    )
}

export default MyProfile