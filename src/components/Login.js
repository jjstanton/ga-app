import React from 'react';
import { Link } from 'react-router-dom';
import { signIn, signOut } from "../actions";
import { connect } from 'react-redux';

class Login extends React.Component{

    signInEventClick(e) {
        e.preventDefault();
        this.props.signInEvent();
    }

    render(){
        return(
            <div id="loginForm" className="ui vertical stripe segment">

                <div className="ui middle aligned center aligned grid">
                    <div className="column">
                        <h2 className="ui teal image header">
                            <div className="content">
                                Log-in to your account
                            </div>
                        </h2>
                        <form className="ui large form">
                            <div className="ui stacked segment">
                                <div className="field">
                                    <div className="ui left icon input">
                                        <i className="user icon" />
                                        <input type="text" name="email" placeholder="E-mail address" />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui left icon input">
                                        <i className="lock icon" />
                                        <input type="password" name="password" placeholder="Password" />
                                    </div>
                                </div>
                                <button onClick={(e) => this.signInEventClick(e)} className='ui large fluid blue google button'>
                                    <i className='google icon' />
                                    Sign In with Google
                                </button>
                            </div>
                            <div className="ui error message" />
                        </form>

                        <div className="ui message">
                            New to us? <Link to='/' >Sign Up</Link>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        isSignedIn: state.auth.isSignedIn,
        ownProps: ownProps
    }
};

export default connect( mapStateToProps, { signIn, signOut } )( Login );