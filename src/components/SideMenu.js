import React from 'react';
import { Link } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";

class SideMenu extends React.Component{
    state = { activeItem: 'dashboard' };

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    };

    render() {
        const {activeItem} = this.state;

        return (
            <Menu pointing vertical className="side-menu">

                <div className="side-menu-logo">
                    <div className="image-contain">
                        <Image src="/img/loadcat.gif" />
                    </div>
                </div>

                <Menu.Item as={Link} to="/dashboard" name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick}/>
                <Menu.Item as={Link} to="/rules" name='rules' active={activeItem === 'rules'} onClick={this.handleItemClick} />
                <Menu.Item as={Link} to="/rules1" name='rules1' active={activeItem === 'rule1s'} onClick={this.handleItemClick} />
            </Menu>
        );
    }
}

export default SideMenu;