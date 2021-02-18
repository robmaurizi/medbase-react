import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

const Header = (props) => {

    const { authenticated } = props;

    const handleSignOut = (e) => {
        e.preventDefault();

        auth().signOut().catch( e => {
            console.log(e);
        });
    }

    const renderAccountLink = () => {

        let displayName = '';
        if ( authenticated ) {
            displayName = auth().currentUser.displayName ? auth().currentUser.displayName : auth().currentUser.email;
        }

        return (
            authenticated 
                ? (<><span className="signed-in-text">Signed in as</span> <span className="signed-in-user">{displayName}</span> <Link to="/" onClick={ handleSignOut }>Log Out</Link></>) 
                : (<><span className="new-account-text"><Link to="./signup">Create an Account</Link> or </span><Link to="./login">Log In</Link></>)
        );


    }

    return (
        <header className="header masthead">
            <h1 className="header-branding">
                <Link to="./">MedBase</Link>
            </h1>
            <nav className="header-menu">
                <ul className="menu">
                    { !authenticated ? <li className="menu-item"><Link to="./">Home</Link></li> : null }
                    <li className="menu-item menu-item-account">
                        { renderAccountLink() }
                    </li>
                </ul>
            </nav>
        </header>
    );

}

export default Header;