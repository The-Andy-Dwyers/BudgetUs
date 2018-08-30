import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
// import moment from 'moment';
import Switch from 'react-switch';
import { Link } from 'react-router-dom';

import Income from '../Income/Income';
import Chart from '../Chart/Chart';
import Goals from '../Goals/Goals';

import './Dashboard.css';
import { getUsers } from '../../ducks/reducers/userReducer';
import { getDashboard } from '../../ducks/reducers/incomeReducer';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      month: true
    };
  }
  componentDidMount() {
    this.props.getDashboard('month');
  }
  handleChange = month =>
    this.setState({ month }, () =>
      this.props.getDashboard(this.state.month ? 'month' : 'year')
    );
  render() {
    return (
      <div className="dashboard">
        <Goals />
        <Switch
          uncheckedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: "white",
                paddingRight: 2,
                background: "#d12012",
                borderRadius: 50
              }}
            >
              Y
            </div>
          }
          checkedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: "white",
                paddingRight: 2,
                background: "#d12012",
                borderRadius: 50
              }}
            >
              M
            </div>
          }
          onChange={this.handleChange}
          checked={this.state.month}
          id="normal-switch"
        />
        <div className="dashboard_top">
          {this.props.incomeReducer.dashboard.sources && (
            <Income month={this.state.month} />
          )}
          <div className="dashboard_expense">
<<<<<<< HEAD
            <h2>Expense goes here</h2>
=======
            <Link className="link2" to="/expenses">
              <h2>Expenses</h2>
            </Link>
>>>>>>> master
          </div>
        </div>

        {this.props.incomeReducer.dashboard.sources && (
          <Chart type="remaining" />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUsers,
    getDashboard
  }
)(Dashboard);
