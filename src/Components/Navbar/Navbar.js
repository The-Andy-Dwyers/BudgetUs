import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Navbar.css';
import { getUsers } from '../../ducks/reducers/userReducer';

import menu from './icons/menu.svg';
import home from './icons/home.svg';
import home1 from './icons/home1.svg';
import calendar from './icons/calendar.svg';
import calendar1 from './icons/calendar1.svg';
import settings from './icons/settings.svg';
import settings1 from './icons/settings1.svg';
import Modal from '../Modal/Modal';

class Navbar extends Component {
  state = {
    hidden: false,
    icon: true
  };

  render() {
    return (
      <div className="navbar">
        <div className="ham_container">
          <div className="navbar_main">
            <div className="navbar_logo_container">
              <img
                className="navbar_logo"
                src="https://image.flaticon.com/icons/svg/134/134597.svg"
                alt="Logo"
              />
            </div>

            <div className="navbar_sub">
              <Link className="link" to="/dashboard">
                <div className="navbar_holder">
                  <img className="navbar_icon" src={home} alt="Home icon" />
                  <img className="navbar_icon1" src={home1} alt="Home icon" />
                </div>
              </Link>
              <Link className="link calendar_link" to="/calendar">
                <div className="navbar_holder">
                  <img
                    className="navbar_icon"
                    src={calendar}
                    alt="Calendar icon"
                  />
                  <img
                    className="navbar_icon1"
                    src={calendar1}
                    alt="Calendar icon"
                  />
                </div>
              </Link>
              <Link className="link settings_link" to="/settings">
                <div className="navbar_holder">
                  <img
                    className="navbar_icon"
                    src={settings}
                    alt="Settings icon"
                  />
                  <img
                    className="navbar_icon1"
                    src={settings1}
                    alt="Settings icon"
                  />
                </div>
              </Link>
              <Modal />

              <a
                className="link logout_link"
                href={process.env.REACT_APP_LOGOUT}
              >
                <h1 className="link">Logout</h1>
              </a>
            </div>
          </div>
        </div>
        {this.state.icon && (
          <img
            className="hamburger btn"
            src={menu}
            alt="Hamburger menu"
            onClick={() => this.setState({ hidden: true, icon: false })}
          />
        )}
        {this.state.hidden && (
          <div
            className="ham_container"
            onBlur={() => this.setState({ hidden: false })}
          >
            <div className="navbar_main_hidden">
              <div className="navbar_logo_container">
                <img
                  className="navbar_logo"
                  src="https://image.flaticon.com/icons/svg/134/134597.svg"
                  alt="Logo"
                />
              </div>

              <div className="navbar_sub">
                <Link className="link" to="/dashboard">
                  <div className="navbar_holder">
                    <img className="navbar_icon" src={home} alt="Home icon" />
                    <img className="navbar_icon1" src={home1} alt="Home icon" />
                  </div>
                </Link>
                <Link className="link calendar_link" to="/calendar">
                  <div className="navbar_holder">
                    <img
                      className="navbar_icon"
                      src={calendar}
                      alt="Calendar icon"
                    />
                    <img
                      className="navbar_icon1"
                      src={calendar1}
                      alt="Calendar icon"
                    />
                  </div>
                </Link>
                <Link className="link settings_link" to="/settings">
                  <div className="navbar_holder">
                    <img
                      className="navbar_icon"
                      src={settings}
                      alt="Settings icon"
                    />
                    <img
                      className="navbar_icon1"
                      src={settings1}
                      alt="Settings icon"
                    />
                  </div>
                </Link>
                <Modal />

                <a
                  className="link logout_link"
                  href={process.env.REACT_APP_LOGOUT}
                >
                  <h1 className="link">Logout</h1>
                </a>
              </div>
            </div>
          </div>
        )}
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
