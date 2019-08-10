import React from 'react';
import { Link } from "react-router-dom";
import { Dropdown, Item } from 'semantic-ui-react'
import { connect } from 'react-redux';

class UserMenu extends React.Component{

    onSignOutUserMenu = () =>{
        this.props.onSignOutHeader();
    };

    renderUserMenu(){
        if(this.props.isSignedIn) {
            const userImage = this.props.userImage;
            return (
                <Dropdown item className="userMenu" style={{backgroundImage: `url( ${userImage} ) `}}>
                    <Dropdown.Menu>
                        <Item.Group link>
                            <Item>
                                <Item.Image size='tiny' src={ this.props.userImage } />
                                <Item.Content>
                                    <Item.Header>{ this.props.userName }</Item.Header>
                                    <Item.Description>{ this.props.userEmail }</Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                        <Dropdown.Divider/>
                        <Link to="/dashboard" className="item">Open</Link>
                        <Link to="/dashboard" className="item">Save...</Link>
                        <Link to="/dashboard" className="item">Edit Permissions</Link>
                        <Dropdown.Divider/>
                        <div onClick={this.onSignOutUserMenu} className='item'>
                            Sign Out
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            );
        } else if (this.props.isSignedIn === null){
            return(
                <Dropdown openOnFocus item className="userMenu" >
                </Dropdown>
            );
        } else {
            return null;
        }
    }

    render(){
        return(
            <React.Fragment>
                { this.renderUserMenu() }
            </React.Fragment>
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