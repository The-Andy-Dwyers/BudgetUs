import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getExpenses,
  addExpenses,
  deleteExpense
} from "../../ducks/reducers/expensesReducer";
import { getUser } from "../../ducks/reducers/userReducer";
import DatePicker from "react-custom-date-picker";
import moment from "moment";
import Chart from "../Chart/Chart";

import "./Expenses.css";

class Expenses extends Component {
  constructor() {
    super();
    this.state = {
      expenseName: "",
      amount: 0,
      type: "",
      company: "",
      category: "",
      date: new Date().toISOString()
    };
    // this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.getExpenses();
    this.props.getUser();
  }

  handleInputs = (val, state) => {
    this.setState({
      [state]: val
    });
  };

  handleType = val => {
    this.setState({
      type: val
    });
  };

  handleDateChange = date => {
    this.setState({ date: new Date(date).toISOString() });
  };

  handleDelete = e => {
    console.log(e);
    this.props.deleteExpense(e).then(() => {
      this.props.getExpenses();
    });
  };

  // <input className="Expenses_input" placeholder='date' onChange={(e) => this.handleInputs(e.target.value, 'date')} />

  render() {
    console.log(this.props);
    const { id } = this.props.userReducer;
    const { expenseName, amount, date, type, company, category } = this.state;
    const map =
      this.props.expensesReducer.expense &&
      this.props.expensesReducer.expense.map(e => {
        return (
          <div className="Expenses_expenselist" key={e.id}>
            <p>{e.name}</p>
            <p>{e.amount}</p>
            <p>{moment.utc(date).format("ddd, MMM D")}</p>
            <p>{e.type}</p>
            <p>{e.company}</p>
            <p>{e.category}</p>
            <button onClick={() => this.handleDelete(e)}>Delete</button>
          </div>
        );
      });
    return (
      <div className="expenses">
        <h1>Expenses</h1>
        <input
          className="Expenses_input"
          placeholder="expense name"
          onChange={e => this.handleInputs(e.target.value, "expenseName")}
        />
        <input
          className="Expenses_input"
          placeholder="amount"
          onChange={e => this.handleInputs(e.target.value, "amount")}
        />
        <DatePicker
          date={this.state.date}
          handleDateChange={this.handleDateChange}
        />
        <input
          className="Expenses_input"
          placeholder="Company"
          onChange={e => this.handleInputs(e.target.value, "company")}
        />

        <form>
          <input
            name="type"
            type="radio"
            value="recurring"
            onClick={() => this.handleType("Recurring")}
          />{" "}
          Recurring
          <input
            name="type"
            type="radio"
            value="nonrecurring"
            onClick={() => this.handleType("Non-Recurring")}
          />{" "}
          Non-Recurring
        </form>

        <select
          required
          onChange={e => this.handleInputs(e.target.value, "category")}
        >
          <option>Select Category:</option>
          <option value="Rent">Rent</option>
          <option value="Bills">Bills</option>
          <option value="Food">Food</option>
          <option value="Gas">Gas</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">other</option>
        </select>

        <button
          onClick={() =>
            this.props
              .addExpenses({
                expenseName,
                amount,
                type,
                date,
                company,
                category,
                id
              })
              .then(() => {
                this.props.getExpenses();
              })
          }
        >
          Submit
        </button>

        {map}
        <Chart type="expenses" />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getExpenses, addExpenses, getUser, deleteExpense }
)(Expenses);
