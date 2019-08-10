import React, { Component } from 'react';
import './layout.css';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { TimerDisplay } from '../timerDisplay/timerDisplay';


export class Layout extends Component {   
    public render(): JSX.Element {
        return (
            <div className="layout">
                <header><Header/></header>
                <main>
                    <TimerDisplay/>
                </main>
                <footer><Footer/></footer>
            </div>
        );
    }

}