import React from 'react';
import './styles.css'
import AuthService from '../../service/auth.service';
import { withNavigation } from '../../helpers/hocs';

class UserContextComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick(e) {
        AuthService.logout();
        this.props.navigate('/');
    }

    render() {
        return  (
            <div className="UserContextComponent dropdown">
                <span className="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person-circle"></i>
                </span>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                    <li><span  role="button" className="dropdown-item">My Profile</span></li>
                    <li><span  role="button" className="dropdown-item" onClick={this.handleLogoutClick}>Logout</span></li>
                </ul>
            </div>
        );
    }
}

export default withNavigation(UserContextComponent);

