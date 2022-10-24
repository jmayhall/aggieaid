import React from 'react';
import './styles.css';
import AuthService from '../../service/auth.service';
import { withNavigation } from '../../helpers/hocs';
import ValidationMessages from '../../constants/validationMessages.constants';
import ValidationPaterns from '../../constants/validationPaterns.constants';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserInputBlur = this.handleUserInputBlur.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.validationTimer = null;

        this.state = {
            isFormValid: false,
            formError: '',
            fields: {
                email: {
                    value: '',
                    displayName: 'Email',
                    valid: undefined,
                    validations: {
                        required: true,
                        email: true
                    }, 
                    errors: [],
                    wasValidated: false
                },
                password: {
                    value: '',
                    displayName: 'Password',
                    valid: undefined,
                    validations: {
                        required: true,
                        password: true
                    }, 
                    errors: [],
                    wasValidated: false
                }
            }
        }

    }

    handleSubmit(e) {
        e.preventDefault();
        const elements = e.target.elements;
        AuthService.login(elements.email.value, elements.password.value)
            .then(res => {
                if(res.ok) {
                    this.props.navigate('/');
                } else {
                    const formError = res.text();
                    console.log(formError);
                    this.setState({formError});
                }
            });
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        const fields = {...this.state.fields}
        const newState = {...fields[name]};
        newState.value = value;
        newState.errors = [];
        newState.valid = undefined;
        newState.wasValidated = false;
        fields[name] = newState;
        this.setState({fields}, ()=> {

            if(!!this.validationTimer) {
                clearTimeout(this.validationTimer);
            }

            this.validationTimer = setTimeout(() => {
                this.validateInput(e.target);
            }, 500);
            
        });
    }

    handleUserInputBlur(e) {
        this.validateInput(e.target);
    }

    validateInput(target) {
        const name = target.name;
        const value = target.value;
        const fields = {...this.state.fields}
        const newState = {...fields[name]};
        newState.wasValidated = true;
        newState.errors = [];

        if(!value.trim().length && newState.validations.required) {
            newState.errors.push(ValidationMessages.REQUIRED)
        }

        if(target.type === "email" && value.length) {
            const ere = ValidationPaterns.VALID_EMAIL;
            if(!ere.test(value)) {
                newState.errors.push(ValidationMessages.VALID_EMAIL)
            }
            
        }

        fields[name] = newState;
        newState.valid = !newState.errors.length;
        const isFormValid = !Object.keys(fields).filter(k => !fields[k].wasValidated || !fields[k].valid).length;
        this.setState({fields, isFormValid});

    }
    
    render() {

        setTimeout(() => {
            const email = document.getElementById('loginEmailInput');
            const password = document.getElementById('loginPasswordInput');
            if (!this.state.isFormValid && email.matches(':-internal-autofill-selected') && password.matches(':-internal-autofill-selected')) {
                const isFormValid = true;
                this.setState({isFormValid})
            }
        }, 500);

        return  (
            <div className="LoginComponent">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit} noValidate>
                <div className={`form-group`}>
                        <label htmlFor="loginEmailInput">Email address</label>
                        <input  name="email" 
                                type="email" 
                                className={`form-control ${this.state.fields.email.wasValidated ? this.state.fields.email.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                id="loginEmailInput" 
                                aria-describedby="loginEmailHelp emailFeedBack" 
                                placeholder="Enter email" 
                                value={this.state.fields.email.value} 
                                onChange={(event) => this.handleUserInput(event)}
                                onBlur={(event) => this.handleUserInputBlur(event)}
                                required
                        />
                        <small id="loginEmailHelp" className={`form-text text-muted ${this.state.fields.email.valid || !this.state.fields.email.wasValidated ? '' : 'd-none'}`}>Please input your email address</small>
                        <div id="emailFeedBack" className="invalid-feedback">
                            {
                                this.state.fields.email.errors.map(m => <li key={m}>{m}</li>)
                            }
                        </div>
                    </div>
                    <div className={`form-group`}>
                        <label htmlFor="loginPasswordInput">Password</label>
                        <input  name="password" 
                                type="password" 
                                className={`form-control ${this.state.fields.password.wasValidated ? this.state.fields.password.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                id="loginPasswordInput" 
                                aria-describedby="passwordHelp passwordFeedBack" 
                                placeholder="Enter password" 
                                value={this.state.fields.password.value} 
                                onChange={(event) => this.handleUserInput(event)}
                                onBlur={(event) => this.handleUserInputBlur(event)}
                                required
                        />
                        <small id="passwordHelp" className={`form-text text-muted ${this.state.fields.password.valid || !this.state.fields.password.wasValidated ? '' : 'd-none'}`}>Please input your password</small>
                        <div id="passwordFeedBack" className="invalid-feedback">
                            {
                                this.state.fields.password.errors.map(m => <li key={m}>{m}</li>)
                            }
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary action" disabled={!this.state.isFormValid}>Log In</button>
                </form>
            </div>
        );
    }
}

export default withNavigation(LoginComponent);