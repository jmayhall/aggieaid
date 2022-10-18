import React from 'react';
import './styles.css';
import AuthService from '../../service/auth.service';

export default class LoginComponent extends React.Component {

    async handleSubmit(e) {
        e.preventDefault();
        const elements = e.target.elements;
        AuthService.login(elements.email.value, elements.password.value)
            .then(() => {
                e.target.reset();
            });
    }
    
    render() {
        return  (
            <div className="LoginComponent">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="emailInput">Email address</label>
                        <input name="email" type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">Please input your email address</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Password</label>
                        <input name="password" type="password" className="form-control" id="passwordInput" aria-describedby="passwordHelp" placeholder="Enter password" />
                        <small id="passwordHelp" className="form-text text-muted">Please input your password</small>
                    </div>
                    <button type="submit" className="btn btn-primary action">Login</button>
                </form>
            </div>
        );
    }
}