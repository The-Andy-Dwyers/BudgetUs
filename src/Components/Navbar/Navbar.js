import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Navbar.css';
import { getUsers } from '../../ducks/reducers/userReducer';

import menu from './icons/menu.svg';
import home from './icons/home.svg';
import calendar from './icons/calendar.svg';
import settings from './icons/settings.svg';
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
                <img className="navbar_icon btn" src={home} alt="Home icon" />
              </Link>
              <Link className="link calendar_link" to="/calendar">
                <img
                  className="navbar_icon btn"
                  src={calendar}
                  alt="Calendar icon"
                />
              </Link>
              <Link className="link settings_link" to="/settings">
                <img
                  className="navbar_icon btn"
                  src={settings}
                  alt="Settings icon"
                />
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
            onClick={() =>
              this.setState(
               {hidden: true, icon: false}
              )
            }
            onBlur={() => this.setState({ hidden: false })}
          />
        )}
        {this.state.hidden && (
          <div className="ham_container">
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
                  <img
                    className="navbar_icon btn"
                    src={home}
                    alt="Home icon"
                    onClick={() => this.setState({ hidden: false, icon: true })}
                  />
                </Link>
                <Link className="link" to="/calendar">
                  <img
                    className="navbar_icon btn"
                    src={calendar}
                    alt="Calendar icon"
                    onClick={() => this.setState({ hidden: false, icon: true })}
                  />
                </Link>
                <Link className="link" to="/settings">
                  <img
                    className="navbar_icon btn"
                    src={settings}
                    alt="Settings icon"
                    onClick={() => this.setState({ hidden: false, icon: true })}
                  />
                </Link>
                <Modal />

                <a className="link" href={process.env.REACT_APP_LOGOUT}>
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
