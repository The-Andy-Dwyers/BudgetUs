import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Print from 'rc-print';

import './Review.css';
import { getDashboard } from '../../ducks/reducers/incomeReducer';
import { getExpenses } from '../../ducks/reducers/expensesReducer';
class Review extends Component {
  componentDidMount() {
    this.props.getDashboard(
      moment()
        .startOf('year')
        .format('l'),
      moment().format('l')
    );
    this.props.getExpenses(
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
    const {expensesbymonth} = this.props.expensesReducer
console.log(expensesbymonth)
    const monthMap = expensesbymonth.length && expensesbymonth.map(e=> {
      return (
        <div className='ex_map'>
          <p>{e.month}</p>
          <p>{e.sum}</p>
        </div>
      )
    })

    return (
      <div className="review_main">
        <div className="settings_header review_header">
          <h1>Financial Review</h1>
        </div>
        <Print ref="test">
          {/* {remainder > 1000 ? (
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
          )} */}
          <div className="financial_spreadsheet">
            <div className="spreadsheet_top" />
            <div className="spreadsheet_main">
              {monthMap}
            </div>
          </div>
        </Print>
        <div className="print_btn_holder">
          <h3
            className="print_btn btn"
            onClick={() => {
              this.refs.test.onPrint();
            }}
          >
            Print
          </h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getDashboard, getExpenses }
)(Review);
