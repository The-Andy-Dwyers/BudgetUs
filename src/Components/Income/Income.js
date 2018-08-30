import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import axios from 'axios';
import ContentEditable from 'react-contenteditable';
import DatePicker from 'react-custom-date-picker';
// import Switch from 'react-switch';

import './Income.css';
import {
  updateAmount,
  updateDate,
  updateTitle,
  getDashboard
} from '../../ducks/reducers/incomeReducer';
import { getUser } from '../../ducks/reducers/userReducer';
import { getExpenses } from '../../ducks/reducers/expensesReducer';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Lato, sans-serif'
  }
};

Modal.setAppElement(document.getElementById('root'));

class Income extends Component {
  state = {
    modalIsOpen: false,
    edit: false,
    incomeTotal: 0,
    month: true
  };

  componentDidMount() {
    this.props.getUser();
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleDateChange = date => {
    this.props.updateDate(date);
  };

  handleKeyDown = e => {
    let { amount, title, date } = this.props.incomeReducer;
    let { id } = this.props.userReducer;

    e.keyCode === 13 &&
      axios
        .post('/api/setup-income', {
          amount,
          title,
          date,
          id
        })
        .then(() => {
          this.closeModal();
        });
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
        this.props.getDashboard(this.props.month ? 'month' : 'year');
        this.closeModal();
      });
  };

  handleDelete = id => {
    axios.delete(`/api/delete-income/${id}`).then(() => {
      this.props.getDashboard(this.props.month ? 'month' : 'year');
      this.setState({ edit: false });
    });
  };

  handleEdit = id => {
    let { amount, title, date } = this.props.incomeReducer;
    var find = this.props.incomeReducer.dashboard.sources.find(
      e => e.id === id
    );
    console.log(find)
    axios
      .put(`/api/edit-income/${id}`, {
        title: title ? title : find.title,
        amount: amount ? amount : find.amount,
        date: date ? date : find.date
      })
      .then(() => {
        this.setState({ edit: false })
          this.props.getDashboard(this.props.month ? 'month' : 'year');
      });
  };

  render() {
    const { updateAmount, updateTitle } = this.props;
    const day = moment().format('MM/DD/YYYY');

    console.log(this.props.incomeReducer.dashboard)

    const map = this.props.incomeReducer.dashboard.sources.map(e => {
      return !this.state.edit ? (
        <div key={e.id} className="income_map">
          <p>{e.title}</p>
          <p>${e.amount.toLocaleString()}</p>
          <p>{moment.utc(e.date).format('ddd, MMM D')}</p>
        </div>
      ) : (
        <div key={e.id} className="income_map">
          <ContentEditable
            className="income_content"
            html={e.title}
            onChange={e => updateTitle(e.target.value)}
          />
          <ContentEditable
            className="income_content"
            html={String(e.amount)}
            onChange={e => updateAmount(e.target.value)}
          />
          <div className="income_map_bottom">
            <DatePicker
              className="income_content"
              date={moment.utc(e.date).format('MM/DD/YYYY')}
              placeholder={moment.utc(e.date).format('MM/DD/YYYY')}
              handleDateChange={this.handleDateChange}
            />
            <div className="income_btn_holder">
              <h3
                className="income_edit btn"
                onClick={id => this.handleEdit(e.id)}
              >
                Submit Edit
              </h3>
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
      <div className="income_container">
        <div className="income">
          <h1 className="income_input_btn btn" onClick={this.openModal}>
            Income Input
          </h1>
          <div className="income_display">
            <div>
              <h2>
                {this.props.userReducer.name}
                's Income
              </h2>
              <h2>Amount</h2>
              <h2>Payday</h2>
            </div>

            {map}

            <div className="income_edit_holder">
              {!this.state.edit && (
                <h3
                  onClick={() => this.setState({ edit: true })}
                  className="income_edit2 btn"
                >
                  Edit
                </h3>
              )}
            </div>
          </div>
          <div className="income_total">
            {this.props.month ? (
              <p>
                Monthly Income Total: $
                {this.props.incomeReducer.dashboard.incomesum.toLocaleString()}
              </p>
            ) : (
              <p>
                {' '}
                Yearly Income Total: $
                {this.props.incomeReducer.dashboard.incomesum.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div className="income_modal">
            <h2>Let's add your Income!</h2>
            <br />
            <div className="income_sub">
              <p>Source:</p>
              <input onChange={e => updateTitle(e.target.value)} type="text" />
            </div>
            <div className="income_sub">
              <p>Amount:</p>
              <input
                onKeyDown={e => this.handleKeyDown(e)}
                onChange={e => updateAmount(e.target.value)}
                type="text"
                placeholder="$"
              />
            </div>
            <div className="income_sub">
              <p>Payday:</p>
              <DatePicker
                date={this.props.incomeReducer.dashboard.sources.date}
                placeholder={day}
                handleDateChange={this.handleDateChange}
              />
            </div>
            <h3 className="income_btn btn" onClick={e => this.submitIncome(e)}>
              Submit
            </h3>
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
    getUser,
    updateAmount,
    updateDate,
    updateTitle,
    getExpenses,
    getDashboard
  }
)(Income);
