import React from 'react';
import './styles.css'
import { Link } from "react-router-dom";
import { ReactComponent as AggieAidLogo } from '../shared/images/aggie-aid-logo.svg';
import LogoutComponent from '../logout';
import AuthService from '../../service/auth.service';

export default class HeaderComponent extends React.Component {

    constructor(props) {
        super(props)
        this.localStorageUpdated = this.localStorageUpdated.bind(this)
        this.state = {
            isLoggedIn: AuthService.isAuthenticated()
        }
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener('storage', this.localStorageUpdated)
        }
    }

    componentWillUnmount(){
        if (typeof window !== 'undefined') {
            window.removeEventListener('storage', this.localStorageUpdated)
        }
    }

    localStorageUpdated(e){
        console.log(e);
        this.setState({
            isLoggedIn: AuthService.isAuthenticated()
        })
    }

    render() {
        const logInOutButton = this.state.isLoggedIn
            ? <LogoutComponent></LogoutComponent>
            : <Link className="btn btn-secondary btn-small navbar-btn" to={"/login"}>Login</Link>;

        return  (
            <nav className="HeaderComponent navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand">
                        <AggieAidLogo className='logo'></AggieAidLogo>
                        AGGIE AID
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/create-event"}>
                                    Create Events
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/find-event"}>
                                    Find Events
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/about-us"}>
                                    About Us
                                </Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item">
                                <form className="d-flex">
                                    <i className="bi bi-search"></i>
                                    <input className="form-control me-2" type="search" placeholder="Find Events" aria-label="Search" />
                                </form>
                            </li>
                            <li className="nav-item">
                                {logInOutButton} 
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}