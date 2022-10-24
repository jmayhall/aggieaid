import React from 'react';
import './styles.css'
//import AuthService from '../../service/auth.service';
import { withNavigation } from '../../helpers/hocs';
import ValidationMessages from '../../constants/validationMessages.constants';
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";


class CreateEventComponent extends React.Component {

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
                title: {
                    value: '',
                    displayName: 'Title',
                    valid: undefined,
                    validations: {
                        required: true,
                        minLength: 3,
                        maxLength: 75
                    }, 
                    errors: [],
                    wasValidated: false
                },
                date: {
                    value: Date.now(),
                    displayName: 'Date',
                    valid: undefined,
                    validations: {
                        required: true,
                        date: true
                    }, 
                    errors: [],
                    wasValidated: false
                }
            }
        }

    }

    handleSubmit(e) {
        e.preventDefault();
        // const elements = e.target.elements;
        // AuthService.login(elements.title.value, elements.password.value)
        //     .then(res => {
        //         if(res.ok) {
        //             this.setState({formError: undefined}, () => {
        //                 this.props.navigate('/');
        //             });
        //         } else {
        //             res.text().then(e => {
        //                 this.setState({formError: JSON.parse(e).message});
        //             });   
        //         }
        //     });
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

        if(value.length && value.length < newState.validations.minLength) {
            newState.errors.push(ValidationMessages.MIN_LENGTH.format(newState.validations.minLength))
        }

        if(value.length > newState.validations.maxLength) {
            newState.errors.push(ValidationMessages.MAX_LENGTH.format(newState.validations.maxLength))
        }

        fields[name] = newState;
        newState.valid = !newState.errors.length;
        const isFormValid = !Object.keys(fields).filter(k => !fields[k].wasValidated || !fields[k].valid).length;
        this.setState({fields, isFormValid});

    }

    render() {
        return  (
            <div className="CreateEventComponent container px-4 my-5 ">
                <div className="row gx-5 d-flex align-self-stretch">
                    <div className="col-lg d-flex align-self-stretch">
                        <div className="pane p-3 border bg-white align-self-stretch flex-fill">
                            <h2 className='text-center'>Create Event</h2>
                            <form onSubmit={this.handleSubmit} noValidate>
                                <div className={`alert alert-danger ${!this.state.formError ? 'd-none' : ''}`} role="alert">
                                    {this.state.formError}
                                </div>

                                <div className={`form-group`}>
                                    <label htmlFor="titleInput">Title</label>
                                    <input  name="title" 
                                            type="text" 
                                            className={`form-control ${this.state.fields.title.wasValidated ? this.state.fields.title.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                            id="titleInput" 
                                            aria-describedby="titleHelp titleFeedBack" 
                                            placeholder="Enter title" 
                                            value={this.state.fields.title.value} 
                                            onChange={(event) => this.handleUserInput(event)}
                                            onBlur={(event) => this.handleUserInputBlur(event)}
                                            required
                                    />
                                    <small id="titleHelp" className={`form-text text-muted ${this.state.fields.title.valid || !this.state.fields.title.wasValidated ? '' : 'd-none'}`}>Please input the Event's Title</small>
                                    <div id="titleFeedBack" className="invalid-feedback">
                                        {
                                            this.state.fields.title.errors.map(m => <li key={m}>{m}</li>)
                                        }
                                    </div>
                                </div>

                                <DatePicker
                                    selected={this.state.fields.date.value}
                                    onChange={(date) => {
                                            const fields = {...this.state.fields};
                                            fields.date.value = date;
                                            this.setState({fields})
                                        }
                                    }
                                    inline
                                />
                            </form>
                        </div>
                    </div>
                    <div className="col-lg d-flex align-self-stretch">
                        <div className="pane p-3 border bg-white align-self-stretch flex-fill">
                            <h2 className='text-center'>Preview</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNavigation(CreateEventComponent);