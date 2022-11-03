import React from 'react';
import './styles.css'
import { withNavigation } from '../../helpers/hocs';
import { Link } from 'react-router-dom';

class ErrorComponent extends React.Component {
    render() {
        return  (
            <div className="ErrorComponent container">
               <div className="row justify-content-center">
                    <div className="col-md-12 col-sm-12">
                        <div className="card shadow-lg border-0 rounded-lg mt-5 mx-auto" style={{width:"30rem"}}>
                            <h3 className="card-header display-1 text-muted text-center">
                                {this.props.errorCode || "UKNOWN ERROR"}
                            </h3>

                            <span className="card-subtitle mb-2 text-muted text-center">
                                {this.props.errorMessage || "Something has gone wrong."}
                            </span>

                            <div className="card-body mx-auto">
                                <Link to={"/"} className="btn btn-sm btn-danger text-white">Back To Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNavigation(ErrorComponent);
