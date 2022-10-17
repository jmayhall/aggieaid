import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css';
import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import HomeComponent from './components/home';
import SignInUpComponent from './components/signinup';
import HeaderComponent from './components/header';

class App extends Component {
  render() {
    return (
      <div className="App">

        <HeaderComponent></HeaderComponent>

        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/login" element={<SignInUpComponent />} />
          <Route path="/register" element={<SignInUpComponent />} />
        </Routes>
      </div>
    )
  }
}


export default App;
