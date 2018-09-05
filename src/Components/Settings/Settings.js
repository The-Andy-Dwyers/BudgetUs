import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';

import './Settings.css';
import Setup from '../Setup/Setup';
import { getUser, getTrophy } from '../../ducks/reducers/userReducer';

class Settings extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getTrophy();
    this.addTrophy();
  }

  addTrophy = () => {
    const { id, login } = this.props.userReducer;
    login === 1 &&
      axios
        .post('/api/add-trophy', {
          trophy: 1,
          id
        })
        .then(() => {
          swal({
            position: 'top-end',
            title: 'New Achievement!',
            text: 'Go to settings to view your medals',
            imageUrl: 'https://image.flaticon.com/icons/svg/610/610333.svg',
            imageWidth: 150,
            imageHeight: 225,
            showConfirmButton: false,
            timer: 3000
          });
        });
  };

  render() {
    console.log(this.props);

    const trophyArr = [
      { trophy: 'Created Account', id: 1 },
      { trophy: 'Input 10 expenses', id: 2 },
      { trophy: 'Saved $1,000', id: 3 },
      { trophy: 'Position Balance for 3 months', id: 4 }
    ];

    const map = trophyArr.map(e => {
      return (
        <div className="trophy_map" key={e.id}>
          {this.props.userReducer.login !== 1 ? (
            <div>
              <img
                className="fuzzy_trophy"
                src="https://image.flaticon.com/icons/svg/610/610333.svg"
                alt="Trophy"
              />
              <p className="fuzzy_text">{e.trophy}</p>
            </div>
          ) : (
            <div className="achieved">
              <img
                src="https://image.flaticon.com/icons/svg/610/610333.svg"
                alt="Trophy"
              />
              <p>{e.trophy}</p>
            </div>
          )}
        </div>
      );
    });

    return (
      <div className="settings_main">
        <div className="settings_header">
          <h1>Profile Information</h1>
        </div>
        <Setup />
        <div className="trophy">
          <h2>Achievements</h2>
          <div>{map}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser, getTrophy }
)(Settings);
