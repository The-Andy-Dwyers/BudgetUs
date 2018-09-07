import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Goals.css';
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
          {find && find.name !== null ? (
            <h2 className="profile_homepage">Welcome {find.name}!</h2>
          ) : (
            <div>
              <h2>Welcome to BudgetUs!</h2>
              <p>Click here to setup your profile.</p>
            </div>
          )}
        </div>
        {this.props.userReducer.id && (
          <div>
            {goals.length === 0 ? (
              <p>You haven't set up your goals yet. Click here!</p>
            ) : remainder && remainder < 0 ? (
              <p>
                You are{' '}
                <mark className="red_mark">
                  -$
                  {Math.abs(remainder).toLocaleString()}
                </mark>{' '}
                under your savings goal for this month.
                <br />
                Watch your spending!
              </p>
            ) : (
              <div className="goals_p">
                <p>
                  You've saved a total of{' '}
                  <mark>${remaining.toLocaleString()}</mark> this month.
                </p>
                <p>
                  You are <mark>${remainder.toLocaleString()}</mark> above from
                  your goal of
                  <mark>
                    {' '}
                    ${goals.length && goals[0].savings.toLocaleString()}
                  </mark>{' '}
                  !
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getGoals, getUsers }
)(Goals);
