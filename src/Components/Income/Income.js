import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import axios from 'axios';
import ContentEditable from 'react-contenteditable';
import DatePicker from 'react-custom-date-picker';

import './Income.css';
import {
  getIncome,
  updateAmount,
  updatePayday,
  updateName
} from '../../ducks/reducers/incomeReducer';
import { getUser } from '../../ducks/reducers/userReducer';

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

class Income extends Component {
  state = {
    modalIsOpen: false,
    edit: false,
    incomeTotal: 0
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  componentDidMount() {
    this.props.getIncome();
    this.props.getUser();
    this.incomeSum();
  }

  incomeSum = () => {
    axios.get('/api/income-sum').then(res => {
      this.setState({ incomeTotal: res.data[0]['sum'] });
    });
  };

  handleDateChange = date => {
    this.props.updatePayday(date);
  };

  handleKeyDown = e => {
    let { amount, name, payday } = this.props.incomeReducer;
    let { id } = this.props.userReducer;

    e.keyCode === 13 &&
      axios
        .post('/api/setup-income', {
          amount,
          name,
          payday,
          id
        })
        .then(() => {
          this.props.getIncome();
          this.closeModal();
        });
  };

  submitIncome = e => {
    let { amount, name, payday } = this.props.incomeReducer;
    let { id } = this.props.userReducer;

    axios
      .post('/api/setup-income', {
        amount,
        name,
        payday,
        id
      })
      .then(() => {
        this.props.getIncome();
        this.incomeSum();
        this.closeModal();
      });
  };

  handleDelete = id => {
    axios.delete(`/api/delete-income/${id}`).then(() => {
      this.props.getIncome();
      this.incomeSum();
      this.setState({ edit: false });
    });
  };

  handleEdit = id => {
    let { amount, name, payday } = this.props.incomeReducer;
    var find = this.props.incomeReducer.income.find(e => e.id === id);

    axios
      .put(`/api/edit-income/${id}`, {
        name: name === '' ? find.name : name,
        amount: amount === '' ? find.amount : amount,
        payday: payday === '' ? find.payday : payday
      })
      .then(() => {
        this.props.getIncome();
        this.incomeSum();
        this.setState({ edit: false });
      });
  };

  render() {
    const { updateAmount, updateName, updatePayday } = this.props;
    const day = moment().format('MM/DD/YYYY');

    const map = this.props.incomeReducer.income.map(e => {
      return !this.state.edit ? (
        <div key={e.id} className="income_map">
          <p>{e.name}</p>
          <p>{e.amount}</p>
          <p>{moment.utc(e.payday).format('ddd, MMM D')}</p>
          <h3 onClick={() => this.setState({ edit: true })} className="income_edit btn">
            Edit
          </h3>
        </div>
      ) : (
        <div key={e.id} className="income_map">
          <ContentEditable
            html={e.name}
            onChange={e => updateName(e.target.value)}
          />

          <ContentEditable
            html={String(e.amount)}
            onChange={e => updateAmount(e.target.value)}
          />
          <DatePicker
            date={moment.utc(e.payday).format('MM/DD/YYYY')}
            placeholder={moment.utc(e.payday).format('MM/DD/YYYY')}
            handleDateChange={this.handleDateChange}
          />
          <h3
            className="income_del btn"
            onClick={id => this.handleDelete(e.id)}
          >
            Remove
          </h3>
          <h3 className='income_edit btn'onClick={id => this.handleEdit(e.id)}>Submit Edit</h3>
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
          </div>
          <div className='income_total'>
            <p>Income Total: {+this.state.incomeTotal}</p>
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
              <input onChange={e => updateName(e.target.value)} type="text" />
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
                date={this.props.incomeReducer.date}
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
    getIncome,
    updateAmount,
    updatePayday,
    updateName
  }
)(Income);
