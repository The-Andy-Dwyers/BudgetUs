import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import Switch from 'react-switch';

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
          onChange={this.handleChange}
          checked={this.state.month}
          id="normal-switch"
        />
        {this.props.incomeReducer.dashboard.sources && (
          <Income month={this.state.month} />
        )}
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
