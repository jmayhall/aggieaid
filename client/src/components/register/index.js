import React from 'react';
import './styles.css'
import bcrypt from 'bcryptjs'

export default class RegisterComponent extends React.Component {

    async handleSubmit(e) {
        e.preventDefault();
        const elements = e.target.elements;
        const reqObj = {
            name: elements.name.value,
            email: elements.email.value,
            emailConfirm: elements.confirmEmail.value,
            password: bcrypt.hashSync(elements.password.value),
            confirmPassword: bcrypt.hashSync(elements.confirmPassword.value)
        }
        const requestJson = JSON.stringify(reqObj);
        console.log(requestJson);
        try {
            const response = await fetch("http://localhost:8081/api/auth/register", {
                method: "POST",
                body: requestJson,
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
            <div className="RegisterComponent">
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="registerNameInput">Full Name</label>
                        <input name="name" type="text" className="form-control" id="registerNameInput" aria-describedby="registerNameHelp" placeholder="Enter Full Name" />
                        <small id="registerNameHelp" className="form-text text-muted">Please input your full name</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerEmailInput">Email address</label>
                        <input name="email" type="email" className="form-control" id="registerEmailInput" aria-describedby="registerEmailHelp" placeholder="Enter email" />
                        <small id="registerEmailHelp" className="form-text text-muted">Please input your email address</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmRegisterEmailInput">Confirm Email address</label>
                        <input name="confirmEmail" type="email" className="form-control" id="confirmRegisterEmailInput" aria-describedby="confirmRegisterEmailHelp" placeholder="Confirm email" />
                        <small id="confirmRegisterEmailHelp" className="form-text text-muted">Please confirm your email address</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerPasswordInput">Password</label>
                        <input name="password" type="password" className="form-control" id="registerPasswordInput" aria-describedby="passwordHelp" placeholder="Enter password" />
                        <small id="passwordHelp" className="form-text text-muted">Please input your password</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPasswordInput">Confirm Password</label>
                        <input name="confirmPassword" type="password" className="form-control" id="confirmPasswordInput" aria-describedby="confirmPasswordHelp" placeholder="Confirm password" />
                        <small id="confirmPasswordHelp" className="form-text text-muted">Please confirm your password</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>
        );
    }
}