import React, { useEffect, useState } from 'react'

import { Input, Button, Row, Col, Form, Icon, Select, Upload, message } from 'antd'
import { music } from '../../services'

const Test = () => {

    useEffect(() => {
        music.Get('artist').then( res => setData( val =>( { ...val, artist : res} )) ).catch( err => console.log(err) );
        music.Get('album').then( res => setData( val => ( {...val, album : res} )) ).catch( err => console.log(err) );
        music.Get('genre').then( res => setData( val => ( {...val, genre : res} )) ).catch( err => console.log(err) );
    }, [])

    const [Data, setData] = useState({artist : [], album : [], genre : []});
    const [_artist, set_artist] = useState('')
    const [_album, set_album] = useState('')
    const [_genre, set_genre] = useState('')
    const [_title, set_title] = useState('')
    const [_albumId, set_albumId] = useState('')
    const [UploadMusic, setUploadMusic] = useState([])
    const [UploadThumbnail, setThumbnail] = useState([])


    const task = {
        add : (table, value) => {
            let send = { table, value }
            music.Insert(send).then( res => res.status === 200 ? message.success('New data added Succesfully') : message.warning('Data failed to be added!') ).catch( err => console.log(err) )
        },
        Thumbnail : async () => {
            let formData = new FormData()
            let result = ''
            formData.append('thumbnail', UploadThumbnail[0])
            await music.UploadThumbnail(formData)
                .then( res => result = res )
                .catch( err => console.log(err) );
            return result
        },
        Music : async () => {
            let formData = new FormData()
            let result = ''
            formData.append('music', UploadMusic[0])
            await music.UploadMusic(formData)
                .then( res => result = res )
                .catch( err => console.log(err) );
            return result
        },
        UploadFile : async _ => {
            let ThumbFilename = await task.Thumbnail();
            let MusicFilename = await task.Music();
            let data = {
                table : 'music',
                filename : MusicFilename,
                thumbnail : ThumbFilename,
                title : _title,
                albumId : _albumId
            }
            // music.Insert(data).then(msg => console.trace(msg)).catch(err => console.trace(err))
            console.log(data)
        }
    }

    let uploadProps = data => ({
        accept : data==='music' ? 'mp3' : 'image/*'  ,
        multiple : false,
        fileList : data==='music' ? UploadMusic : UploadThumbnail ,
        beforeUpload : file => {
            if (data === 'music'){
                if (!UploadMusic.length) setUploadMusic([file]);
                else message.error('You already set a file!')
            }
            if (data === 'thumbnail'){
                if (!UploadThumbnail.length) setThumbnail([file]);
                else message.error('You already set a file!')
            }
            return false
        }
    })

    return (
        <>
        <Row>
            <Col span={20} offset={2} >
                
                <h2 style={{color : 'white'}} >Insert Music</h2>
                <Form layout="inline" >
                    <Form.Item>
                        <Input type='text' placeholder="Song Title" value={_title} onChange={e => set_title(e.target.value) } />
                    </Form.Item>
                    <Form.Item>
                        <Select 
                            showSearch
                            placeholder='Song album'
                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 }
                            style={{minWidth : '10rem'}}
                            onChange={e => set_albumId(e) }
                        >
                            {Data.album.map(item => <Select.Option key={item.id} value={item.id} >{item.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Upload {...uploadProps('music')} >
                            <Button>
                                <Icon type='upload'/> Upload Music
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Upload {...uploadProps('thumbnail')} >
                            <Button>
                                <Icon type='upload'/> Upload Thumbnail
                            </Button>
                        </Upload>
                    </Form.Item>
                </Form>
                <Button type="primary" onClick={task.UploadFile} >Insert Music</Button>
                
                <br/><br/>
                
                <Row>
                    <Col span={8} >
                        <h2 style={{color : 'white'}} >Insert Artist</h2>
                        <Form layout='inline' >
                            <Form.Item validateStatus={_artist ? '' : 'error'} >
                                <Input  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Artist"
                                value={_artist} onChange={ e => set_artist(e.target.value) } />
                            </Form.Item>
                            <Form.Item >
                                <Button type='secondary' disabled={_artist ? false : true}
                                    onClick={() => task.add('artist', _artist)} >
                                    Add Artist
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={8} >
                        <h2 style={{color : 'white'}} >Insert Album</h2>
                        <Form layout='inline' >
                            <Form.Item validateStatus={_album ? '' : 'error'} >
                                <Input  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Artist"
                                value={_album} onChange={ e => set_album(e.target.value) } />
                            </Form.Item>
                            <Form.Item >
                                <Button type='secondary' disabled={_album ? false : true}
                                    onClick={() => task.add('album', _album)} >
                                    Add Album
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={8} >
                        <h2 style={{color : 'white'}} >Insert Genre</h2>
                        <Form layout='inline' >
                            <Form.Item validateStatus={_genre ? '' : 'error'} >
                                <Input  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Artist"
                                value={_genre} onChange={ e => set_genre(e.target.value) } />
                            </Form.Item>
                            <Form.Item >
                                <Button type='secondary' disabled={_genre ? false : true}
                                    onClick={() => task.add('genre', _genre)} >
                                    Add Album
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
        </>
    )
}

export default Test