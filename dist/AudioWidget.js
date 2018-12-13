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
        _this.handleOnCanPlay = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (_this.props.onCanPlay) {
                (_a = _this.props).onCanPlay.apply(_a, args);
            }
            _this.setInitialAudioState();
        };
        /**
         * Calculates the elapsed percentage of audio.
         * currentTime and duration are sent by the audio element.
         */
        _this.calculateElapsedPercentage = function (currentTime, duration) {
            var percentage = currentTime / duration * 100;
            return percentage.toFixed(2);
        };
        /**
         * Calculates the elapsed time from the given percentage.
         * @param percentage
         * @returns {number}
         */
        _this.getElapsedTimeFromPercentage = function (percentage) {
            return (_this.audioPlayer.duration / 100) * percentage;
        };
        _this.handleOnPause = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (_this.props.onPause) {
                (_a = _this.props).onPause.apply(_a, args);
            }
        };
        _this.handleOnPlay = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (_this.props.onPlay) {
                (_a = _this.props).onPlay.apply(_a, args);
            }
        };
        _this.handleOnPlaying = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (_this.props.onPlaying) {
                (_a = _this.props).onPlaying.apply(_a, args);
            }
        };
        _this.handleOnSuspend = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (_this.props.onSuspend) {
                (_a = _this.props).onSuspend.apply(_a, args);
            }
        };
        _this.play = function () {
            _this.setState({ autoPlay: true });
            _this.audioPlayer.play();
        };
        _this.pause = function () {
            _this.audioPlayer.pause();
        };
        _this.buffering = function () {
            _this.setState({ buffering: true });
        };
        _this.doneBuffering = function () {
            _this.setState({ buffering: false });
        };
        _this.handleOnEnded = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (_this.props.onEnded) {
                (_a = _this.props).onEnded.apply(_a, args);
            }
        };
        _this.handleOnLoadStart = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (_this.props.onLoadStart) {
                (_a = _this.props).onLoadStart.apply(_a, args);
            }
            _this.buffering();
        };
        _this.handleOnLoad = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (_this.props.onLoad) {
                (_a = _this.props).onLoad.apply(_a, args);
            }
            _this.doneBuffering();
        };
        _this.handleOnLoadedData = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (_this.props.onLoadedData) {
                (_a = _this.props).onLoadedData.apply(_a, args);
            }
            _this.doneBuffering();
        };
        _this.handleOnSeeking = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (_this.props.onSeeking) {
                (_a = _this.props).onSeeking.apply(_a, args);
            }
            _this.buffering();
        };
        _this.handleOnSeeked = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (_this.props.onSeeked) {
                (_a = _this.props).onSeeked.apply(_a, args);
            }
            _this.doneBuffering();
        };
        /**
         * Returns true when on Safari mobile.
         * @returns {RegExpMatchArray}
         */
        _this.isSafariMobile = function () {
            return (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i));
        };
        _this.state = {
            autoPlay: false,
            buffering: false,
            currentTime: 0,
            duration: 0,
            hideTimeline: false,
            percentage: 0
        };
        _this.setInitialAudioState = _this.setInitialAudioState.bind(_this);
        _this.handleOnTimeUpdate = _this.handleOnTimeUpdate.bind(_this);
        _this.handleUpdateElapsedTime = _this.handleUpdateElapsedTime.bind(_this);
        return _this;
        // this.setState({ hideTimeline: !this.state.autoPlay && this.isSafariMobile() ? true : false });
    }
    Object.defineProperty(AudioWidget.prototype, "audioElement", {
        get: function () {
            return this.audioPlayer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the initial state of the audio player
     */
    AudioWidget.prototype.setInitialAudioState = function () {
        this.setState({
            currentTime: this.audioPlayer.currentTime,
            duration: this.audioPlayer.duration,
            percentage: this.calculateElapsedPercentage(this.audioPlayer.currentTime, this.audioPlayer.duration)
        });
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
        var _a;
        if (this.props.onTimeUpdate) {
            (_a = this.props).onTimeUpdate.apply(_a, args);
        }
        this.setState({
            currentTime: this.audioPlayer.currentTime,
            percentage: this.calculateElapsedPercentage(this.audioPlayer.currentTime, this.audioPlayer.duration)
        });
    };
    AudioWidget.prototype.render = function () {
        var _this = this;
        var hideTimeLine = !this.state.autoPlay && this.isSafariMobile() ? true : false;
        var progressBarComponent = this.props.excludeProgressBar ? "" : (React.createElement(ts_react_progress_bar_1.default, { ref: function (progressBar) { _this.progressBar = progressBar; }, currentTime: this.state.currentTime, duration: this.state.duration, percentage: this.state.percentage, onElapsedTimeUpdate: this.handleUpdateElapsedTime, autoPlay: this.state.autoPlay, isBuffering: this.state.buffering, hideTimeLine: hideTimeLine, hideProgressBarCurrentTime: this.props.hideProgressBarCurrentTime, hideProgressBarDuration: this.props.hideProgressBarDuration }));
        return (React.createElement("div", { className: "audio" },
            React.createElement("audio", { ref: function (audioPlayer) { _this.audioPlayer = audioPlayer; }, src: this.props.playerSrc, onCanPlay: this.handleOnCanPlay, onEnded: this.handleOnEnded, onTimeUpdate: this.handleOnTimeUpdate, autoPlay: this.state.autoPlay, onLoadStart: this.handleOnLoadStart, onLoad: this.handleOnLoad, onLoadedData: this.handleOnLoadedData, onPause: this.handleOnPause, onPlay: this.handleOnPlay, onPlaying: this.handleOnPlaying, onSeeking: this.handleOnSeeking, onSeeked: this.handleOnSeeked, onSuspend: this.handleOnSuspend }),
            progressBarComponent));
    };
    return AudioWidget;
}(React.Component));
exports.default = AudioWidget;
