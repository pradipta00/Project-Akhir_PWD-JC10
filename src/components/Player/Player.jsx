import React from 'react'
import './Footer.css'

import { Row, Col, Icon, Slider, Button } from 'antd'
import ReactHowler from 'react-howler';

const noVolumeSVG = _ => <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-off" className="svg-inline--fa fa-volume-off fa-w-8" style={{width : '100%'}} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M215 71l-89 89H24a24 24 0 0 0-24 24v144a24 24 0 0 0 24 24h102.06L215 441c15 15 41 4.47 41-17V88c0-21.47-26-32-41-17z"></path></svg>
const fullVolumeSVG = _ => <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-up" className="svg-inline--fa fa-volume-up fa-w-18" style={{width : '100%'}} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path></svg>
const halfVolumeSVG = _ => <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-down" className="svg-inline--fa fa-volume-down fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M215.03 72.04L126.06 161H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V89.02c0-21.47-25.96-31.98-40.97-16.98zm123.2 108.08c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 229.28 336 242.62 336 257c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.87z"></path></svg>

const NoVolume = props => <Icon {...props} component={noVolumeSVG} />
const FullVolume = props => <Icon {...props} component={fullVolumeSVG} />
const HalfVolume = props => <Icon {...props} component={halfVolumeSVG} />

class Player extends React.Component {

    state = {
        playlist : ["http://localhost:8080/music/music.mp3",'https://goldfirestudios.com/proj/howlerjs/sound.ogg'],
        currTrack : 0,
        playing : false,
        totalDuration : 0,
        nowDuration : 0,
        volume : 1,
    }
    
    timestamp = (time) => {
        var mins = "0" + ~~(time / 60)
        var second = "0" + (time - (mins * 60))
        return `${mins.slice(-2)}:${second.slice(-2)}`
    }
    
    onPlay = () => {
        console.log('onplay kepanggil')
        this.setState({ totalDuration : Math.floor(this.refs.player.duration())})
    }

    onLoad = () => {
        this.interval = setInterval( _ => {
            if(this.state.nowDuration < this.state.totalDuration && this.state.playing){
                this.setState({ nowDuration : this.state.nowDuration+1 })
            }
        } , 1000)
    }

    setSeek = (val) => {
        this.setState({nowDuration : val})
        this.refs.player.seek(val)
    }

    setVolume = val => {
        this.setState({volume : val})
    }

    rewind = () => {
        if(this.state.nowDuration > 3) {
            this.setSeek(0)
        } else {
            if(this.state.currTrack > 0){
                this.setState({currTrack : this.state.currTrack-1})
                this.setState({nowDuration : 0})
                clearInterval(this.interval)
            }else { this.setSeek(0) }
        }
    }

    next = () => {
        if(this.state.currTrack < this.state.playlist.length - 1) {
            this.setState({currTrack : this.state.currTrack+1})
        }else {
            this.setState({ currTrack : 0 })
        }
            this.setState({nowDuration : 0})
            clearInterval(this.interval)
    }

    pause = () => this.setState({playing : !this.state.playing})


    render(){
    return (
        <div>
            <ReactHowler 
                src={this.state.playlist[this.state.currTrack]}
                playing={this.state.playing}
                ref={'player'}
                onLoad={this.onLoad}
                onPlay={this.onPlay}
                loop={false}
                volume={this.state.volume}
                onEnd={this.next}
            />

            <Row type="flex" justify='center' className='Main-Player my-auto'>
                <Col span={1}>
                    <img src="http://localhost:8080/thumbnail/images.jpg" alt="" style={{ width : '80%' }} />
                </Col>
                
                <Col span={2}>
                    <span type="link" className="overflow-text">Happier (Azetto Remix) Ft. Martin Garrix</span>
                    <span type="link" className="overflow-text">Ed Sheeran</span>
                </Col>
                
                <Col span={3} offset={1} className='my-auto py-auto' >
                    <Icon type="step-backward" className='button-foot' onClick={this.rewind} />
                    <Icon type={this.state.playing ? 'pause-circle' : 'play-circle'} className='button-foot' onClick={this.pause} />
                    <Icon type="step-forward" className='button-foot' onClick={this.next} />
                </Col>

                <Col span={10} offset={1} className='my-auto py-auto'  >
                    <Row type="flex" justify='space-between'>
                        <Col span={2} className='my-auto color-white'>
                            <span>{this.timestamp(this.state.nowDuration)}</span>
                        </Col>
                        <Col span={18}>
                            <Slider tipFormatter={null} max={this.state.totalDuration} step={1} value={this.state.nowDuration} onChange={this.setSeek} />
                        </Col>
                        <Col span={2} className='my-auto color-white'>
                            <span>{this.timestamp(this.state.totalDuration)}</span>
                        </Col>
                    </Row>
                </Col>
                
                <Col span={3} offset={3} className='my-auto lead-col'>
                    <div className='icon-custom' onClick={_ => this.setState({volume : 0})}>
                        {   
                        !this.state.volume ? <NoVolume /> : this.state.volume > 0.5 ? <FullVolume/> : <HalfVolume/>
                        }
                    </div>
                    <div className="cutoman">
                        <Slider tipFormatter={null} max={1} step={0.01} onChange={this.setVolume} value={this.state.volume} />
                    </div> 
                </Col>
            </Row>
        </div>
    )}
}
export default Player