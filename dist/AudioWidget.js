"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ts_react_progress_bar_1 = require("@fdmg/ts-react-progress-bar");
/**
 * AudioWidget composition - Renders a HTML5 audio element and a progress bar.
 */
var AudioWidget = /** @class */ (function (_super) {
    __extends(AudioWidget, _super);
    function AudioWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.props = props;
        _this.state = {
            autoPlay: false,
            buffering: false,
            currentTime: 0,
            duration: 0,
            percentage: 0
        };
        // Bind functions
        _this.handleOnCanPlay = _this.handleOnCanPlay.bind(_this);
        _this.handleOnTimeUpdate = _this.handleOnTimeUpdate.bind(_this);
        _this.buffering = _this.buffering.bind(_this);
        _this.doneBuffering = _this.doneBuffering.bind(_this);
        _this.doneBuffering = _this.doneBuffering.bind(_this);
        _this.buffering = _this.buffering.bind(_this);
        _this.doneBuffering = _this.doneBuffering.bind(_this);
        _this.handleUpdateElapsedTime = _this.handleUpdateElapsedTime.bind(_this);
        _this.handleOnEnded = _this.handleOnEnded.bind(_this);
        _this.handleOnLoad = _this.handleOnLoad.bind(_this);
        _this.handleOnLoadedData = _this.handleOnLoadedData.bind(_this);
        _this.handleOnLoadStart = _this.handleOnLoadStart.bind(_this);
        _this.handleOnPause = _this.handleOnPause.bind(_this);
        _this.handleOnPlay = _this.handleOnPlay.bind(_this);
        _this.handleOnPlaying = _this.handleOnPlaying.bind(_this);
        _this.handleOnSeeked = _this.handleOnSeeked.bind(_this);
        _this.handleOnSeeking = _this.handleOnSeeking.bind(_this);
        _this.handleOnSuspend = _this.handleOnSuspend.bind(_this);
        return _this;
    }
    AudioWidget.prototype.handleOnCanPlay = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.props.onCanPlay) {
            (_a = this.props).onCanPlay.apply(_a, args);
        }
        this.setInitialAudioState();
        var _a;
    };
    /**
     * Set the initial state of the audio player
     */
    AudioWidget.prototype.setInitialAudioState = function () {
        this.setState({
            currentTime: this.convertToReadableTime(this.audioPlayer.currentTime),
            duration: this.convertToReadableTime(this.audioPlayer.duration),
            percentage: this.calculateElapsedPercentage(this.audioPlayer.currentTime, this.audioPlayer.duration)
        });
    };
    /**
     *  Convert seconds (number) to a human readable time format: 2u 3m 34s
     */
    AudioWidget.prototype.convertToReadableTime = function (seconds) {
        var h = Math.floor(seconds / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 3600 % 60);
        var hDisplay = h > 0 ? h + "u " : "";
        var mDisplay = m > 0 ? m + "m " : "";
        var sDisplay = s > 0 ? s + "s" : "";
        return hDisplay + mDisplay + sDisplay;
    };
    /**
     * Calculates the elapsed percentage of audio.
     * currentTime and duration are sent by the audio element.
     */
    AudioWidget.prototype.calculateElapsedPercentage = function (currentTime, duration) {
        var percentage = currentTime / duration * 100;
        return percentage.toFixed(2);
    };
    /**
     * Calculates the elapsed time from the given percentage.
     * @param percentage
     * @returns {number}
     */
    AudioWidget.prototype.getElapsedTimeFromPercentage = function (percentage) {
        return (this.audioPlayer.duration / 100) * percentage;
    };
    /**
     * Callback for when the progressbar elapsed time is changed through user-interaction. Given is e.target.value
     * which is the track's percentage. It calculates the elapsed time from this percentage and updates the player controls.
     */
    AudioWidget.prototype.handleUpdateElapsedTime = function (e) {
        this.audioPlayer.currentTime = this.getElapsedTimeFromPercentage(e.target.value);
        this.play();
    };
    /**
     * On every audio element time update event the current time and percentage state will be updated
     * with a new value and thus triggers a re-render of the current time counter and progress bar.
     */
    AudioWidget.prototype.handleOnTimeUpdate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.props.onTimeUpdate) {
            (_a = this.props).onTimeUpdate.apply(_a, args);
        }
        this.setState({
            currentTime: this.convertToReadableTime(this.audioPlayer.currentTime),
            percentage: this.calculateElapsedPercentage(this.audioPlayer.currentTime, this.audioPlayer.duration)
        });
        var _a;
    };
    AudioWidget.prototype.handleOnPause = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.props.onPause) {
            (_a = this.props).onPause.apply(_a, args);
        }
        var _a;
    };
    AudioWidget.prototype.handleOnPlay = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.props.onPlay) {
            (_a = this.props).onPlay.apply(_a, args);
        }
        var _a;
    };
    AudioWidget.prototype.handleOnPlaying = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.props.onPlaying) {
            (_a = this.props).onPlaying.apply(_a, args);
        }
        var _a;
    };
    AudioWidget.prototype.handleOnSuspend = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.props.onSuspend) {
            (_a = this.props).onSuspend.apply(_a, args);
        }
        var _a;
    };
    AudioWidget.prototype.play = function () {
        this.setState({ autoPlay: true });
        this.audioPlayer.play();
    };
    AudioWidget.prototype.pause = function () {
        this.audioPlayer.pause();
    };
    AudioWidget.prototype.buffering = function () {
        this.setState({ buffering: true });
    };
    AudioWidget.prototype.doneBuffering = function () {
        this.setState({ buffering: false });
    };
    AudioWidget.prototype.handleOnEnded = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.props.onEnded) {
            (_a = this.props).onEnded.apply(_a, args);
        }
        var _a;
    };
    AudioWidget.prototype.handleOnLoadStart = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.props.onLoadStart) {
            (_a = this.props).onLoadStart.apply(_a, args);
        }
        this.buffering();
        var _a;
    };
    AudioWidget.prototype.handleOnLoad = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.props.onLoad) {
            (_a = this.props).onLoad.apply(_a, args);
        }
        this.doneBuffering();
        var _a;
    };
    AudioWidget.prototype.handleOnLoadedData = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.props.onLoadedData) {
            (_a = this.props).onLoadedData.apply(_a, args);
        }
        this.doneBuffering();
        var _a;
    };
    AudioWidget.prototype.handleOnSeeking = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.props.onSeeking) {
            (_a = this.props).onSeeking.apply(_a, args);
        }
        this.buffering();
        var _a;
    };
    AudioWidget.prototype.handleOnSeeked = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.props.onSeeked) {
            (_a = this.props).onSeeked.apply(_a, args);
        }
        this.doneBuffering();
        var _a;
    };
    /**
     * Returns true when on Safari mobile.
     * @returns {RegExpMatchArray}
     */
    AudioWidget.prototype.isSafariMobile = function () {
        return (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i));
    };
    AudioWidget.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "audio" },
            React.createElement("audio", { ref: function (audioPlayer) { _this.audioPlayer = audioPlayer; }, src: this.props.playerSrc, onCanPlay: this.handleOnCanPlay, onEnded: this.handleOnEnded, onTimeUpdate: this.handleOnTimeUpdate, autoPlay: this.state.autoPlay, onLoadStart: this.handleOnLoadStart, onLoad: this.handleOnLoad, onLoadedData: this.handleOnLoadedData, onPause: this.handleOnPause, onPlay: this.handleOnPlay, onPlaying: this.handleOnPlaying, onSeeking: this.handleOnSeeking, onSeeked: this.handleOnSeeked, onSuspend: this.handleOnSuspend }),
            React.createElement(ts_react_progress_bar_1.default, { ref: function (progressBar) { _this.progressBar = progressBar; }, currentTime: this.state.currentTime, duration: this.state.duration, percentage: this.state.percentage, onElapsedTimeUpdate: this.handleUpdateElapsedTime, autoPlay: this.state.autoPlay, isBuffering: this.state.buffering, hideTimeLine: !this.state.autoPlay && this.isSafariMobile() })));
    };
    return AudioWidget;
}(React.Component));
exports.default = AudioWidget;
