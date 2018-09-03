import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-custom-date-picker';
import moment from 'moment';

import './ExpensesInfo.css';
import {
  getExpensesByCategory,
  getExpenses,
  addExpenses,
  deleteExpense
} from '../../ducks/reducers/expensesReducer';
import { getUsers } from '../../ducks/reducers/userReducer';
import ContentEditable from 'react-contenteditable';

class Expenses extends Component {
  state = {
    expenseName: '',
    amount: '',
    type: '',
    company: '',
    category: '',
    date: new Date().toISOString(),
    edit: false
  };

  componentDidMount() {
    this.props.getExpenses();
    this.props.getUsers();
  }

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

  handleEdit = id => {
    const { expenseName, amount, date, type, company, category } = this.state;
    var find = this.props.expensesReducer.expense.find(e => e.id === id);

    axios
      .put(`/api/edit-expense/${id}`, {
        expenseName: !expenseName ? find.title : expenseName,
        amount: !amount ? find.cost : amount,
        date: !date ? find.expense_date : date,
        type: !type ? find.occur : type,
        company: !company ? find.company : company,
        category: !category ? find.category : category
      })
      .then(() => {
        this.props.getExpenses();
        this.setState({ edit: false });
        this.setState({
          expenseName: '',
          amount: '',
          type: '',
          company: '',
          category: '',
          date: ''
        });
      });
  };

  updateExpense = (val, state) => {
    this.setState({ [state]: val });
  };

  render() {
    console.log(this.props);
    const { expense } = this.props.expensesReducer;

    const map2 =
      expense &&
      expense.map(e => {
        return !this.state.edit ? (
          <div className="expensesinfo_map2_all" key={e.id}>
            <div
              className="expensesinfo_map2_cards"
              onClick={() => this.setState({ edit: true })}
            >
              <div className="expensesinfo_map2_top">
                <div className="left">
                  <p>{e.title}</p>
                  <div style={{ width: '20px' }} />
                  <p>{e.company}</p>
                </div>
                <div className="right">
                  <p className="expensesinfo_map2_right">
                    ${e.cost.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="expensesinfo_map2_bottom">
                <div className="left">
                  <p>{moment.utc(e.expense_date).format('ddd, MMM D')}</p>
                  <div style={{ width: '20px' }} />
                  <p>{e.occur}</p>
                </div>
                <div className="right">
                  <p className="expensesinfo_map2_right">{e.category}</p>
                  <div className="expensesinfo_map2_right">
                    {!this.state.edit && (
                      <h3 onClick={() => this.setState({ edit: true })}>
                        Edit
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="expensesinfo_map2_all" key={e.id}>
            <div className="expensesinfo_map2_cards">
              <div className="expensesinfo_map2_top">
                <div className="left">
                  <ContentEditable
                    className="expensesinfo_content"
                    html={e.title}
                    onChange={e =>
                      this.updateExpense(e.target.value, 'expenseName')
                    }
                  />
                  <div style={{ width: '20px' }} />
                  <ContentEditable
                    className="expensesinfo_content"
                    html={e.company}
                    onChange={e =>
                      this.updateExpense(e.target.value, 'company')
                    }
                  />
                </div>
                <div className="right">
                  <ContentEditable
                    className="expensesinfo_content"
                    html={String(e.cost.toLocaleString())}
                    onChange={e => this.updateExpense(e.target.value, 'amount')}
                  />
                </div>
              </div>

              <div className="expensesinfo_map2_bottom">
                <div className="left">
                  <DatePicker
                    width={240}
                    inputStyle={{
                      width: 70
                    }}
                    date={moment.utc(e.expense_date).format('MM/DD/YYYY')}
                    placeholder={moment
                      .utc(e.expense_date)
                      .format('MM/DD/YYYY')}
                    handleDateChange={this.handleDateChange}
                  />
                  <div style={{ width: '20px' }} />
                  <form>
                    <div>
                      <input
                        name="occur"
                        type="radio"
                        value="recurring"
                        onClick={() => this.handleType('Recurring')}
                      />{' '}
                      Recurring
                    </div>
                    <div>
                      <input
                        name="occur"
                        type="radio"
                        value="nonrecurring"
                        onClick={() => this.handleType('Non-Recurring')}
                      />{' '}
                      Non-Recurring
                    </div>
                  </form>
                </div>
                <div className="right">
                  <select
                    className="expensesinfo_select"
                    required
                    onChange={e =>
                      this.updateExpense(e.target.value, 'category')
                    }
                  >
                    <option>Category:</option>
                    <option value="Rent">Rent</option>
                    <option value="Bills">Bills</option>
                    <option value="Food">Food</option>
                    <option value="Gas">Gas</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">other</option>
                  </select>
                  <div className="expensesinfo_map2_right_edit">
                    <div
                      className="expense_btn_holder"
                      onClick={id => this.handleEdit(e.id)}
                    >
                      <div className="checkbox_container">
                        <div className="check_main c_left" />
                        <div className="check_main c_right" />
                      </div>

                      <div
                        className="expenses_x_container btn"
                        onClick={id => this.handleDelete(e.id)}
                      >
                        <div className="x_div x1" />
                        <div className="x_div x2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });

    const map =
      expense &&
      expense.map(e => {
        return !this.state.edit ? (
          <div className="expensesinfo_map" key={e.id}>
            <p>{e.title}</p>
            <p>{e.company}</p>
            <p>${e.cost.toLocaleString()}</p>
            <p>{e.occur}</p>
            <p>{moment.utc(e.expense_date).format('ddd, MMM D')}</p>
            <p>{e.category}</p>
          </div>
        ) : (
          <div key={e.id} className="expensesinfo_map">
            <ContentEditable
              className="expensesinfo_content"
              html={e.title}
              onChange={e => this.updateExpense(e.target.value, 'expenseName')}
            />
            <ContentEditable
              className="expensesinfo_content"
              html={e.company}
              onChange={e => this.updateExpense(e.target.value, 'company')}
            />
            <ContentEditable
              className="expensesinfo_content"
              html={String(e.cost.toLocaleString())}
              onChange={e => this.updateExpense(e.target.value, 'amount')}
            />
            <form>
              <div>
                <input
                  name="occur"
                  type="radio"
                  value="recurring"
                  onClick={() => this.handleType('Recurring')}
                />{' '}
                Recurring
              </div>
              <div>
                <input
                  name="occur"
                  type="radio"
                  value="nonrecurring"
                  onClick={() => this.handleType('Non-Recurring')}
                />{' '}
                Non-Recurring
              </div>
            </form>
            <div className="expensesinfo_content">
              <DatePicker
                width={240}
                inputStyle={{
                  width: 70
                }}
                date={moment.utc(e.expense_date).format('MM/DD/YYYY')}
                placeholder={moment.utc(e.expense_date).format('MM/DD/YYYY')}
                handleDateChange={this.handleDateChange}
              />
            </div>
            <div className="expense_map_bottom">
              <select
                className="expensesinfo_select"
                required
                onChange={e => this.updateExpense(e.target.value, 'category')}
              >
                <option>Category:</option>
                <option value="Rent">Rent</option>
                <option value="Bills">Bills</option>
                <option value="Food">Food</option>
                <option value="Gas">Gas</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">other</option>
              </select>

              <div
                className="expense_btn_holder"
                onClick={id => this.handleEdit(e.id)}
              >
                <div className="checkbox_container">
                  <div className="check_main c_left" />
                  <div className="check_main c_right" />
                </div>

                <div
                  className="expenses_x_container btn"
                  onClick={id => this.handleDelete(e.id)}
                >
                  <div className="x_div x1" />
                  <div className="x_div x2" />
                </div>
              </div>
            </div>
          </div>
        );
      });

    const sum = expense && expense.reduce((sum, e) => (sum += +e.cost), 0);

    return (
      <div className="expenses_container">
        <div className="expensesinfo_map1">
          <div className="expenses">
            <div className="expenses_titles">
              <h2>Name</h2>
              <h2>Company</h2>
              <h2>Amount</h2>
              <h2>Type</h2>
              <h2>Date</h2>
              <h2>Category</h2>
              <div>
                {!this.state.edit.length &&
                  expense.length !== 0 && (
                    <h3
                      className="expensesinfo_edit btn"
                      onClick={() => this.setState({ edit: true })}
                    >
                      Edit
                    </h3>
                  )}
              </div>
            </div>

            {map}
            <div className="expensesinfo_map1_total">
              <p>Expenses Total: ${sum}</p>
            </div>
          </div>
        </div>
        <div className="expensesinfo_map2">
          <div className="expensesinfo_map2_total">
            <p>Expenses Total: ${sum}</p>
          </div>
          {map2}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getExpenses, addExpenses, getUsers, deleteExpense, getExpensesByCategory }
)(Expenses);
