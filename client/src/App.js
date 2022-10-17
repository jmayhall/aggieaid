import './App.css';
import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import HomeComponent from './components/home';
import SignInUpComponent from './components/signinup';
import HeaderComponent from './components/header';
import CreateEventComponent from './components/create-event';
import FindEventComponent from './components/find-event';
import AboutUsComponent from './components/aboutus';

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
          <Route path="/create-event" element={<CreateEventComponent />} />
          <Route path="/find-event" element={<FindEventComponent />} />
          <Route path="/about-us" element={<AboutUsComponent />} />
        </Routes>
      </div>
    )
  }
}


export default App;
