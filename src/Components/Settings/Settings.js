import React, { Component } from 'react';

import './Settings.css';
import Setup from '../Setup/Setup';

export default class Settings extends Component {
  render() {
    return (
      <div className="settings_main">
        <div className="settings_header" />
        <Setup />
      </div>
    );
  }
}
