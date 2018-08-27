import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { getExpenses } from '../../ducks/reducers/expensesReducer'

import './Expenses.css';

class Expenses extends Component {

  state = {
    expenses: [],
    expenseName: '',
    amount: 0,
    type: '',
    company: '',
    catagories: ''
  }

  componentDidMount() {
    this.props.getExpenses();
  }



  handleInputs = (val, state) => {
    this.setState({
      [state]: val
    })
  }

  render() {
    console.log(this.props)

    // let expenses = this.props.expenses
    return (
      <div className="expenses">
        <h1>Expenses</h1>
        <input className="Expenses_input" placeholder="expense name" onChange={(e) => this.handleInputs(e.target.value, 'expenseName')} />
        <input className="Expenses_input" placeholder='amount' onChange={(e) => this.handleInputs(e.target.value, 'amount')} />
        <input className="Expenses_input" placeholder="Company" onChange={(e) => this.handleInputs(e.target.value, 'company')} />

        <select required onChange={(e) => this.handleInputs(e.target.value, 'type')}>
          <option>Select Type:</option>
          <option value="Recurring">Recurring</option>
          <option value="Non-Recurring">Non-recurring</option>
        </select>

      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getExpenses })(Expenses);
