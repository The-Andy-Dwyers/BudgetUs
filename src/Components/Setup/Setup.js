import React, { Component } from 'react';
import axios from 'axios';

import './Setup.css';

export default class Setup extends Component {
  state = {
    name: '',
    email: ''
  };

  editUser = () => {
    const { name, email } = this.state;
    axios.put('/api/edit-user', {
      name,
      email
    });
  };

  render() {
    return (
      <div className="setup">
        <h1>Welcome to BudgetUs</h1>
        <h2>Let's get started!</h2>
        <input
          type="text"
          placeholder="Tell us your name"
          onChange={e => this.setState({ name: e.target.value })}
        />
        <input
          type="text"
          placeholder="What is your email"
          onChange={e => this.setState({ email: e.target.value })}
        />
        <h3 onClick={() => this.editUser()}>Submit</h3>
      </div>
    );
  }
}
