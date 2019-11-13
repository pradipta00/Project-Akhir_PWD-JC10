import React, { useState, useRef, useEffect, useContext } from 'react'
import { Row, Col, Icon, Slider, message, Drawer, List, Typography, Button } from 'antd'
import { Redirect } from 'react-router-dom'
import ReactHowler from 'react-howler';
import moment from 'moment'

import { GlobalState } from '../../Core'
import { files, music } from '../../services'
import './Player.css'

const { Paragraph, Text } = Typography

const Custom = {
    noVolumeSVG : _ => <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-off" className="svg-inline--fa fa-volume-off fa-w-8" style={{width : '100%'}} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M215 71l-89 89H24a24 24 0 0 0-24 24v144a24 24 0 0 0 24 24h102.06L215 441c15 15 41 4.47 41-17V88c0-21.47-26-32-41-17z"></path></svg>,
    fullVolumeSVG : _ => <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-up" className="svg-inline--fa fa-volume-up fa-w-18" style={{width : '100%'}} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path></svg>,
    halfVolumeSVG : _ => <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-down" className="svg-inline--fa fa-volume-down fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M215.03 72.04L126.06 161H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V89.02c0-21.47-25.96-31.98-40.97-16.98zm123.2 108.08c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 229.28 336 242.62 336 257c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.87z"></path></svg>,
    
    NoVolume : props => <Icon {...props} component={Custom.noVolumeSVG} />,
    FullVolume : props => <Icon {...props} component={Custom.fullVolumeSVG} />,
    HalfVolume : props => <Icon {...props} component={Custom.halfVolumeSVG} />
}

let timestamp = (time) => {
    var mins = "0" + ~~(time / 60)
    var second = "0" + (time - (mins * 60))
    return `${mins.slice(-2)}:${second.slice(-2)}`
}

const useCompare = (val) => {
    const prevVal = usePrevious(val)
    if (prevVal)
        return prevVal.length + 1 !== val.length
}

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

const Player = () => {
    const [Current, setCurrent] = useState(0);
    const [Playing, setPlaying] = useState(false);
    const [TotalDuration, setTotalDuration] = useState(0);
    const [Duration, setDuration] = useState(0);
    const [Volume, setVolume] = useState(1);
    
    const [Loading, setLoading] = useState(false)
    const [RedirToThis, setRedirToThis] = useState(false)
    const [Draw, setDraw] = useState(false)
    
    const Player = useRef(null)

    const { Playlist, User, setPlaylist } = useContext(GlobalState)

    const Control = {
        play : _ => {
            if (User.limit) {message.warning('You have reached maximum listen limit for today'); setRedirToThis('/pricing')}
            else if (User) setPlaying(e => !e);
            else message.warning('Please login to start listening')
        },
        seek : val => {
            setDuration(val);
            Player.current.seek(val)
        },
        rewind : _ => {
            if( Duration < 5 && Current ) 
                { setCurrent(e => e-1); setLoading(true) }
            else 
                Control.seek(0);
        },
        next : _ => {
            if ( Current+1 === Playlist.length ) 
                setCurrent(0)
            else 
                setCurrent(e => e+1)
            setDuration(0);
            if ( Playlist.length > 1 ) setLoading(true)
        },
        fileLoad : _ => {
            setTotalDuration(Math.floor(Player.current.duration()))
            setLoading(false);
            let data = {
                table : 'views',
                musicId : Playlist[Current].id,
                userId : User.id,
                date : moment( new Date() ).format('YYYY-MM-DD HH:mm:ss')
            }
            if (User && !User.limit) music.Insert(data).catch( err => console.log(err))
        },
        delete : (id) => {
            setPlaylist(e => e.filter(item => item.id !== id))
        },
    }

    const PlaylistChanged = useCompare(Playlist)

    useEffect(() => {
        const durationInterval = setInterval(_ => {
            let localDuration = 0;
            if(Playing && localDuration < TotalDuration && !Loading) setDuration(e => { localDuration = e++; return e })
        }, 1000)
        return () => {
            clearInterval(durationInterval)
        };
    }, [Playing, setDuration, TotalDuration, Loading])

    useEffect(() => {
        if (PlaylistChanged){
            setLoading(true);
            Control.seek(0);
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [PlaylistChanged, Playlist])
    
    useEffect(() => {
        setTimeout(_ => {
            setLoading(false)
        }, 1000)
    }, [])
    
    return (
        <React.Fragment>
            {RedirToThis ? <Redirect to={RedirToThis} /> : null}
            <ReactHowler 
                ref={Player}
                src={files.music(Playlist[Current].filename || '.mp3')}
                onLoad={Control.fileLoad}
                onEnd={Control.next}
                playing={Playing}
                loop={false}
                volume={Volume}
            />
            
            <Row type="flex" justify='center' className='Main-Player my-auto'>
                <Col span={1}>
                    <img src={ files.thumbnail(Playlist[Current].thumbnail || 'null.png') } alt="" style={{ width : '80%' }} />
                </Col>
                
                <Col span={2}>
                    <span type="link" className="overflow-text bold">{Playlist[Current].title || 'Play a song'}</span>
                    <span type="link" className="overflow-text">{Playlist[Current].artist_name || 'Start listening'}</span>
                </Col>
                
                <Col span={3} offset={1} className='my-auto py-auto' >
                    <Icon type="step-backward" className='button-foot' onClick={Control.rewind} />
                    <Icon type={Loading ? 'loading' : Playing ? 'pause-circle' : 'play-circle'} className='button-foot' onClick={Control.play} />
                    <Icon type="step-forward" className='button-foot' onClick={Control.next} />
                </Col>

                <Col span={10} offset={1} className='my-auto py-auto'  >
                    <Row type="flex" justify='space-between'>
                        <Col span={2} className='my-auto color-white'>
                            <span>{timestamp(Duration)}</span>
                        </Col>
                        <Col span={18}>
                            <Slider tipFormatter={null} max={TotalDuration} step={1} value={Duration} onChange={Control.seek} />
                        </Col>
                        <Col span={2} className='my-auto color-white'>
                            <span>{timestamp(TotalDuration)}</span>
                        </Col>
                    </Row>
                </Col>
                
                <Col span={3} offset={3} className='my-auto lead-col'>
                    <Icon type='unordered-list' onClick={_ => setDraw(true)} style={{ color : '#fff', margin : 'auto 1em', fontSize : '1rem' }} />
                    <div className='icon-custom' onClick={_ => setVolume(e => e ? 0 : 100)} >
                        {   
                        !Volume ? <Custom.NoVolume /> : Volume > 0.5 ? <Custom.FullVolume/> : <Custom.HalfVolume/>
                        }
                    </div>
                    <div className="cutoman">
                        <Slider tipFormatter={null} max={1} step={0.01} onChange={val => setVolume(val)} value={Volume} />
                    </div> 
                </Col>
            </Row>

            <Drawer
                title="Playlist"
                placement="right"
                closable={false}
                onClose={_ => setDraw(false)}
                visible={Draw}
                width={374}
                >
                    <List
                    size="large"
                    dataSource={Playlist}
                    renderItem={(item, index) => 
                    <><List.Item style={{ justifyContent : 'space-between' }} >
                        <div style={{ display : 'flex' }} >
                            <img src={files.thumbnail(item.thumbnail)} alt='' style={{ width : '4rem' }} />
                            <Paragraph style={{ margin : 'auto 0.3em' }}>
                                <Text strong style={{ wordBreak : 'break-all' }} >{ item.title }</Text>
                                <br />  
                                { item.artist_name }
                            </Paragraph>
                        </div>
                        { Current !== index ? <Button type='danger' icon='delete' shape='circle' size='large' onClick={_=> Control.delete(item.id)} /> : ''}
                    </List.Item></>}
                    />
            </Drawer>
        </React.Fragment>
    )

}

export default Player