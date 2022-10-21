import React from 'react';
import './styles.css'

export default class CreateEventComponent extends React.Component {
    render() {
        return  (
            <div className="CreateEventComponent container px-4 my-5 ">
                <div className="row gx-5 d-flex align-self-stretch">
                    <div className="col-lg d-flex align-self-stretch">
                        <div className="pane p-3 border bg-white align-self-stretch flex-fill">
                            <h2 className='text-center'>Create Event</h2>
                            <form>

                            </form>
                        </div>
                    </div>
                    <div className="col-lg d-flex align-self-stretch">
                        <div className="pane p-3 border bg-white align-self-stretch flex-fill">
                            <h2 className='text-center'>Preview</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}