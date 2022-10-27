import React from 'react';
import './styles.css'
import AuthService from '../../service/auth.service';
import { withNavigation } from '../../helpers/hocs';
import ValidationMessages from '../../constants/validationMessages.constants';
import ValidationPaterns from '../../constants/validationPaterns.constants';

class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserInputBlur = this.handleUserInputBlur.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.validationTimer = null;

        this.state = {
            isFormValid: false,
            fields: {
                name: {
                    value: '',
                    displayName: 'Name',
                    valid: undefined,                
                    validations: {
                        minLength: 3,
                        maxLength: 50,
                        required: true
                    },
                    errors: [],
                    wasValidated: false
                },
                email:  {
                    value: '',
                    displayName: 'Email',
                    valid: undefined,                
                    validations: {
                        minLength: 0,
                        maxLength: 25,
                        required: true,
                        email: true
                    },
                    errors: [],
                    wasValidated: false
                },
                password:  {
                    value: '',
                    displayName: 'Password',
                    valid: undefined,                
                    validations: {
                        minLength: 8,
                        maxLength: 50,
                        required: true
                    },
                    errors: [],
                    wasValidated: false
                },
                confirmEmail:  {
                    value: '',
                    displayName: 'Email Confirmation',
                    valid: undefined,                
                    validations: {
                        reqired: true,
                        minLength: 0,
                        maxLength: 25,
                        match: 'email'
                    },
                    errors: [],
                    wasValidated: false
                },
                confirmPassword:  {
                    value: '',
                    displayName: 'Password Confirmation',
                    valid: undefined,    
                    validations: {
                        required: true,
                        minLength: 8,
                        maxLength: 50,
                        match: 'password'
                    },
                    errors: [],
                    wasValidated: false
                }
            }
            
        }

    }

    async handleSubmit(e) {
        e.preventDefault();
        const elements = e.target.elements;
        AuthService.register(
            elements.name.value, 
            elements.email.value, 
            elements.password.value
        ).then(res => {
            console.log(res);
            if(res.ok) {
                const fields = {...this.state.fields};
                Object.keys(fields).forEach(k => {
                    fields[k].value = '';
                    fields[k].valid = undefined;
                    fields[k].wasValidated = false;
                });
                this.setState({
                    isFormValid: false,
                    fields: fields
                }, () => {
                    this.props.navigate('/login');
                });
                
            } else {
                const formError = res;
                console.log(formError);
                this.setState({formError});
            }
        });       
    }

    handleUserInput (e) {
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

    handleUserInputBlur (e) {
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

        if(value.length && value.length < newState.validations.minLength) {
            newState.errors.push(ValidationMessages.MIN_LENGTH.format(newState.validations.minLength))
        }

        if(value.length > newState.validations.maxLength) {
            newState.errors.push(ValidationMessages.MAX_LENGTH.format(newState.validations.maxLength))
        }

        if(target.type === "email" && value.length) {
            const ere = ValidationPaterns.VALID_EMAIL;
            if(!ere.test(value)) {
                newState.errors.push(ValidationMessages.VALID_EMAIL)
            }
            
        }

        if(target.type === "password" && !!value.trim().length) {
            const pre = ValidationPaterns.VALID_PASSWORD;
            if(!pre.test(value)) {
                newState.errors.push(ValidationMessages.VALID_PASSWORD)
            }
        }

        if(!!newState.validations.match) {
            const matchState = this.state.fields[newState.validations.match];
            if(matchState.value !== newState.value) {
                newState.errors.push(ValidationMessages.MATCH_VIOLATION.format(newState.displayName, matchState.displayName))
            }
        }

        fields[name] = newState;
        newState.valid = !newState.errors.length;
        const isFormValid = !Object.keys(fields).filter(k => !fields[k].wasValidated || !fields[k].valid).length;
        this.setState({fields, isFormValid});

    }

    render() {
        return  (
            <div className="RegisterComponent">
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className={`form-group`}>
                        <label htmlFor="registerNameInput">Full Name</label>
                        <input  name="name" 
                                type="text" 
                                className={`form-control ${this.state.fields.name.wasValidated ? this.state.fields.name.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                id="registerNameInput" 
                                aria-describedby="registerNameHelp nameFeedBack" 
                                placeholder="Enter Full Name" 
                                value={this.state.fields.name.value} 
                                onChange={(event) => this.handleUserInput(event)}
                                onBlur={(event) => this.handleUserInputBlur(event)}
                                required
                        />
                        <small id="registerNameHelp" className={`form-text text-muted ${this.state.fields.name.valid || !this.state.fields.name.wasValidated ? '' : 'd-none'}`}>Please input your full name</small>
                        <div id="nameFeedBack" className="invalid-feedback">
                            {
                                this.state.fields.name.errors.map(m => <li key={m}>{m}</li>)
                            }
                        </div>
                    </div>
                    <div className={`form-group`}>
                        <label htmlFor="registerEmailInput">Email address</label>
                        <input  name="email" 
                                type="email" 
                                className={`form-control ${this.state.fields.email.wasValidated ? this.state.fields.email.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                id="registerEmailInput" 
                                aria-describedby="registerEmailHelp emailFeedBack" 
                                placeholder="Enter email" 
                                value={this.state.fields.email.value} 
                                onChange={(event) => this.handleUserInput(event)}
                                onBlur={(event) => this.handleUserInputBlur(event)}
                                required
                        />
                        <small id="registerEmailHelp" className={`form-text text-muted ${this.state.fields.email.valid || !this.state.fields.email.wasValidated ? '' : 'd-none'}`}>Please input your email address</small>
                        <div id="emailFeedBack" className="invalid-feedback">
                            {
                                this.state.fields.email.errors.map(m => <li key={m}>{m}</li>)
                            }
                        </div>
                    </div>
                    <div className={`form-group`}>
                        <label htmlFor="confirmRegisterEmailInput">Confirm Email address</label>
                        <input  name="confirmEmail" 
                                type="email" 
                                className={`form-control ${this.state.fields.confirmEmail.wasValidated ? this.state.fields.confirmEmail.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                id="confirmRegisterEmailInput" 
                                aria-describedby="confirmRegisterEmailHelp confirmEmailFeedBack" 
                                placeholder="Confirm email" 
                                value={this.state.fields.confirmEmail.value} 
                                onChange={(event) => this.handleUserInput(event)}
                                onBlur={(event) => this.handleUserInputBlur(event)}
                                required
                        />
                        <small id="confirmRegisterEmailHelp" className={`form-text text-muted ${this.state.fields.confirmEmail.valid || !this.state.fields.confirmEmail.wasValidated ? '' : 'd-none'}`}>Please confirm your email address</small>
                        <div id="confirmEmailFeedBack" className="invalid-feedback">
                            {
                                this.state.fields.confirmEmail.errors.map(m => <li key={m}>{m}</li>)
                            }
                        </div>
                    </div>
                    <div className={`form-group`}>
                        <label htmlFor="registerPasswordInput">Password</label>
                        <input  name="password" 
                                type="password" 
                                className={`form-control ${this.state.fields.password.wasValidated ? this.state.fields.password.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                id="registerPasswordInput" 
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
                    <div className={`form-group`}>
                        <label htmlFor="confirmPasswordInput">Confirm Password</label>
                        <input  name="confirmPassword" 
                                type="password" 
                                className={`form-control ${this.state.fields.confirmPassword.wasValidated ? this.state.fields.confirmPassword.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                id="confirmPasswordInput" 
                                aria-describedby="confirmPasswordHelp confirmPasswordFeedBack" 
                                placeholder="Confirm password" 
                                value={this.state.fields.confirmPassword.value}
                                onChange={(event) => this.handleUserInput(event)}
                                onBlur={(event) => this.handleUserInputBlur(event)}
                                required
                        />
                        <small id="confirmPasswordHelp" className={`form-text text-muted ${this.state.fields.confirmPassword.valid || !this.state.fields.confirmPassword.wasValidated ? '' : 'd-none'}`}>Please confirm your password</small>
                        <div id="confirmPasswordFeedBack" className="invalid-feedback">
                            {
                                this.state.fields.confirmPassword.errors.map(m => <li key={m}>{m}</li>)
                            }
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary action" disabled={!this.state.isFormValid}>Create</button>
                </form>
            </div>
        );
    }
}

export default withNavigation(RegisterComponent);