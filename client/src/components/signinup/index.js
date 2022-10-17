import React from 'react';
import './styles.css'
import RegisterComponent from '../register';
import LoginComponent from '../login';

export default class SignInUpComponent extends React.Component {
    render() {
        return  (
            <div className="SignInUpComponent">
                <ul className="nav nav-tabs" id="signInUpTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="register-tab" data-bs-toggle="tab" data-bs-target="#register" type="button" role="tab" aria-controls="register" aria-selected="true">Register</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="false">Login</button>
                    </li>
                </ul>
                <div className="tab-content" id="signInUpTabContent">
                    <div className="tab-pane fade show active" id="register" role="tabpanel" aria-labelledby="register-tab">
                        <RegisterComponent></RegisterComponent>
                    </div>
                    <div className="tab-pane fade" id="login" role="tabpanel" aria-labelledby="login-tab">
                        <LoginComponent></LoginComponent>
                    </div>
                </div>
            </div>
        );
    }
}

