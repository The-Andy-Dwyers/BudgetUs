import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux'
import { getExpenses, addExpenses } from '../../ducks/reducers/expensesReducer'

import './Expenses.css';

class Expenses extends Component {

  state = {
    expenseName: '',
    amount: 0,
    type: '',
    company: '',
    category: '',
    date: ''
  }

  componentDidMount() {
    this.props.getExpenses();
  }


  handleInputs = (val, state) => {
    this.setState({
      [state]: val
    })
  }

  handleType = (val) => {
    this.setState({
      type: val
    });
  }


  render() {
    console.log(this.props);
    const { expenseName, amount, date, type, company, category } = this.state
    const map = this.props.expensesReducer.expense && this.props.expensesReducer.expense.map(e => {
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
        <input className="Expenses_input" placeholder='date' onChange={(e) => this.handleInputs(e.target.value, 'date')} />
        <input className="Expenses_input" placeholder="Company" onChange={(e) => this.handleInputs(e.target.value, 'company')} />

        <form>
          <input name="type" type="radio" value="recurring" onClick={() => this.handleType('Recurring')} /> Recurring
          <input name="type" type="radio" value="nonrecurring" onClick={() => this.handleType('Non-Recurring')} /> Non-Recurring
        </form>

        <select required onChange={(e) => this.handleInputs(e.target.value, 'catagory')}>
          <option>Select Category:</option>
          <option value="Rent">Rent</option>
          <option value="Bills">Bills</option>
          <option value="Food">Food</option>
          <option value="Gas">Gas</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">other</option>
        </select>

        <button onClick={() => this.props.addExpenses({ expenseName, amount, type, date, company, category })}>Submit</button>


        {map}
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getExpenses, addExpenses })(Expenses);
