import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Switch from 'react-switch';
import { Link } from 'react-router-dom';

import Income from '../Income/Income';
import Chart from '../Chart/Chart';
import Goals from '../Goals/Goals';

import './Dashboard.css';
import { getUsers } from '../../ducks/reducers/userReducer';
import { getDashboard } from '../../ducks/reducers/incomeReducer';
import { getTopExpenses } from '../../ducks/reducers/expensesReducer';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      month: true,
      expenses: []
    };
  }
  componentDidMount() {
    this.props.getDashboard('month');
    this.props.getTopExpenses();
  }

  handleChange = month =>
    this.setState({ month }, () =>
      this.props.getDashboard(this.state.month ? 'month' : 'year')
    );
  render() {
    const { topExpenses } = this.props.expensesReducer;
    const map =
      topExpenses.length !== 0 &&
      topExpenses.map((e, i) => {
        return (
          <div className="dash_map" key={i}>
            <p>{e.category}</p>
            <p>${e.amount.toLocaleString()}</p>
          </div>
        );
      });

    return (
      <div className="dashboard">
        <Goals />
        <div className='dash_switch'>
          <Switch
            uncheckedIcon={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: 15,
                  color: 'white',
                  paddingRight: 2,
                  background: '#d12012',
                  borderRadius: 50
                }}
              >
                Y
              </div>
            }
            checkedIcon={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: 15,
                  color: 'white',
                  paddingRight: 2,
                  background: '#d12012',
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
        </div>
        <div className="dashboard_top">
          {this.props.incomeReducer.dashboard.sources && (
            <Income month={this.state.month} />
          )}
          <div className="dashboard_expense">
            <h2>Expenses Overview</h2>
            <div>{map}</div>
            <Link className="link2" to="/expenses">
              <h2 className="expenses_link btn">More info</h2>
            </Link>
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
    getDashboard,
    getTopExpenses
  }
)(Dashboard);
