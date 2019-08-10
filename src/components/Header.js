import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import UserMenu from "./UserMenu";

class Header extends React.Component{

    onSignOutApp = () =>{
        this.props.onSignOutClick();
    };

    RenderMenuItems(){
        const currentPath = this.props.currentPath;

        if( currentPath === '/' ) {
            return(
                <div className="ui inverted vertical center aligned segment" style={{minHeight: '73px'}} />
            );
        } else if (this.props.isSignedIn || this.props.isSignedIn === null) {
            const loadButtons = `ui large secondary inverted pointing menu ${ this.props.isSignedIn === null ? 'buttonDisabled' : '' }`;
            return (
                <div className="ui inverted vertical center aligned segment top-menu-container">
                    <div className="ui fluid container">
                        <div className={ loadButtons }>
                            <Link to="/dashboard" className="active item">Dashboard</Link>
                            <Link to="/rules" className="item">Rules</Link>
                            <Link to="/" className="item">Link 2</Link>
                            <Link to="/" className="item">Link 3</Link>
                            <div className="navigation-right right item">
                                <UserMenu onSignOutHeader={this.onSignOutApp} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render(){
        return(
            <React.Fragment>
                { this.RenderMenuItems() }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  return{
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    currentPath: ownProps.history.location.pathname,
    ownProps: ownProps
  }
};

export default withRouter( connect( mapStateToProps ) ( Header ) );