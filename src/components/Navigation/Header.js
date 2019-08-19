import React from 'react';
import { AuthUserContext } from '../Session';

const Header = () => (
    <AuthUserContext.Consumer>
        { authUser =>
            authUser ? <HeaderAuth /> : <HeaderNonAuth />
        }
    </AuthUserContext.Consumer>
);

const HeaderAuth = () => (
    <div className="ui inverted vertical center aligned segment top-menu-container">
        <div className="ui fluid container">
            <div className="ui large secondary inverted pointing menu">
                {/*<Link to={ROUTES.DASHBOARD} className="active item">Dashboard</Link>*/}
                {/*<Link to={ROUTES.ACCOUNT} className="item">Account</Link>*/}
                {/*<Link to={ROUTES.ADMIN} className="item">Admin</Link>*/}
            </div>
        </div>
    </div>
);

const HeaderNonAuth = () => (
    <div className="ui inverted vertical center aligned segment" style={{minHeight: '71px'}}>
        <div className="ui fluid container center aligned">
            <div className="ui large secondary inverted pointing  center aligned menu">
                <div style={{margin: 'auto', width: '300px' }}>
                    {/*<Link to={ROUTES.LANDING} className="item" style={{display: 'inline-block'}}>Login</Link>*/}
                    {/*<Link to={ROUTES.SIGN_UP} className="item" style={{display: 'inline-block'}}>Sign Up</Link>*/}
                </div>
            </div>
        </div>
    </div>
);

export default Header;