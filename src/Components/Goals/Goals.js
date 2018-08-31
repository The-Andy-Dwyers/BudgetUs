import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Goals.css';
import { getDashboard } from '../../ducks/reducers/incomeReducer';
import { getGoals } from '../../ducks/reducers/expensesReducer';

class Goals extends Component {
  componentDidMount() {
    this.props.getGoals();
  }

  render() {
    const { expensesum, incomesum } = this.props.incomeReducer.dashboard;
    const { goals } = this.props.expensesReducer;

    const remaining = incomesum - expensesum;
    const remainder = remaining - (goals.length && goals[0].savings);
    return (
      <div className="goals">
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
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getDashboard, getGoals }
)(Goals);
