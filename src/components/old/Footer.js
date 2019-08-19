import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <div id="Footer" className="ui inverted vertical footer segment">
            <div className="ui container">
                <div className="ui stackable inverted divided equal height stackable grid">
                    <div className="three wide column">
                        <h4 className="ui inverted header">About</h4>
                        <div className="ui inverted link list">
                            <Link to="/" className="item">Dummy</Link>
                            <Link to="/" className="item">Dummy</Link>
                            <Link to="/" className="item">Dummy</Link>
                            <Link to="/" className="item">Dummy</Link>
                        </div>
                    </div>
                    <div className="three wide column">
                        <h4 className="ui inverted header">Services</h4>
                        <div className="ui inverted link list">
                            <Link to="/" className="item">Dummy</Link>
                            <Link to="/" className="item">Dummy</Link>
                            <Link to="/" className="item">Dummy</Link>
                            <Link to="/" className="item">Dummy</Link>
                        </div>
                    </div>
                    <div className="seven wide column">
                        <h4 className="ui inverted header">Footer Header</h4>
                        <p>Dummy</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;