import React from 'react';
import './styles.css'
import ApiService from '../../service/api.service';
import APIPaths from '../../constants/apipath.constants';

export default class RegisterComponent extends React.Component {

    async handleClick(e) {
        ApiService.get(APIPaths.USERS).then(r => {
            r.json().then(u => {
                console.log(u);
            })
        });
    }

    render() {
        return  (
            <div className="UsersComponent">
                 <button type="button" className="btn btn-primary" onClick={this.handleClick}>Test Get Users</button>
            </div>
        );
    }
}