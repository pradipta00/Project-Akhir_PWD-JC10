import React, { useEffect, useState, useContext } from 'react'
import { List, Typography, Icon, PageHeader, Button } from 'antd'
import { music, files } from '../../services'
import { GlobalState } from '../../Core'

const Main = props => {
    
    const [Data, setData] = useState([])
    const { id, name, type, dismiss } = props

    useEffect(() => {
        if (type === 'Album') music.Get('music_artist', null, id).then(res => setData(res)).catch(err => console.trace(err))
        if (type === 'Genre') music.Get('music_genre', id).then(res => setData(res)).catch(err => console.trace(err))
    }, [id, type])

    const { setPlaylist } = useContext(GlobalState)

    return (
        <div style={{ position : 'relative' }}>  
            <PageHeader onBack={dismiss} title={type} subTitle={name} style={{ position: 'absolute', top: 0, left: 0 }} />
            
            <div style={{ height : '10rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection : 'column',
             marginBottom : '1rem', backgroundColor : '#fff', backgroundImage : 'linear-gradient(246deg, #4d463b 0%, #97887f 100%)'}} >
                <Typography.Title style={{ color : '#f7f7f7' }} >
                    { name }
                </Typography.Title>
                <Button type='primary' onClick={_=> setPlaylist(Data)} >Play all</Button>
            </div>

            <List
                dataSource={Data}
                style={{ maxWidth : '70vw', margin : 'auto' }}
                grid={{column : 1}}
                renderItem={item => (
                <List.Item style={{ marginBottom : '1.7rem' }} className='list-music' >
                    <List.Item.Meta
                    avatar={<img src={files.thumbnail(item.thumbnail)} alt='' style={{width: '5vw'}} />}
                    description={
                    <>
                        <div style={{ float: 'left', margin: 'auto 0' }} >
                            <Typography.Title level={3} style={{ color : '#f7f7f7', marginBottom: '0.6rem' }} >{ item.title }</Typography.Title>
                            <Typography.Text style={{ color : '#f7f7f7' }} >{ item.artist_name }</Typography.Text>
                        </div>
                        <div style={{ float: 'right', margin: '8px auto' }} >
                            <Icon type="menu-fold" className='button-foot' style={{fontSize : "3rem"}} onClick={_ => setPlaylist(e => [...e, item])} />
                            <Icon type="play-circle" className='button-foot' style={{fontSize : "3rem"}} onClick={_ => setPlaylist([item])} />
                        </div>
                    </>}
                    />
                </List.Item>
            )} />
        </div>
    )
}

export default Main