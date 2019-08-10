import React, { Component } from 'react';
import './timerAdjust.css';

interface TimerAdjustProps {
    onClick: (millieSeconds: number) => void;
    millieSeconds: number;
}

interface TimerAdjustState {
    millieSeconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    [key: string]: number;
}

export class TimerAdjust extends Component<TimerAdjustProps, TimerAdjustState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            millieSeconds: this.props.millieSeconds,
            seconds: 0,
            minutes: 0,
            hours: 0,
        }
    }

    public valueToChange: string = "seconds";

    public componentWillMount = (): void => {
        if (this.state.millieSeconds) {
            const hours = Math.floor(this.state.millieSeconds / 3600000),
                minutes = Math.floor((this.state.millieSeconds % 3600000) / (60 * 1000)),
                seconds = Math.floor(((this.state.millieSeconds % 3600000) % (60 * 1000)) / 1000);
            this.setState({
                seconds: seconds,
                minutes: minutes,
                hours: hours,
            })
        }
        return;
    }

    private defineValueToChange = (newValueToChange: string): void => {
        this.valueToChange = newValueToChange;
    }

    private changeValue = (numberClicked: number): void => {
        const valueToChange = this.valueToChange;
        let newValue;
        if (this.state[valueToChange].toString().length === 2) {
            newValue = parseInt(this.state[valueToChange].toString().slice(1) + numberClicked)
        }
        else {
            newValue = parseInt(this.state[valueToChange].toString() + numberClicked)
        }
        if (newValue < 60) {
            this.setState({ [valueToChange]: newValue });
        }
        else {
            this.setState({ [valueToChange]: numberClicked });
        }
    }

    private resetValue = (): void => {
        this.setState({ [this.valueToChange]: 0 });
    }

    private resetAllValues = (): void => {
        this.setState({
            seconds: 0,
            minutes: 0,
            hours: 0,
        });
    }

    private displayFormattedDigits = (i: number) => {
        return (i < 10) ? "0" + i : i;
    }

    private timeToMillieSeconds = (): number => {
        return this.state.hours * 3600000 + this.state.minutes * 60000 + this.state.seconds * 1000;
    }

    public render(): JSX.Element {
        return (
            <div className="timer-adjust">

                <div className="hms-container">
                    <span>H</span>
                    <span>M</span>
                    <span>S</span>
                </div>

                <div className="inputs-container">

                    <input type="text" value={this.displayFormattedDigits(this.state.hours)}
                        onClick={() => this.defineValueToChange("hours")} />

                    <span>:</span>

                    <input type="text" value={this.displayFormattedDigits(this.state.minutes)}
                        onClick={() => this.defineValueToChange("minutes")} />

                    <span>:</span>

                    <input type="text" value={this.displayFormattedDigits(this.state.seconds)}
                        onClick={() => this.defineValueToChange("seconds")} />

                </div>

                <div className="timer-keys">

                    <button className="btn btn-light" onClick={() => this.changeValue(7)}>7</button>
                    <button className="btn btn-light" onClick={() => this.changeValue(8)}>8</button>
                    <button className="btn btn-light" onClick={() => this.changeValue(9)}>9</button>

                    <button className="btn btn-light" onClick={() => this.changeValue(4)}>4</button>
                    <button className="btn btn-light" onClick={() => this.changeValue(5)}>5</button>
                    <button className="btn btn-light" onClick={() => this.changeValue(6)}>6</button>

                    <button className="btn btn-light" onClick={() => this.changeValue(1)}>1</button>
                    <button className="btn btn-light" onClick={() => this.changeValue(2)}>2</button>
                    <button className="btn btn-light" onClick={() => this.changeValue(3)}>3</button>

                    <button className="btn btn-light" onClick={() => this.changeValue(0)}>0</button>

                    <button className="btn btn-light" onClick={this.resetValue}><b>X</b></button>

                    <button className="btn btn-light" onClick={this.resetAllValues}>
                        <b><i className="fa fa-refresh" aria-hidden="true"></i></b>
                    </button>

                </div>

                <button className="btn btn-success"
                    onClick={() => this.props.onClick(this.timeToMillieSeconds())}>
                    <b>start</b>
                </button>

            </div>
        );
    }
}