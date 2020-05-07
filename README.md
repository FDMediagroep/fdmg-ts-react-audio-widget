> :exclamation: **DEPRECATED** :exclamation: : Superseded by @fdmg/design-system. See: https://github.com/FDMediagroep/fd-design-system

# fdmg-ts-react-audio-widget

[![Build Status](https://travis-ci.org/FDMediagroep/fdmg-ts-react-audio-widget.svg?branch=master)](https://travis-ci.org/FDMediagroep/fdmg-ts-react-audio-widget)
[![Coverage Status](https://coveralls.io/repos/github/FDMediagroep/fdmg-ts-react-audio-widget/badge.svg?branch=master)](https://coveralls.io/github/FDMediagroep/fdmg-ts-react-audio-widget?branch=master)
[![npm version](https://badge.fury.io/js/%40fdmg%2Fts-react-audio-widget.svg)](https://badge.fury.io/js/%40fdmg%2Fts-react-audio-widget)


[ReactJS](https://reactjs.org/) AudioWidget component. This component renders a stand-alone Audio Widget for playing
audio files. All you need is some styling and you're good to go.

## Installation
- Run `npm i --save-dev @fdmg/ts-react-audio-widget`

or

- Run `yarn add @fdmg/ts-react-audio-widget --dev`

## Usage
### TypeScript
```
import * as React from 'react';
import H1 from 'fdmg-ts-react-audio-widget';

export default class foo {
    public state: any;
    public props: any;

    constructor(props: any) {
        super(props);
        this.props = props;
    }
    
    handleOnLoad() {}

    handleOnCanPlay() {}

    handleOnLoadStart() {}

    handleOnLoadedData() {}

    handleOnSeeked() {}

    handleOnEnded() {}

    handleOnSeeking() {}

    handleOnTimeUpdate() {}

    render() {
        return (
            <Audio
                playerSrc={'test.mp3'}
                onLoad={this.handleOnLoad}
                onCanPlay={this.handleOnCanPlay}
                onLoadStart={this.handleOnLoadStart}
                onLoadedData={this.handleOnLoadedData}
                onSeeked={this.handleOnSeeked}
                onEnded={this.handleOnEnded}
                onSeeking={this.handleOnSeeking}
                onTimeUpdate={this.handleOnTimeUpdate}
                hideProgressBarCurrentTime=this.props.ideProgressBarCurrentTime}
                hideProgressBarDuration={this.props.hideProgressBarDuration}
            />
        );
    }
}
```

### Resulting HTML
```
<div class="audio">
    <audio src="test.mp3" autoplay="true"></audio>
    <div class="progress">
        <div>
            <div class="time-line">
                <span class="time-line-progress-bar" style="width: 4%;"></span>
                <input type="range" step="0.01">
            </div>
        </div>
        <div class="counters">
            <span>12s</span>
            <span>5m 0s</span>
        </div>
    </div>
</div>
```
