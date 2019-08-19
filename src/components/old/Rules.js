import React from 'react';
import { connect } from 'react-redux';

class Rules extends React.Component{
    render(){
        return(
            <div className="page">
                <div key={ this.props.ownProps.location.pathname } className="ui vertical segment">
                    <div className="ui fluid container">
                        <div className="row">
                            <div className="eight wide column">
                                <h3 className="ui header">asdasd</h3>
                                <p>Blah Blah blah.</p>
                                <h3 className="ui header">asdsd</h3>
                                <p>adadd</p>
                            </div>
                            <div className="six wide right floated column">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        ownProps: ownProps,
        state: state
    }
};

export default connect( mapStateToProps )( Rules );