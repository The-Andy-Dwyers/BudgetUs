import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';

import './Settings.css';
import Setup from '../Setup/Setup';
import { getUser, getTrophy } from '../../ducks/reducers/userReducer';

class Settings extends Component {
  componentDidMount() {
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
    const { trophies } = this.props.userReducer;
    var find1 = trophies.length && trophies.filter(e => e.trophy === 1);
    var find2 = trophies.length && trophies.filter(e => e.trophy === 2);
    var find3 = trophies.length && trophies.filter(e => e.trophy === 3);
    var find4 = trophies.length && trophies.filter(e => e.trophy === 4);   
    

    const trophyArr = [
      { trophy: 'Created Account', id: 1 },
      { trophy: 'Input 10 expenses', id: 2 },
      { trophy: 'Saved your first $1,000', id: 3 },
      { trophy: 'Position Balance for 3 months', id: 4 },
      { trophy: 'Ipsum', id: 5 },
      { trophy: 'Position Balance for 3 months', id: 6 },
      { trophy: 'Adbul is an idiot', id: 7 },
      { trophy: 'Lorem ipsum dolor sit amet.', id: 8 },
      { trophy: 'We are doing a good job', id: 9 },
      { trophy: `It's gonna take alot`, id: 10 },
      { trophy: 'To take me away from you', id: 11 },
      { trophy: '12 days straight', id: 12 },
      { trophy: 'Found sad Jake', id: 13 },
      { trophy: 'I am the one who knocks', id: 14 },
      { trophy: 'Hodor hodor hodor.', id: 15 }
    ];

    
    const map = trophyArr.map(e => {
      return (
        <div className="trophy_map" key={e.id}>
          {(find1 && find1.length && e.id === 1) ||
          (find2 && find2.length && e.id === 2) ||
          (find3 && find3.length && e.id === 3) ||       
          (find4 && find4.length && e.id === 4) ? (
            <div className="achieved">
              <img
                src="https://image.flaticon.com/icons/svg/610/610333.svg"
                alt="Trophy"
              />
              <p>{e.trophy}</p>
            </div>
          ) : (
            <div>
              <img
                className="fuzzy_trophy"
                src="https://image.flaticon.com/icons/svg/610/610333.svg"
                alt="Trophy"
              />
              <p className="fuzzy_text">{e.trophy}</p>
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
