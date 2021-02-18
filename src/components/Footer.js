import React from 'react';

class Footer extends React.Component {

    render() {

        const today = new Date();

        return (
            <footer className="app-footer">
                <div className="footer-colophon">
                    MedBase was developed by <a href="http://robmaurizi.com" target="_blank" rel="noreferrer">Rob Maurizi</a> using <nobr>React JS and Firebase.</nobr>
                </div>
                <div className="footer-copyright">
                    <nobr>&copy; 2011&ndash;{today.getFullYear()} Rob Maurizi.</nobr> <nobr>All rights reserved.</nobr>
                </div>
            </footer>
        )
    
    }
}

export default Footer;