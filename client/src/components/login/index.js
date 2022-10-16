import React from 'react';
import './styles.css';

export default class LoginComponent extends React.Component {

    async handleSubmit(e) {
        e.preventDefault();
        const elements = e.target.elements;
        const reqObj = {
            email: elements.email.value,
            password:  window.btoa(elements.password.value)
        }
        try {
            const response = await fetch("http://localhost:8081/api/auth/login", {
                method: 'POST',
                body: JSON.stringify(reqObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseText = await response.text();
            console.log(responseText);
            e.target.reset();
        } catch (ex) {
            console.error("POST error!");
        }
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
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}