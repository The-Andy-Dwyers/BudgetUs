import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './Review.css';
import { getDashboard } from '../../ducks/reducers/incomeReducer';
class Review extends Component {
  componentDidMount() {
    this.props.getDashboard(
      moment()
        .startOf('year')
        .format('l'),
      moment().format('l')
    );
  }
  render() {
    console.log(this.props);
    const { incomesum, expensesum } = this.props.incomeReducer.dashboard;
    const remainder = incomesum - expensesum;
    console.log(incomesum);
    console.log(expensesum);

    return (
      <div className="review_main">
        <div className="settings_header review_header">
          <h1>Financial Review</h1>
        </div>
        {remainder > 1000 ? (
          <div>
            <h2>This is greater than $1000</h2>
          </div>
        ) : (
          <div>
            <h2>This is less than $1000</h2>
            <p>
              Here are some tips on how to improve your current financial
              situation, and maximize your savings.
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getDashboard }
)(Review);
