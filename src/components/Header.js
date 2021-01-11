import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

const Header = (props) => {

    const { authenticated } = props;

    const handleSignOut = (e) => {
        e.preventDefault();

        auth().signOut().then( () => {
            console.log('signed out');
        }).catch( e => {
            console.log(e);
        });
    }

    if ( authenticated ) {
        console.log( auth().currentUser );
    }
    return (
        <div className="ui secondary pointing menu">
            <Link to="./" className="item"><strong>MedBase</strong></Link>
            <Link to="./" className="item">Home</Link>
            { authenticated ?
            <span className="item">Signed in as { (auth().currentUser.displayName) ? auth().currentUser.displayName : auth().currentUser.email }&nbsp; <Link to="/" onClick={ handleSignOut }>Log Out</Link></span>
            :
            <span className="item">
                <Link to="./signup">Create an Account</Link> &nbsp; or &nbsp; <Link to="./login">Log In</Link>
            </span>
            }
        </div>
    );

}

export default Header;