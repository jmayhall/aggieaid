import React from 'react';
import './styles.css'
import AuthService from '../../service/auth.service';
import { withNavigation } from '../../helpers/hocs';

class LogoutComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(e) {
        AuthService.logout();
        this.props.navigate('/');
    }

    render() {
        return  (
            <div className="LogoutComponent">
                <button type="button" className="btn btn-secondary" onClick={this.handleClick}>Logout</button>
            </div>
        );
    }
}

export default withNavigation(LogoutComponent);