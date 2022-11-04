import React from 'react';
import './styles.css'
import { withNavigation } from '../../helpers/hocs';
import { Link } from 'react-router-dom';
import AuthService from '../../service/auth.service';

class VerifyEmailComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: AuthService.getCurrentUser().email
        }
    }

    componentDidMount() {
        AuthService.logout();
    };

    render() {
        return  (
            <div className="VerifyEmailComponent container">
               <div className="row justify-content-center">
                    <div className="col-md-12 col-sm-12">
                        <div className="card shadow-lg border-0 rounded-lg mt-5 mx-auto" style={{width:"30rem"}}>
                            <h3 className="card-header display-1 text-muted text-center">
                                Welcome!
                            </h3>

                            <span className="card-subtitle mb-2 text-muted text-center my-5">
                                This email ({this.state.email}) account has not been verified.
                            </span>

                            <span className="card-subtitle mb-2 text-muted text-center mb-5">
                                Please check your email for a verification link. Or:
                            </span>

                            <div className="card-body mx-auto">
                                <Link to={"/"} className="btn btn-sm btn-primary action text-white">Send a New Link</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNavigation(VerifyEmailComponent);
