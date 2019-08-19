import React from 'react';
import withAuthorisation from "../Session/withAuthorisation";

class Dashboard extends React.Component{
    render(){
        return(
            <div className="page">
                <div className="ui vertical segment">
                    <div className="ui fluid container">
                        <div className="row">
                            <div className="sixteen  column">
                                <h3 className="ui header">We Make Bananas That Can Dance</h3>
                                <p>Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorisation(condition)(Dashboard);