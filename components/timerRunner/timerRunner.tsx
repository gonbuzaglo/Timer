import React, { Component } from 'react';
import './timerRunner.css';

interface TimerRunnerProps {
    onClick: () => void;
    millieSeconds: number;
}

interface TimerRunnerState {
    millieSeconds: number;
    isRunning: boolean;
}

export class TimerRunner extends Component<TimerRunnerProps, TimerRunnerState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            millieSeconds: this.props.millieSeconds,
            isRunning: true
        }
    }

    private intervalID: any;

    private millieSecondsToTime(timeInMillieSeconds: number): string {
        const pad = function (num: number, size: number): string { return ('000' + num.toString()).slice(size * -1); },
            timeInSeconds = (timeInMillieSeconds / 1000),
            time = parseInt(timeInSeconds.toString()).toFixed(3),
            hours = Math.floor(parseInt(time) / 60 / 60),
            minutes = Math.floor(parseInt(time) / 60) % 60,
            seconds = Math.floor(parseInt(time) - minutes * 60),
            milliseconds = ((timeInMillieSeconds % 1000) / 10).toString();

        return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ':' + pad(parseInt(milliseconds), 2);
    }

    public playOrPause = async () => {
        if (this.state.millieSeconds > 0) {
            await this.setState({ isRunning: !this.state.isRunning })
        }
        if(this.state.isRunning) {
            this.startInterval();
        }
        else if(!this.state.isRunning) {
            this.stopInterval();
        }
    }

    public startInterval = () => {
        this.setState({ isRunning: true })
        this.intervalID = setInterval(() => {
            this.setState({millieSeconds: this.state.millieSeconds - 10});
            if (this.state.millieSeconds === 0) {
                clearInterval(this.intervalID);
                this.setState({isRunning: false});
                this.props.onClick();
            }
        }, 10)
    }

    public stopInterval = () => {
        this.setState({ isRunning: false })
        clearInterval(this.intervalID);
    }

    public componentDidMount = (): void => {
        this.startInterval();
    }

    public componentWillUnmount = (): void => {
        this.stopInterval();
    }

    public render(): JSX.Element {
        const playButton =
            <button className='btn btn-success' onClick={this.startInterval}>
                RESUME
            </button>;
        const pauseButton =
            <button className='btn btn-danger' onClick={this.stopInterval}>
                STOP
            </button>;

        return (
            <div className="timer-runner">
                
                <div className="runner-display">
                   
                    <div className="hms-container">
                        <span>H</span>
                        <span>M</span>
                        <span>S</span>
                        <span>MS</span>
                    </div>
                 
                    {this.state.isRunning ? <div id='runningTime'
                        style={{ color: Math.ceil(this.state.millieSeconds / 1000) <= 10 ? 'red' : 'deepskyblue' }}>
                        {this.millieSecondsToTime(this.state.millieSeconds)}
                    </div> :
                        <div id='defaultTime'>
                            <p>{this.state.millieSeconds ? this.millieSecondsToTime(this.state.millieSeconds) : '00:00:00:00'}</p>
                        </div>}
               
                </div>

                <div className="btn-group btn-group-lg">
                    {this.state.isRunning ? pauseButton : playButton}
                    <button className='btn btn-info' onClick={this.props.onClick}>
                        RESET
                    </button>
                </div>

            </div>
        );
    }
}