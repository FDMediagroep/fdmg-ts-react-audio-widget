import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../../scss/AudioWidget.scss';
import AudioWidget from "../../src/AudioWidget";

class AudioPlayer extends React.Component {
    props: any;
    state: any;
    ref: AudioWidget;

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.info('click');
        if(!this.state.playing) {
            this.ref.play();
            this.setState({playing: true});
        } else {
            this.ref.pause();
            this.setState({playing: false});
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>{this.state.playing ? 'Pause' : 'Play'}</button>
                <AudioWidget ref={(ref) => { this.ref = ref; }} playerSrc='audio/test.mp3'/>
            </div>
        );
    }
}

// Render react components.
ReactDOM.render(
    <AudioPlayer/>,
    document.getElementById('root')
);
