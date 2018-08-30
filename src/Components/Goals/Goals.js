import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';

import { getDashboard } from '../../ducks/reducers/incomeReducer';

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

class Goals extends Component {
  state = {
    modalIsOpen: false,
    savings: '',
    goal: ''
  };

  componentDidMount() {
    this.getGoal();
  }

  getGoal = () => {
    axios.get('/api/goal').then(res => {
      this.setState({ goal: res.data[0].savings });
    });
  };

  addGoal = () => {
    axios.post('/api/add-goal', {
      savings: this.state.savings
    });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  render() {
    const { expensesum, incomesum } = this.props.incomeReducer.dashboard;
    const remaining = incomesum - expensesum;
    const remainder = remaining - this.state.goal;
    return (
      <div>
        <h3 className="income_input_btn btn" onClick={this.openModal}>
          Monthly Goal
        </h3>

        {remainder > 0 ? (
          <p>
            You've saved a total of ${remaining.toLocaleString()} this month.{' '}
            <br />
            You are ${remainder.toLocaleString()} above from your goal of $
            {this.state.goal.toLocaleString()}!
          </p>
        ) : (
          <p>
            You are ${Math.abs(remainder).toLocaleString()} under your savings
            goal for this month.
            <br />
            Watch your spending!
          </p>
        )}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <h1>Savings Goal!</h1>
          <h3>What is your monthly Goal?</h3>
          <input
            type="text"
            onChange={e => this.setState({ savings: e.target.value })}
          />
          <h3 onClick={() => this.addGoal()}>Submit</h3>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getDashboard }
)(Goals);
