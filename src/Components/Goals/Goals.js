import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Goals.css';
import { getDashboard } from '../../ducks/reducers/incomeReducer';
import { getGoals } from '../../ducks/reducers/expensesReducer';
import { getUsers } from '../../ducks/reducers/userReducer';

class Goals extends Component {
  componentDidMount() {
    this.props.getGoals();
    this.props.getUsers();
  }

  render() {
    const { expensesum, incomesum } = this.props.incomeReducer.dashboard;
    const { goals } = this.props.expensesReducer;
    const { users } = this.props.userReducer;
    const find =
      users.length && users.find(e => e.id === this.props.userReducer.id);
    const remaining = incomesum - expensesum;
    const remainder = remaining - (goals.length && goals[0].savings);
    return (
      <div className="goals">
        <div>
          {find ? (
            <h2>Welcome {find.name}!</h2>
          ) : (
            <div>
              <h2>Welcome to BudgetUs!</h2>
              <p>Click here to setup your profile.</p>
            </div>
          )}
        </div>
        <div>
          {remainder && remainder > 0 ? (
            <p>
              You've saved a total of ${remaining.toLocaleString()} this month.{' '}
              <br />
              You are ${remainder.toLocaleString()} above from your goal of $
              {goals.length && goals[0].savings.toLocaleString()}!
            </p>
          ) : (
            <p>
              You are -$
              {Math.abs(remainder).toLocaleString()} under your savings goal for
              this month.
              <br />
              Watch your spending!
            </p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getDashboard, getGoals, getUsers }
)(Goals);
