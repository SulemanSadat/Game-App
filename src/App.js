import React, { Component } from 'react';

import Games from './components/games';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  render() { 
    return (
        <main className='container'>
          <Games/>
        </main>
    );
  }
}
 