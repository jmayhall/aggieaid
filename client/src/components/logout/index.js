import React from 'react';
import './styles.css'
import AuthService from '../../service/auth.service';

export default class LogoutComponent extends React.Component {

    async handleClick(e) {
        AuthService.logout();
    }

    render() {
        return  (
            <div className="LogoutComponent">
                 <button type="button" className="btn btn-danger" onClick={this.handleClick}>Logout</button>
            </div>
        );
    }
}