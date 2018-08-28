import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import './Navbar.css';
import { getUsers } from "../../ducks/reducers/userReducer";


class Navbar extends Component {
  componentDidMount(){
    this.props.getUsers().then(()=>{

      !this.props.userReducer.auth_id &&
      window.location.assign('/')
    })

  }

  render() {

    
    return (
      <div className="navbar">
        <Link className="link" to="/dashboard">
          <h2>Home</h2>
        </Link>
        <Link className="link" to="/expenses">
          <h2>Expenses</h2>
        </Link>
        <Link className="link" to="/calendar">
          <h2>Calendar</h2>
        </Link>
        <Link className="link" to="/settings">
          <h2>Settings</h2>
        </Link>
        <a className="link" href={process.env.REACT_APP_LOGOUT}>
          <h1 className="link">Logout</h1>
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUsers
  }
)(Navbar);

