import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-custom-date-picker';
import Modal from 'react-modal';
import moment from 'moment';

import './Expenses.css';
import {
  getExpenses,
  addExpenses,
  deleteExpense
} from '../../ducks/reducers/expensesReducer';
import { getExpensesByCategory } from '../../ducks/reducers/expensesReducer';
import { getUsers } from '../../ducks/reducers/userReducer';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement(document.getElementById('root'));

class Expenses extends Component {
  state = {
    expenseName: '',
    amount: 0,
    type: '',
    company: '',
    category: '',
    date: new Date().toISOString(),
    modalIsOpen: false
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  componentDidMount() {
    this.props.getExpenses();
    this.props.getUsers();
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

  handleDelete = id => {
    axios.delete(`/api/delete-expense/${id}`).then(() => {
      this.props.getExpensesByCategory();
      this.props.getExpenses();
    });
  };

  render() {
    const { id } = this.props.userReducer;
    const { expenseName, amount, date, type, company, category } = this.state;
    const map =
      this.props.expensesReducer.expense &&
      this.props.expensesReducer.expense.map(e => {
        return (
          <div className="Expenses_expenselist" key={e.id}>
            <p className="Expenses_list_content">{e.name}</p>
            <p className="Expenses_list_content">{e.amount}</p>
            <p className="Expenses_list_content">
              {moment.utc(date).format('ddd, MMM D')}
            </p>
            <p className="Expenses_list_content">{e.type}</p>
            <p className="Expenses_list_content">{e.company}</p>
            <p className="Expenses_list_content">{e.category}</p>
            <button onClick={id => this.handleDelete(e.id)}>Delete</button>
          </div>
        );
      });
    return (
      <div className="expenses_container">
        <div className="expenses">
          <h1 className="expense_input_btn btn" onClick={this.openModal}>
            Add ExpenseExpense
          </h1>
          {map}
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <h1>Expenses</h1>
          <input
            className="Expenses_input"
            placeholder="expense name"
            onChange={e => this.handleInputs(e.target.value, 'expenseName')}
          />
          <input
            className="Expenses_input"
            placeholder="amount"
            onChange={e => this.handleInputs(e.target.value, 'amount')}
          />
          <DatePicker
            date={this.state.date}
            handleDateChange={this.handleDateChange}
          />
          <input
            className="Expenses_input"
            placeholder="Company"
            onChange={e => this.handleInputs(e.target.value, 'company')}
          />

          <form>
            <input
              name="type"
              type="radio"
              value="recurring"
              onClick={() => this.handleType('Recurring')}
            />{' '}
            Recurring
            <input
              name="type"
              type="radio"
              value="nonrecurring"
              onClick={() => this.handleType('Non-Recurring')}
            />{' '}
            Non-Recurring
          </form>

          <select
            required
            onChange={e => this.handleInputs(e.target.value, 'category')}
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
                  this.closeModal();
                  this.props.getExpensesByCategory();
                  this.props.getExpenses();
                })
            }
          >
            Submit
          </button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getExpenses, addExpenses, getUsers, deleteExpense, getExpensesByCategory }
)(Expenses);
