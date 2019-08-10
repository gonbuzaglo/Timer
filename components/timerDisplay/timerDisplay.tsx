import React, { Component } from 'react';
import './timerDisplay.css';
import { TimerRunner } from '../timerRunner/timerRunner';
import { TimerAdjust } from '../timerAdjust/timerAdjust';

interface TimerDisplayState {
    isPlaying: boolean;
    millieSeconds: number;
}

export class TimerDisplay extends Component<any, TimerDisplayState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isPlaying: false,
            millieSeconds: 0
        }
    }

    public render(): JSX.Element {
        return(
            <div className="timer-display">
                {this.state.isPlaying ? 
                <TimerRunner onClick={this.stop} millieSeconds={this.state.millieSeconds}/> 
                : <TimerAdjust onClick={this.start} millieSeconds={this.state.millieSeconds}/>}
            </div>
        );
    }

    public stop = (): void => {
        this.setState({isPlaying: false})
    }

    public start = (millieSeconds: number): void => {
        if (millieSeconds > 0) {
            this.setState({
                millieSeconds: millieSeconds,
                isPlaying: true
            })
        }
        return;
    }
}