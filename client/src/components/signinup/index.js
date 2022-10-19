import React from 'react';
import './styles.css'
import RegisterComponent from '../register';
import LoginComponent from '../login';
import { withSearchParams } from '../../helpers/hocs';


 class SignInUpComponent extends React.Component {

    constructor(props) {
        super(props);
        this.isActive = this.isActive.bind(this);
    }

    isActive(tabName) {
        return this.props.activeTab === tabName
    }

    render() {
        return  (
            <div className="SignInUpComponent">
                <ul className="nav nav-tabs" id="signInUpTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link ${this.isActive('register')?'active':''}`} id="register-tab" data-bs-toggle="tab" data-bs-target="#register" type="button" role="tab" aria-controls="register" aria-selected="true">Register</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link ${this.isActive('login')?'active':''}`} id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="false">Login</button>
                    </li>
                </ul>
                <div className="tab-content" id="signInUpTabContent">
                    <div className={`tab-pane fade ${this.isActive('register')?'show active':''}`} id="register" role="tabpanel" aria-labelledby="register-tab">
                        <RegisterComponent></RegisterComponent>
                    </div>
                    <div className={`tab-pane fade ${this.isActive('login')?'show active':''}`} id="login" role="tabpanel" aria-labelledby="login-tab">
                        <LoginComponent></LoginComponent>
                    </div>
                </div>
            </div>
        );
    }
}

export default withSearchParams(SignInUpComponent);

