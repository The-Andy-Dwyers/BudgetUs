import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import DatePicker from 'react-custom-date-picker';
import moment from 'moment';
import axios from 'axios';
import swal from 'sweetalert2';

import './Modal.css';
import '../Navbar/Navbar.css';
import { getUsers } from '../../ducks/reducers/userReducer';
import {
  updateAmount,
  updateDate,
  updateTitle,
  getDashboard
} from '../../ducks/reducers/incomeReducer';
import {
  getGoals,
  getTopExpenses,
  getExpenses,
  addExpenses,
  getExpenseTotalsByMonth
} from '../../ducks/reducers/expensesReducer';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '1px 1px 20px #000',
    fontFamily: 'Lato, sans-serif'
  }
};

Modal.setAppElement(document.getElementById('root'));

class Goals extends Component {
  state = {
    modalIsOpen: false,
    modal1IsOpen: false,
    month: true,
    savings: '',
    expenseName: '',
    amount: '',
    type: '',
    company: '',
    category: '',
    date: new Date().toISOString(),
    display: true
  };

  componentDidMount() {
    //   this.props.getUsers().then(() => {
    //     !this.props.userReducer.auth_id && window.location.assign('/');
    //   });
    // this.props.getGoals();
    //   setTimeout(
    //     function() {
    //       this.initialGoal();
    //     }.bind(this),
    //     3000
    //   );
  }

  initialGoal = () => {
    this.props.expensesReducer.goals.length ||
      swal({
        position: 'top-end',
        title: `You haven't set up a monthly goal yet.`,
        text: 'Would you like to set a goal?',
        showCancelButton: true,
        cancelButtonText: 'No, Thanks.',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Let's go!`
      }).then(res => {
        res.value && this.setState({ modal1IsOpen: true });
      });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  openModal1 = () => {
    this.setState({ modal1IsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, modal1IsOpen: false });
  };

  handleDateChange = date => {
    this.props.updateDate(date);
  };
  handleDateChange1 = date => {
    this.setState({ date: new Date(date).toISOString() });
  };

  submitIncome = e => {
    let { amount, title, date } = this.props.incomeReducer;
    let { id } = this.props.userReducer;

    axios
      .post('/api/setup-income', {
        amount,
        title,
        date,
        id
      })
      .then(() => {
        this.state.month
          ? this.props.getDashboard(
              moment()
                .startOf('month')
                .format('l'),
              moment()
                .endOf('month')
                .format('l')
            )
          : (moment()
              .startOf('year')
              .format('l'),
            moment()
              .endOf('month')
              .format('l'));
        this.closeModal();
      });
  };

  addGoal = () => {
    axios
      .post('/api/add-goal', {
        savings: this.state.savings
      })
      .then(() => {
        this.props.getGoals();
      });
    this.closeModal();
  };

  editGoal = () => {
    const { savings } = this.state;
    const { id } = this.props.expensesReducer.goals[0];

    axios.put('/api/edit-goal', {
      id,
      savings
    });
    this.closeModal();
  };

  //   expense modal
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

  render() {
    const {
      expenseName,
      amount,
      date,
      type,
      company,
      category,
      display
    } = this.state;
    const { updateAmount, updateTitle } = this.props;
    const { id } = this.props.userReducer;

    const day = moment().format('MM/DD/YYYY');
    const dashboardDate =
      this.props.incomeReducer.dashboard.length &&
      this.props.incomeReducer.dashboard.sources.date;

    return this.props.type === 'goals' ? (
      <div className="modal_goals_container">
        <h3 className="btn" onClick={this.openModal1}>
          Goals
        </h3>
        <Modal
          isOpen={this.state.modal1IsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          {this.props.expensesReducer.goals.length !== 0 ? (
            <div className="modal_goals">
              <div>
                <h1>Edit Goal</h1>
                <input
                  type="text"
                  placeholder="Edit your goal"
                  onChange={e => this.setState({ savings: e.target.value })}
                />
                <h3 onClick={() => this.editGoal()}>Submit</h3>
              </div>
            </div>
          ) : (
            <div className="modal_goals">
              <h1>Savings Goal!</h1>
              <div>
                <h3>What is your monthly Goal?</h3>
                <input
                  type="text"
                  onChange={e => this.setState({ savings: e.target.value })}
                />
                <h3 className="income_btn" onClick={() => this.addGoal()}>
                  Submit
                </h3>
              </div>
            </div>
          )}
        </Modal>
      </div>
    ) : (
      <div className="modal_container">
        <h3 className="income_input_btn" onClick={this.openModal}>
          Add
        </h3>
        <h3 className="income_input_btn2 btn" onClick={this.openModal}>
          +
        </h3>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div className="all_modal">
            <div className="modal_top">
              <h2
                onClick={() => {
                  this.setState({ display: true });
                }}
              >
                Add your Income
              </h2>
              <h2
                onClick={() => {
                  this.setState({ display: false });
                }}
              >
                Add your expenses
              </h2>
            </div>
            {display ? (
              <div className="income_modal">
                <div className="income_sub">
                  <p>Source:</p>
                  <input
                    autoFocus
                    placeholder="Dev Mountain"
                    onChange={e => updateTitle(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="income_sub">
                  <p>Amount:</p>
                  <input
                    onChange={e => updateAmount(e.target.value)}
                    type="text"
                    placeholder="$1,000"
                  />
                </div>
                <div className="income_sub">
                  <p>Payday:</p>
                  <DatePicker
                    date={dashboardDate}
                    placeholder={day}
                    handleDateChange={this.handleDateChange}
                  />
                </div>
                <h3
                  className="income_btn"
                  onClick={e => this.submitIncome(e)}
                >
                  Submit
                </h3>
              </div>
            ) : (
              <div className="expensesinfo_modal">
                <div className="income_sub">
                  <p>Name:</p>
                  <input
                    placeholder="Expense Name"
                    onChange={e =>
                      this.handleInputs(e.target.value, 'expenseName')
                    }
                  />
                </div>
                <div className="income_sub">
                  <p>Company:</p>
                  <input
                    placeholder="Company"
                    onChange={e => this.handleInputs(e.target.value, 'company')}
                  />
                </div>
                <div className="income_sub">
                  <p>Amount:</p>
                  <input
                    placeholder="Amount"
                    onChange={e => this.handleInputs(e.target.value, 'amount')}
                  />
                </div>
                <div className="modal_bottom">
                  <div>
                    <form className="expensesinfo_modal_form">
                      <div>
                        <input
                          name="type"
                          type="radio"
                          value="recurring"
                          onClick={() => this.handleType('Recurring')}
                        />{' '}
                        Recurring
                      </div>
                      <div>
                        <input
                          name="type"
                          type="radio"
                          value="nonrecurring"
                          onClick={() => this.handleType('Non-Recurring')}
                        />{' '}
                        Non-Recurring
                      </div>
                    </form>
                    <select
                      required
                      onChange={e =>
                        this.handleInputs(e.target.value, 'category')
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
                  </div>

                  <div className="income_sub">
                    <p className='datep'>Date:</p>

                    <DatePicker
                      date={this.state.date}
                      handleDateChange={this.handleDateChange1}
                    />
                  </div>
                  <h3
                    className="income_btn"
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
                          this.props.getTopExpenses(
                            start(moment()),
                            end(moment())
                          );
                          this.props.getExpenses(start(moment()), end(moment()));
                          this.props.getExpenseTotalsByMonth();
                        })
                    }
                  >
                    Submit
                  </h3>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUsers,
    getGoals,
    updateAmount,
    updateDate,
    updateTitle,
    getDashboard,
    getTopExpenses,
    getExpenseTotalsByMonth,
    getExpenses,
    addExpenses
  }
)(Goals);

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
