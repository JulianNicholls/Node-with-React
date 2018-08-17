import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">Emaily 2018</h2>
        </header>
        <a href="/auth/google">Log in with Google</a>
      </div>
    );
  }
}

export default App;
