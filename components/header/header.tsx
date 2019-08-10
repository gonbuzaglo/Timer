import React from 'react';
import './header.css';

export const Header: React.SFC = (): JSX.Element => {
    return (
        <div className="header">
            <h1>My Awesome React Timer <i className="fa fa-hourglass-half" aria-hidden="true"></i></h1>
        </div>
    );
}