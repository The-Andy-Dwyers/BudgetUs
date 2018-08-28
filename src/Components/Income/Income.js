import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import axios from 'axios';

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
    modalIsOpen: false
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
  }

  handleKeyDown = e => {
    let { amount, name } = this.props.incomeReducer;
    let { id } = this.props.userReducer;

    e.keyCode === 13 &&
      axios
        .post('/api/setup-income', {
          amount,
          name,
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
        this.closeModal();
      });
  };

  handleDelete = id => {
    axios.delete(`/api/delete-income/${id}`).then(() => {
      this.props.getIncome();
    });
  };

  render() {
    const { updateAmount, updateName, updatePayday } = this.props;

    const map = this.props.incomeReducer.income.map(e => {
        return (
          <div key={e.id} className="income_map">
            <p>{e.name}</p>
            <p>{e.amount}</p>
            <p>{moment.utc(e.payday).format('ddd, MMM D')}</p>
            <button
              className="income_del"
              onClick={id => this.handleDelete(e.id)}
            >
              Remove
            </button>
          </div>
        );
    });
    return (
      <div>
        <div className="income">
          <h1 onClick={this.openModal}>Income Input</h1>
        </div>

        <div className="income_display">
          <h2>
            {this.props.userReducer.name}
            's Income
          </h2>
          {map}
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
              <input
                onChange={e => updatePayday(e.target.value)}
                type="text"
              />
            </div>
            <h3 className="income_btn" onClick={e => this.submitIncome(e)}>
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
