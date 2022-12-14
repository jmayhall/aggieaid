import './App.css';
import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import HomeComponent from './components/home';
import SignInUpComponent from './components/signinup';
import HeaderComponent from './components/header';
import CreateEventComponent from './components/create-event';
import FindEventComponent from './components/find-event';
import AboutUsComponent from './components/aboutus';
import RequireAuth from './components/require-auth';
import AuthService from './service/auth.service';
import ErrorComponent from './components/error'
import VerifyEmailComponent from './components/verify-email';

class App extends Component {

  componentDidMount() {
    if(!AuthService.isAuthenticated() && !!AuthService.getCurrentUser()) {
      console.log(AuthService.getCurrentUser());
      AuthService.logout();
    }
  }

  render() {
    return (
      <div className="App">
        <HeaderComponent></HeaderComponent>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/login" element={<SignInUpComponent activeTab='login' />} />
          <Route path="/register" element={<SignInUpComponent activeTab='register' />} />
          <Route path="/create-event" element={
            <RequireAuth>
              <CreateEventComponent />
            </RequireAuth>
          } />
          <Route path="/find-event" element={<FindEventComponent />} />
          <Route path="/about-us" element={<AboutUsComponent />} />
          <Route path="/verify-email" element={
            <RequireAuth>
              <VerifyEmailComponent />
            </RequireAuth>
          } />
          <Route path="*" element={<ErrorComponent errorCode="404" errorMessage="The page you are looking for is not found." />} />
        </Routes>
      </div>
    )
  }
}


export default App;
