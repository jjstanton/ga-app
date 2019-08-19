import React from 'react';
import { Link } from "react-router-dom";
import { Dropdown, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import GoogleAuth from "../old/GoogleAuth";

class UserMenu extends React.Component{
    render(){
        const userImage = this.props.userImage;
        return(
            <Dropdown item className="userMenu" style={{backgroundImage: `url( ${userImage} ) `}}>
                <Dropdown.Menu>
                    <div className="ui celled list">
                        <div className="user-details">
                            <div className="user-image">
                                <Image className="ui avatar image" src={userImage} />
                            </div>
                            <div className="user-content">
                                <div className="user-name">
                                    <p>{ this.props.userName }</p>
                                </div>
                                <div className="user-email">
                                    <p>{ this.props.userEmail }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Dropdown.Divider/>
                    <Link to="/dashboard" className="item">Open</Link>
                    <Link to="/dashboard" className="item">Save...</Link>
                    <Link to="/dashboard" className="item">Edit Permissions</Link>
                    <Dropdown.Divider/>
                    <GoogleAuth />
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.userId,
        userImage: state.auth.userImage,
        userName: state.auth.userName,
        userEmail: state.auth.userEmail
    }
};

export default connect( mapStateToProps ) ( UserMenu );