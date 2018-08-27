import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import store from './ducks/store';
import Navbar from './Components/Navbar/Navbar';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {typeof window !== `undefined` &&
              window.location.pathname !== '/' && <Navbar />}
            {routes}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
