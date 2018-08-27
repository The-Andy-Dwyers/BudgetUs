import React, { Component } from 'react';
import axios from 'axios';

import './LandingPage.css';

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing">
        <div className="landing_content">
          <h1>The Andy Dwyers</h1>
        </div>
        <a className="login_btn" href={process.env.REACT_APP_LOGIN}>
          <h1 className='login_link'>Login</h1>
        </a>
      </div>
    );
  }
}
