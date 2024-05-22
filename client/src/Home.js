import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Home extends Component{
    render(){
      return (
          <div>
            <section id="header">
              <h1>
              <Link to='/'><i className="fa fa-code"></i> Developers Hub</Link>
              </h1>
              <div>
                <ul id="navbar">
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
              </div>
          </section>
            <section className="home-landing">
                <div className="home-dark-overlay">
                    <div className="landing-inner">
                        <hl className="x-large">Developers Hub</hl>
                        <p className="home-lead">
                            Create a developer profile/portfolio, share posts and get help from 
                            other developers
                        </p>
                        <div className='home-buttons'>
                            <Link to="/register" className='home-signup'>Sign Up</Link>
                            <Link to="/login" className='home-login'>Login</Link>
                        </div>
                    </div>
                </div>
            </section>
          </div>
      )
    }
  }

export default Home