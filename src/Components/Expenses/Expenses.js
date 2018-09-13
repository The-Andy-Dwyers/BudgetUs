import React, { Component } from 'react';
import { getUsers } from '../../ducks/reducers/userReducer';
import {
  getExpenses,
  getExpensesByCategory
} from '../../ducks/reducers/expensesReducer';
import { connect } from 'react-redux';
import moment from 'moment';

import Chart from '../Chart/Chart';
import './Expenses.css';
import ExpensesInfo from './ExpensesInfo';
import Modal from '../Modal/Modal';
class Expenses extends Component {
  state = {};
  componentDidMount() {
    this.props.getUsers();
    this.props.getExpenses(start(moment()), end(moment()));
    this.props.getExpensesByCategory(start(moment()), end(moment()));
  }

  handleChange = month => {
    if (month === 'year') {
      this.setState({
        start: moment()
          .startOf('year')
          .format('l'),
        end: moment().format('l')
      });
      this.props.getExpenses(
        moment()
          .startOf('year')
          .format('l'),
        moment().format('l')
      );
      this.props.getExpensesByCategory(
        moment()
          .startOf('year')
          .format('l'),
        moment().format('l')
      );
    } else {
      this.setState({
        start: start(month),
        end: end(month)
      });
      this.props.getExpenses(start(month), end(month));
      this.props.getExpensesByCategory(start(month), end(month));
    }
  };
  render() {
    const options = this.props.expensesReducer.expensesbymonth
      .filter(e => e.month.trim() !== moment().format('MMMM'))
      .map((e, i) => (
        <option key={i} value={moment(e.month.trim(), 'MMMM').format('l')}>
          {e.month.trim()}
        </option>
      ));
    return (
      <div className="Expenses">
        <div className="expenses_top">
          <div className="dash_modal">
            <Modal />
          </div>
          <select
            className="dash_options"
            onChange={e => this.handleChange(e.target.value)}
          >
            <option
              value={moment().format('l')}
              defaultValue={moment().format('l')}
            >
              {moment().format('MMMM')}
            </option>
            <option disabled>───────</option>
            {options}
            <option value="year">YTD</option>
          </select>
        </div>
        <ExpensesInfo start={this.state.start} end={this.state.end} />
        <Chart type="expenses" />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { getUsers, getExpenses, getExpensesByCategory }
)(Expenses);

function start(d) {
  return moment(new Date(d).toISOString())
    .startOf('month')
    .format('l');
}
function end(d) {
  return moment(new Date(d).toISOString())
    .endOf('month')
    .format('l');
}
