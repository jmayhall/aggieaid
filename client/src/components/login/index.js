import React from 'react';
import './styles.css';
import AuthService from '../../service/auth.service';
import { withNavigation } from '../../helpers/hocs';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        console.log(LoginComponent);
        e.preventDefault();
        const elements = e.target.elements;
        AuthService.login(elements.email.value, elements.password.value)
            .then(() => {
                this.props.navigate('/');
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

export default withNavigation(LoginComponent);