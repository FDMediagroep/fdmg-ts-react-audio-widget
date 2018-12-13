import * as React from 'react';
import ProgressBar from "@fdmg/ts-react-progress-bar";

export interface Props {
    playerSrc: string;
    excludeProgressBar?: boolean;
    hideProgressBarCurrentTime?: boolean;
    hideProgressBarDuration?: boolean;
    onCanPlay?: (...args: any[]) => void;
    onEnded?: (...args: any[]) => void;
    onLoadStart?: (...args: any[]) => void;
    onLoad?: (...args: any[]) => void;
    onLoadedData?: (...args: any[]) => void;
    onPause?: (...args: any[]) => void;
    onPlay?: (...args: any[]) => void;
    onPlaying?: (...args: any[]) => void;
    onSeeked?: (...args: any[]) => void;
    onSeeking?: (...args: any[]) => void;
    onSuspend?: (...args: any[]) => void;
    onTimeUpdate?: (...args: any[]) => void;
}

/**
 * AudioWidget composition - Renders a HTML5 audio element and a progress bar.
 */
export default class AudioWidget extends React.Component<Props, any> {
    public state: any;
    public props: Props;

    private audioPlayer: HTMLAudioElement;
    private progressBar: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            autoPlay: false,
            buffering: false,
            currentTime: 0,
            duration: 0,
            hideTimeline: false,
            percentage: 0
        };

        this.setInitialAudioState = this.setInitialAudioState.bind(this);
        this.handleOnTimeUpdate = this.handleOnTimeUpdate.bind(this);
        this.handleUpdateElapsedTime = this.handleUpdateElapsedTime.bind(this);

        // this.setState({ hideTimeline: !this.state.autoPlay && this.isSafariMobile() ? true : false });
    }

    get audioElement() {
        return this.audioPlayer;
    }

    handleOnCanPlay = (...args) => {
        if (this.props.onCanPlay) { this.props.onCanPlay(...args); }
        this.setInitialAudioState();
    }

    /**
     * Set the initial state of the audio player
     */
    setInitialAudioState() {
        this.setState({
            currentTime : this.audioPlayer.currentTime,
            duration : this.audioPlayer.duration,
            percentage : this.calculateElapsedPercentage(this.audioPlayer.currentTime, this.audioPlayer.duration)
        });
    }

    /**
     * Calculates the elapsed percentage of audio.
     * currentTime and duration are sent by the audio element.
     */
    calculateElapsedPercentage = (currentTime: number, duration: number) => {
        const percentage = currentTime / duration * 100;
        return percentage.toFixed(2);
    }

    /**
     * Calculates the elapsed time from the given percentage.
     * @param percentage
     * @returns {number}
     */
    getElapsedTimeFromPercentage = (percentage) => {
        return (this.audioPlayer.duration / 100) * percentage;
    }

    /**
     * Callback for when the progressbar elapsed time is changed through user-interaction. Given is e.target.value
     * which is the track's percentage. It calculates the elapsed time from this percentage and updates the player controls.
     */
    handleUpdateElapsedTime(e) {
        this.audioPlayer.currentTime = this.getElapsedTimeFromPercentage(e.target.value);
        this.play();
    }

    /**
     * On every audio element time update event the current time and percentage state will be updated
     * with a new value and thus triggers a re-render of the current time counter and progress bar.
     */
    handleOnTimeUpdate(...args) {
        if (this.props.onTimeUpdate) { this.props.onTimeUpdate(...args); }
        this.setState({
            currentTime : this.audioPlayer.currentTime,
            percentage : this.calculateElapsedPercentage(this.audioPlayer.currentTime, this.audioPlayer.duration)
        });
    }

    handleOnPause = (...args) => {
        if (this.props.onPause) { this.props.onPause(...args); }
    }

    handleOnPlay = (...args) => {
        if (this.props.onPlay) { this.props.onPlay(...args); }
    }

    handleOnPlaying = (...args) => {
        if (this.props.onPlaying) { this.props.onPlaying(...args); }
    }

    handleOnSuspend = (...args) => {
        if (this.props.onSuspend) { this.props.onSuspend(...args); }
    }

    play = () => {
        this.setState({autoPlay: true});
        this.audioPlayer.play();
    }

    pause = () => {
        this.audioPlayer.pause();
    }

    buffering = () => {
        this.setState({ buffering : true });
    }

    doneBuffering = () => {
        this.setState({ buffering : false });
    }

    handleOnEnded = (...args) => {
        if (this.props.onEnded) { this.props.onEnded(...args); }
    }

    handleOnLoadStart = (...args) => {
        if (this.props.onLoadStart) { this.props.onLoadStart(...args); }
        this.buffering();
    }

    handleOnLoad = (...args) => {
        if (this.props.onLoad) { this.props.onLoad(...args); }
        this.doneBuffering();
    }

    handleOnLoadedData = (...args) => {
        if (this.props.onLoadedData) { this.props.onLoadedData(...args); }
        this.doneBuffering();
    }

    handleOnSeeking = (...args) => {
        if (this.props.onSeeking) { this.props.onSeeking(...args); }
        this.buffering();
    }

    handleOnSeeked = (...args) => {
        if (this.props.onSeeked) { this.props.onSeeked(...args); }
        this.doneBuffering();
    }

    /**
     * Returns true when on Safari mobile.
     * @returns {RegExpMatchArray}
     */
    isSafariMobile = () => {
        return (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i));
    }

    render() {
        const hideTimeLine = !this.state.autoPlay && this.isSafariMobile() ? true : false;
        const progressBarComponent = this.props.excludeProgressBar ? "" : (
            <ProgressBar
                ref={(progressBar) => { this.progressBar = progressBar; }}
                currentTime={this.state.currentTime}
                duration={this.state.duration}
                percentage={this.state.percentage}
                onElapsedTimeUpdate={this.handleUpdateElapsedTime}
                autoPlay={this.state.autoPlay}
                isBuffering={this.state.buffering}
                hideTimeLine={hideTimeLine}
                hideProgressBarCurrentTime={this.props.hideProgressBarCurrentTime}
                hideProgressBarDuration={this.props.hideProgressBarDuration}
            />
        );

        return (
            <div className="audio">
                <audio
                    ref={(audioPlayer) => { this.audioPlayer = audioPlayer; }}
                    src={this.props.playerSrc}
                    onCanPlay={this.handleOnCanPlay}
                    onEnded={this.handleOnEnded}
                    onTimeUpdate={this.handleOnTimeUpdate}
                    autoPlay={this.state.autoPlay}
                    onLoadStart={this.handleOnLoadStart}
                    onLoad={this.handleOnLoad}
                    onLoadedData={this.handleOnLoadedData}
                    onPause={this.handleOnPause}
                    onPlay={this.handleOnPlay}
                    onPlaying={this.handleOnPlaying}
                    onSeeking={this.handleOnSeeking}
                    onSeeked={this.handleOnSeeked}
                    onSuspend={this.handleOnSuspend}
                />
                {progressBarComponent}
            </div>
        );
    }
}
