import React, { Component } from 'react';
// import axios from 'axios';
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
    catagory: ''
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

    const map = this.props.expensesReducer.expense.data && this.props.expensesReducer.expense.data.map(e => {
      return <div key={e.id}>
        <h1>{e.name}</h1>
        <p>{e.amount}</p>
      </div>
    })
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

        <select required onChange={(e) => this.handleInputs(e.target.value, 'catagory')}>
          <option>Select Catagory:</option>
          <option value="Rent">Rent</option>
          <option value="Bills">Bills</option>
          <option value="Food">Food</option>
          <option value="Gas">Gas</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">other</option>
        </select>


        {map}
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getExpenses })(Expenses);
