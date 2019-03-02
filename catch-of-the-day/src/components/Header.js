import React from "react";

class Header extends React.Component {
    render () {
        return (
            <React.Fragment>
                <header className="top">
                    <h1>Catch 
                        <span className="ofThe">
                            <span className="of">Of</span>
                            <span className="the">The</span>
                        </span>
                    Day</h1>
                </header>
                <h3 className="tagline">
                    <span>Fresh Daily</span>
                </h3>
            </React.Fragment>
        );
    }
}

export default Header;