import React from 'react';
import { Link } from 'react-router-dom';

const About = (props) => {

    return(
        <div>
            <h1>Welcome to MedBase</h1>
            <p>MedBase is a personal medication register (PMR) designed to allow you to maintain a list of medications for yourself or others you care for.</p>
            <p>To get started, <Link to="/signup">create an account</Link> or <Link to="/login">log in</Link>!</p>
            <h2>About MedBase</h2>
            <p>MedBase was an app I wrote in Objective-C for iOS years ago. It saw very mild success on the AppStore, but unfortunately, I couldn't keep up with it and abandoned it after a couple of years.</p>
            <p>This version is effectively a sandbox I'm using to practice <a href="http://reactjs.org" target="_blank" rel="noreferrer">React</a> development.</p>
            <p>I'm also in the process of re-writing the original app using Swift.</p>
        </div>
    );
}
export default About;