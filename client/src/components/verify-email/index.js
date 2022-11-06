import React from 'react';
import './styles.css';
import AuthService from '../../service/auth.service';
import { withNavigation } from '../../helpers/hocs';
import ValidationMessages from '../../constants/validationMessages.constants';
import ValidationPaterns from '../../constants/validationPaterns.constants';

class VerifyEmailComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserInputBlur = this.handleUserInputBlur.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.validationTimer = null;

        this.state = {
            isFormValid: false,
            formError: undefined,
            fields: {
                email: {
                    value: AuthService.getCurrentUser().email,
                    displayName: 'Email',
                    valid: true,
                    validations: {
                        required: true,
                        email: true
                    }, 
                    errors: [],
                    wasValidated: true
                },
                verificationCode: {
                    value: undefined,
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

    componentDidMount() {
        AuthService.logout();
    }

    handleSubmit(e) {
        e.preventDefault();
        const elements = e.target.elements;
        AuthService.verifyEmail(elements.email.value, elements.verificationCode.value, elements.password.value)
            .then(res => {
                if(res.ok) {
                    this.setState({formError: undefined}, () => {
                        res.clone().json().then(r => {
                            this.props.navigate(r.enabled ? '/' : '/verify-email');
                        });
                       
                       
                    });
                } else {
                    res.text().then(e => {
                        this.setState({formError: JSON.parse(e).message});
                    });   
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
            <div className="VerifyEmailComponent">

                <div class="card">
                    <h2>Welcome!</h2>

                    <p>This email ({this.state.fields.email.value}) has not been verified.</p>

                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className={`alert alert-danger ${!this.state.formError ? 'd-none' : ''}`} role="alert">
                            {this.state.formError}
                        </div>
                        <div className={`form-group d-none`}>
                            <label htmlFor="verifyEmailEmailInput">Email address</label>
                            <input  hidden
                                    name="email" 
                                    type="email" 
                                    className={`form-control ${this.state.fields.email.wasValidated ? this.state.fields.email.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                    id="verifyEmailEmailInput" 
                                    aria-describedby="verifyEmailEmailHelp emailFeedBack" 
                                    placeholder="Enter email" 
                                    value={this.state.fields.email.value} 
                                    onChange={(event) => this.handleUserInput(event)}
                                    onBlur={(event) => this.handleUserInputBlur(event)}
                                    required
                            />
                            <small id="verifyEmailEmailHelp" className={`form-text text-muted ${this.state.fields.email.valid || !this.state.fields.email.wasValidated ? '' : 'd-none'}`}>Please input your email address</small>
                            <div id="emailFeedBack" className="invalid-feedback">
                                {
                                    this.state.fields.email.errors.map(m => <li key={m}>{m}</li>)
                                }
                            </div>
                        </div>
                        <div className={`form-group my-3`}>
                            <label htmlFor="verifyEmailEmailInput">Email Verification Code</label>
                            <input  name="verificationCode" 
                                    type="text" 
                                    className={`form-control ${this.state.fields.verificationCode.wasValidated ? this.state.fields.verificationCode.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                    id="verifyEmailEmailInput" 
                                    aria-describedby="verifyEmailEmailHelp emailFeedBack" 
                                    placeholder="Enter Verification Code" 
                                    value={this.state.fields.verificationCode.value} 
                                    onChange={(event) => this.handleUserInput(event)}
                                    onBlur={(event) => this.handleUserInputBlur(event)}
                                    required
                            />
                            <small id="verifyEmailEmailHelp" className={`form-text text-muted ${this.state.fields.verificationCode.valid || !this.state.fields.verificationCode.wasValidated ? '' : 'd-none'}`}>Please input the code sent to your email address.</small>
                            <div id="emailFeedBack" className="invalid-feedback">
                                {
                                    this.state.fields.verificationCode.errors.map(m => <li key={m}>{m}</li>)
                                }
                            </div>
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="verifyEmailPasswordInput">Password</label>
                            <input  name="password" 
                                    type="password" 
                                    className={`form-control ${this.state.fields.password.wasValidated ? this.state.fields.password.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                    id="verifyEmailPasswordInput" 
                                    aria-describedby="passwordHelp passwordFeedBack" 
                                    placeholder="Enter password" 
                                    value={this.state.fields.password.value} 
                                    onChange={(event) => this.handleUserInput(event)}
                                    onBlur={(event) => this.handleUserInputBlur(event)}
                                    required
                            />
                            <small id="passwordHelp" className={`form-text text-muted ${this.state.fields.password.valid || !this.state.fields.password.wasValidated ? '' : 'd-none'}`}>Please re-input your password</small>
                            <div id="passwordFeedBack" className="invalid-feedback">
                                {
                                    this.state.fields.password.errors.map(m => <li key={m}>{m}</li>)
                                }
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary action w-100 mt-4" disabled={!this.state.isFormValid}>Verify</button>
                        <button type="submit" className="btn btn-secondary btn-sm d-flex m-auto mt-4">Resend Code</button>
                    </form>
                </div>

            </div>
        );
    }
}

export default withNavigation(VerifyEmailComponent);