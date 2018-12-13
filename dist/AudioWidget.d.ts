import * as React from 'react';
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
    state: any;
    props: Props;
    private audioPlayer;
    private progressBar;
    constructor(props: Props);
    readonly audioElement: HTMLAudioElement;
    handleOnCanPlay: (...args: any[]) => void;
    /**
     * Set the initial state of the audio player
     */
    setInitialAudioState(): void;
    /**
     * Calculates the elapsed percentage of audio.
     * currentTime and duration are sent by the audio element.
     */
    calculateElapsedPercentage: (currentTime: number, duration: number) => string;
    /**
     * Calculates the elapsed time from the given percentage.
     * @param percentage
     * @returns {number}
     */
    getElapsedTimeFromPercentage: (percentage: any) => number;
    /**
     * Callback for when the progressbar elapsed time is changed through user-interaction. Given is e.target.value
     * which is the track's percentage. It calculates the elapsed time from this percentage and updates the player controls.
     */
    handleUpdateElapsedTime(e: any): void;
    /**
     * On every audio element time update event the current time and percentage state will be updated
     * with a new value and thus triggers a re-render of the current time counter and progress bar.
     */
    handleOnTimeUpdate(...args: any[]): void;
    handleOnPause: (...args: any[]) => void;
    handleOnPlay: (...args: any[]) => void;
    handleOnPlaying: (...args: any[]) => void;
    handleOnSuspend: (...args: any[]) => void;
    play: () => void;
    pause: () => void;
    buffering: () => void;
    doneBuffering: () => void;
    handleOnEnded: (...args: any[]) => void;
    handleOnLoadStart: (...args: any[]) => void;
    handleOnLoad: (...args: any[]) => void;
    handleOnLoadedData: (...args: any[]) => void;
    handleOnSeeking: (...args: any[]) => void;
    handleOnSeeked: (...args: any[]) => void;
    /**
     * Returns true when on Safari mobile.
     * @returns {RegExpMatchArray}
     */
    isSafariMobile: () => RegExpMatchArray;
    render(): JSX.Element;
}
