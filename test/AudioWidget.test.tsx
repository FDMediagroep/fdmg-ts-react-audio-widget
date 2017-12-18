import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import * as React from 'react';
import AudioWidget from '../src/AudioWidget';

console.info = () => {};

describe('AudioWidget', () => {
    const empty = () => {};

    beforeAll(() => {
        Enzyme.configure({ adapter: new Adapter() });
    });

    test('renders correctly', () => {
        const component = shallow(
            <AudioWidget
                playerSrc={'test.mp3'}
                onEnded={empty}
                onTimeUpdate={empty}
                onSeeked={empty}
                onLoadedData={empty}
                onLoadStart={empty}
                onCanPlay={empty}
                onLoad={empty}
            />);
        const audioEl = component.find('audio');
        expect(toJson(component)).toMatchSnapshot();
        expect(audioEl.prop('src')).toBe('test.mp3');
    });

    test('renders correctly on Safari mobile', () => {
        const oldUserAgent = navigator.userAgent;
        Object.defineProperty(navigator, 'userAgent', {
            writable: true,
            value: 'iPad'
        });
        const component = mount(
            <AudioWidget
                playerSrc={'test.mp3'}
                onEnded={empty}
                onTimeUpdate={empty}
            />);
        expect(toJson(component)).toMatchSnapshot();
        Object.defineProperty(navigator, 'userAgent', {
            writable: true,
            value: oldUserAgent
        });
    });

    test('calculates track percentage correctly', () => {
        const audioComponent = shallow(
            <AudioWidget
                playerSrc={'test.mp3'}
                onEnded={empty}
                onTimeUpdate={empty}
            />);
        expect(audioComponent.instance().calculateElapsedPercentage(13, 133)).toBe("9.77");
    });

    test('converts seconds to human readable time', () => {
        const audioComponent = shallow(
            <AudioWidget
                playerSrc={'test.mp3'}
                onEnded={empty}
                onTimeUpdate={empty}
            />);

        expect(audioComponent.instance().convertToReadableTime(11234)).toBe('3u 7m 14s');
    });

    test('initial audio state is called by canplay event', () => {
        const spy = jest.spyOn(AudioWidget.prototype, 'setInitialAudioState');
        const audioComponent = mount(
            <AudioWidget
                playerSrc={'test.mp3'}
                onEnded={empty}
                onTimeUpdate={empty}
            />);
        const audioEl = audioComponent.find('audio');
        audioEl.simulate('canplay');
        expect(spy).toHaveBeenCalled();
    });

    test('handleOnTimeUpdate is called by timeupdate event', () => {
        const spy = jest.spyOn(AudioWidget.prototype, 'handleOnTimeUpdate');
        const audioComponent = mount(
            <AudioWidget
                playerSrc={'test.mp3'}
                onEnded={empty}
                onTimeUpdate={empty}
            />);
        const audioEl = audioComponent.find('audio');

        audioEl.simulate('timeupdate');
        expect(spy).toHaveBeenCalled();
    });

    test('displays loader on buffering/seeking', () => {
        const audioComponent = mount(
            <AudioWidget
                playerSrc={'test.mp3'}
                onEnded={empty}
                onTimeUpdate={empty}
            />);
        const audioEl = audioComponent.find('audio');

        audioEl.simulate('seeking');
        expect(audioComponent.state('buffering')).toBe(true);

        audioEl.simulate('seeked');
        expect(audioComponent.state('buffering')).toBe(false);
    });

    test('updates track time when progress bar is changed', () => {
        const spy = jest.spyOn(AudioWidget.prototype, 'handleUpdateElapsedTime');
        const audioComponent = mount(
            <AudioWidget
                playerSrc={'test.mp3'}
                onEnded={empty}
                v            />);

        audioComponent.find('audio');

        audioComponent.find('input').simulate('change', { target: { value: 75 }});
        expect(spy).toHaveBeenCalled();
    });

    test('can calculate elapsed time from percentage', () => {
        const audioComponent = mount(
            <AudioWidget
                playerSrc={'test.mp3'}
                onEnded={empty}
                onTimeUpdate={empty}
            />);

        Object.defineProperty(audioComponent.instance().audioPlayer, 'duration', {
            writable: true,
            value: 333
        });

        expect(audioComponent.instance().getElapsedTimeFromPercentage(33)).toBe(109.89);
    });

    test('callback functions are called', () => {
        const spy1 = jest.fn();
        const spy2 = jest.fn();
        const spy3 = jest.fn();
        const spy4 = jest.fn();
        const spy5 = jest.fn();
        const spy6 = jest.fn();
        const spy7 = jest.fn();
        const spy8 = jest.fn();
        const audioComponent = shallow(
            <AudioWidget
                playerSrc={'test.mp3'}
                onLoad={spy1}
                onCanPlay={spy2}
                onLoadStart={spy3}
                onLoadedData={spy4}
                onSeeked={spy5}
                onEnded={spy6}
                onSeeking={spy7}
                onTimeUpdate={spy8}
            />);
        audioComponent.instance().audioPlayer = {
            currentTime: 0,
            duration: 0
        };
        audioComponent.instance().handleOnLoad();
        expect(spy1).toHaveBeenCalled();
        audioComponent.instance().handleOnCanPlay();
        expect(spy2).toHaveBeenCalled();
        audioComponent.instance().handleOnLoadStart();
        expect(spy3).toHaveBeenCalled();
        audioComponent.instance().handleOnLoadedData();
        expect(spy4).toHaveBeenCalled();
        audioComponent.instance().handleOnSeeked();
        expect(spy5).toHaveBeenCalled();
        audioComponent.instance().handleOnEnded();
        expect(spy6).toHaveBeenCalled();
        audioComponent.instance().handleOnSeeking();
        expect(spy7).toHaveBeenCalled();
        audioComponent.instance().handleOnTimeUpdate();
        expect(spy8).toHaveBeenCalled();
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
        expect(spy3).toHaveBeenCalledTimes(1);
        expect(spy4).toHaveBeenCalledTimes(1);
        expect(spy5).toHaveBeenCalledTimes(1);
        expect(spy6).toHaveBeenCalledTimes(1);
        expect(spy7).toHaveBeenCalledTimes(1);
        expect(spy8).toHaveBeenCalledTimes(1);
    });

});
