import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from "react";
import RegisterComponent from './components/register';
import LoginComponent from './components/login';
import UsersComponent from './components/users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RegisterComponent></RegisterComponent>
        <UsersComponent></UsersComponent>
        <LoginComponent></LoginComponent>
      </div>
    )
  }
}


export default App;
