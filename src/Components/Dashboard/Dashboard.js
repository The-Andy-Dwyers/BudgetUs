import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Dashboard.css';
import Setup from '../Setup/Setup';

import { getUsers } from '../../ducks/reducers/userReducer';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <Setup />
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
)(Dashboard);
