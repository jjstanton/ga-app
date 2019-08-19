import React from 'react';
import { AuthUserContext } from '../Session'
import SignOut from "../SignOut/SignOut";

import { Link } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";

import * as ROUTES from '../../constants/routes';

const MenuLogo = () => (
    <div className="side-menu-logo">
        <div className="image-contain">
            <Image src="/img/loadcat.gif" />
        </div>
    </div>
);


class SideMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = { activeItem: ROUTES.DASHBOARD };
    };

    handleItemClick = (e, { name } ) => {
        this.setState({ activeItem: name });
    };

    render() {
        const {activeItem} = this.state;

        return (
            <AuthUserContext.Consumer>
                { (authUser) =>
                    authUser ?
                        <Menu pointing vertical className="side-menu">
                            <MenuLogo/>
                            <Menu.Item as={Link} to={ROUTES.DASHBOARD} name={ROUTES.DASHBOARD} active={activeItem === ROUTES.DASHBOARD} onClick={this.handleItemClick}/>
                            <Menu.Item as={Link} to={ROUTES.ACCOUNT} name={ROUTES.ACCOUNT} active={activeItem === ROUTES.ACCOUNT} onClick={this.handleItemClick} />
                            <Menu.Item as={Link} to={ROUTES.ADMIN} name={ROUTES.ADMIN} active={activeItem === ROUTES.ADMIN} onClick={this.handleItemClick} />
                            <SignOut />
                        </Menu>
                        : null
                }
            </AuthUserContext.Consumer>
        );
    }
}

export default SideMenu;