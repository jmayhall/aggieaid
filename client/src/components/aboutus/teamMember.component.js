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
                            <picture>
                                <source srcset={placeholder} type="image/svg+xml" />
                                <img src="..." className="img-fluid img-thumbnail" alt="..." />
                            </picture>
                        </div>
                        <div className='col-9'>
                            <h2>Full Name</h2>
                            <div class="bio">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam felis nunc, interdum ut efficitur vitae, suscipit eu tortor. Phasellus eu sagittis ligula, eu dictum lectus. Nunc vehicula ut massa vitae facilisis. Praesent sagittis lacus sed lacus vulputate, tincidunt auctor eros volutpat. Quisque felis nisi, auctor non dui pharetra, consectetur pretium sapien. Duis sed nisl eu quam facilisis vehicula. Cras at tortor auctor, scelerisque purus et, viverra augue. Pellentesque nulla risus, vulputate id dolor vel, rutrum euismod erat. Nam odio ipsum, tristique nec libero ac, aliquam tincidunt nulla. Integer et varius justo. Nam eget convallis nulla. Sed id aliquam urna, varius fringilla nisl. Donec vel augue vitae magna consectetur lobortis ac eu mauris. Duis consectetur tempor nibh vitae porta.</p>
                            </div>
                            <button className='btn btn-primary action float-end' type="button">Contact Team Member</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}