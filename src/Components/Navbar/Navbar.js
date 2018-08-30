import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Navbar.css';
import { getUsers } from '../../ducks/reducers/userReducer';
import menu from './icons/menu.svg';
import home from './icons/home.svg';
import calendar from './icons/calendar.svg';

class Navbar extends Component {
  // componentDidMount() {
  //   this.props.getUsers().then(() => {
  //     !this.props.userReducer.auth_id && window.location.assign('/');
  //   });
  // }

  render() {
    return (
      <div className="navbar">
        <div className="ham_container">
          <img className="hamburger" src={menu} alt="Hamburger menu" />
        </div>
        <div className='navbar_logo_container'>
          <img className='navbar_logo'src="https://image.flaticon.com/icons/svg/134/134597.svg" alt="Logo"/>
        </div>
        <div className="navbar_sub">
          <Link className="link" to="/dashboard">
              <img className='navbar_icon btn' src={home} alt="Home icon"/>
          </Link>
          {/* <Link className="link" to="/expenses">
            <h2>Expenses</h2>
          </Link> */}
          <Link className="link" to="/calendar">
          <img className='navbar_icon btn' src={calendar} alt="Calendar icon"/>
          </Link>
          <Link className="link" to="/settings">
            <h2>Settings</h2>
          </Link>
          <a className="link" href={process.env.REACT_APP_LOGOUT}>
            <h1 className="link">Logout</h1>
          </a>
        </div>
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
