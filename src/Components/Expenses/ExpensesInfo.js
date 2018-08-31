import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import DatePicker from "react-custom-date-picker";
import Modal from "react-modal";
import moment from "moment";

import "./ExpensesInfo.css";
import {
  getExpensesByCategory,
  getExpenses,
  addExpenses,
  deleteExpense
} from "../../ducks/reducers/expensesReducer";
import { getUsers } from "../../ducks/reducers/userReducer";
import ContentEditable from "react-contenteditable";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "Lato, sans-serif"
  }
};

Modal.setAppElement(document.getElementById("root"));

class Expenses extends Component {
  state = {
    expenseName: "",
    amount: "",
    type: "",
    company: "",
    category: "",
    date: new Date().toISOString(),
    modalIsOpen: false,
    edit: false
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
          expenseName: "",
          amount: "",
          type: "",
          company: "",
          category: "",
          date: ""
        });
      });
  };

  updateExpense = (val, state) => {
    this.setState({ [state]: val });
  };

  // <button onClick={id => this.handleDelete(e.id)}>Delete</button>
  render() {
    const { id } = this.props.userReducer;
    const { expense } = this.props.expensesReducer;
    const { expenseName, amount, date, type, company, category } = this.state;

    const map =
      expense &&
      expense.map(e => {
        return !this.state.edit ? (
          <div className="expensesinfo_map" key={e.id}>
            <p>{e.title}</p>
            <p>${e.cost.toLocaleString()}</p>
            {/* <p>{e.cost}</p> */}
            <p>{e.occur}</p>
            <p>{e.company}</p>
            <p>{e.category}</p>
            <p>{moment.utc(e.expense_date).format("ddd, MMM D")}</p>
          </div>
        ) : (
          <div key={e.id} className="expensesinfo_map">
            <ContentEditable
              className="expensesinfo_content"
              html={e.title}
              onChange={e => this.updateExpense(e.target.value, "expenseName")}
            />
            <ContentEditable
              className="expensesinfo_content"
              html={String(e.cost.toLocaleString())}
              onChange={e => this.updateExpense(e.target.value, "amount")}
            />

            <form>
              <input
                name="occur"
                type="radio"
                value="recurring"
                onClick={() => this.handleType("Recurring")}
              />{" "}
              Recurring
              <input
                name="occur"
                type="radio"
                value="nonrecurring"
                onClick={() => this.handleType("Non-Recurring")}
              />{" "}
              Non-Recurring
            </form>

            <ContentEditable
              className="expensesinfo_content"
              html={e.company}
              onChange={e => this.updateExpense(e.target.value, "company")}
            />
            <select
              required
              onChange={e => this.updateExpense(e.target.value, "category")}
            >
              <option>Select Category:</option>
              <option value="Rent">Rent</option>
              <option value="Bills">Bills</option>
              <option value="Food">Food</option>
              <option value="Gas">Gas</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">other</option>
            </select>

            <div className="expense_map_bottom">
              <DatePicker
                className="expensesinfo_content_datepicker"
                date={moment.utc(e.expense_date).format("MM/DD/YYYY")}
                placeholder={moment.utc(e.expense_date).format("MM/DD/YYYY")}
                handleDateChange={this.handleDateChange}
              />
              <div className="expense_btn_holder">
                <img
                  src="https://image.flaticon.com/icons/png/128/128/128384.png"
                  className="expenses_edit btn"
                  onClick={id => this.handleEdit(e.id)}
                  alt="checkmark"
                />
                <div
                  className="x_container btn"
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
    return (
      <div className="expenses_container">
        <div className="expenses">
          <h1 className="expense_input_btn btn" onClick={this.openModal}>
            Add Expense
          </h1>
          <div>
            <h2>Name</h2>
            <h2>Amount</h2>
            <h2>Type</h2>
            <h2>Company</h2>
            <h2>Category</h2>
            <h2>Date</h2>
            <div>
              {!this.state.edit && (
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
          <div className="">
            <p>
              Expenses Total: ${this.props.incomeReducer.dashboard.expensesum}
            </p>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div className="expensesinfo_modal">
            <h1>Expenses</h1>
            <input
              className="expensesinfo_input"
              placeholder="Expense Name"
              onChange={e => this.handleInputs(e.target.value, "expenseName")}
            />
            <input
              className="expensesinfo_input"
              placeholder="amount"
              onChange={e => this.handleInputs(e.target.value, "amount")}
            />
            <input
              className="expensesinfo_input"
              placeholder="Company"
              onChange={e => this.handleInputs(e.target.value, "company")}
            />
            <form className="expensesinfo_modal_form">
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
            <div className="expensesinfo_modal_date">
              <DatePicker
                date={this.state.date}
                handleDateChange={this.handleDateChange}
              />
            </div>
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
          </div>
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
