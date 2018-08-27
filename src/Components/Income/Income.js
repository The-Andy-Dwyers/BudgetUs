import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import axios from 'axios';

import './Income.css';
import {
  getIncome,
  updateAmount,
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

  submitIncome = e => {
    let { amount, name } = this.props.incomeReducer;
    let { id } = this.props.userReducer;

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

  render() {
    console.log(this.props);
    const { updateAmount, updateName } = this.props;

    const map = this.props.incomeReducer.income.map(e => {
      return (
        <div key={e.id} className='income_map'>
          <p>{e.name}</p>
          <p>{e.amount}</p>
        </div>
      );
    });
    return (
      <div>
        <div className="income">
          <h1 onClick={this.openModal}>Income Input</h1>
        </div>

        <div className="income_display">
          <h2>Income Display</h2>
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
                onChange={e => updateAmount(e.target.value)}
                type="text"
                placeholder="$"
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
    updateName
  }
)(Income);
