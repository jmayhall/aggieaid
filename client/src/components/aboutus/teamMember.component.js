import React from 'react';
import './styles.css'
import placeholder from '../shared/images/placeholder.svg';

export default class TeamMemberComponent extends React.Component {
    render() {
        return  (
            <div className="TeamMemberComponent p-4 p-md-5">
                <div className='container'>
                    <div className='row'>
                        <div className='col-3'>
                            <img src={this.props.portrait || placeholder} className="img-fluid img-thumbnail" alt="..." />
                        </div>
                        <div className='col-9'>
                            <h2>{this.props.fullName || "Full Name"}</h2>
                            <div className="bio">
                                <p>{this.props.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam felis nunc, interdum ut efficitur vitae, suscipit eu tortor. Phasellus eu sagittis ligula, eu dictum lectus. Nunc vehicula ut massa vitae facilisis. Praesent sagittis lacus sed lacus vulputate, tincidunt auctor eros volutpat. Quisque felis nisi, auctor non dui pharetra, consectetur pretium sapien. Duis sed nisl eu quam facilisis vehicula. Cras at tortor auctor, scelerisque purus et, viverra augue. Pellentesque nulla risus, vulputate id dolor vel, rutrum euismod erat. Nam odio ipsum, tristique nec libero ac, aliquam tincidunt nulla. Integer et varius justo. Nam eget convallis nulla. Sed id aliquam urna, varius fringilla nisl. Donec vel augue vitae magna consectetur lobortis ac eu mauris. Duis consectetur tempor nibh vitae porta."}</p>
                            </div>
                            <a className='btn btn-primary action float-end' href={('mailto:') + (this.props.email || "teamMember@email.com")}>Contact {this.props.fullName || "Team Member"}</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}