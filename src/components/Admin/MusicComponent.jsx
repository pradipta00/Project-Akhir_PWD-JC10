import React, { useEffect, useState, useContext, createContext } from 'react'

import { Input, Button, Row, Col, Icon, Select, Upload, message, Table, Modal, Typography } from 'antd'
import { music, files } from '../../services'

const { Title } = Typography;

const Main = () => {

    useEffect(() => {
        refresh()
    },[])

    const refresh = async () => {
        setData( await task.get() )
    }
    
    const [Data, setData] = useState({artist : [], album : [], genre : [], c_artist : [], c_genre : [], music : []});

    return (
        <>
        <Row>
            <Col span={20} offset={2} >
                <br/><br/>
                <TableIndependent Data={Data} refresh={refresh} />
                <br/><br/>
                <TableConnector Data={Data} refresh={refresh} />
                <br/><br/>
                <TableMusic Data={Data} refresh={refresh} />
                <br/><br/>
            </Col>
        </Row>
        </>
    )
}   

const TableIndependent = props => {

    const [_artist, set_artist] = useState('')
    const [_album, set_album] = useState('')
    const [_genre, set_genre] = useState('')

    const colProps = data => ([
        { title : data, dataIndex : 'name', sorter: (a, b) => a.name.length - b.name.length }, 
        { title : 'Action', dataIndex : 'id', render : id => <Button type='danger' ghost onClick={ _ => { task.Delete(data, id).then( _ => props.refresh() ) }} >Delete</Button>, width : 80 }])

    let listArtist = _ => (
    <Row gutter={4} >
        <Col span={18} >
            <Input type="text" placeholder="Artist" value={_artist}
            onChange={ e => set_artist(e.target.value) } />
        </Col>
        <Col span={6} >
            <Button onClick={() => {task.Add('artist', _artist); set_artist(''); props.refresh() }} >
                Insert
            </Button>
        </Col>
    </Row>)

    let listGenre = _ => (
    <Row gutter={4} >
        <Col span={18} >
            <Input type="text" placeholder="Insert new Genre" value={_genre}
            onChange={ e => set_genre(e.target.value) } />
        </Col>
        <Col span={6} >
            <Button onClick={() => {task.Add('genre', _genre); set_genre(''); props.refresh() }} >
                Insert
            </Button>
        </Col>
    </Row>)

    let listAlbum = _ => (
    <Row gutter={4} >
        <Col span={18} >
            <Input type="text" placeholder="Insert new Album" value={_album}
            onChange={ e => set_album(e.target.value) } />
        </Col>
        <Col span={6} >
            <Button onClick={() => {task.Add('album', _album); set_album(''); props.refresh() }} >
                Insert
            </Button>
        </Col>
    </Row>)

    return (
        <Row gutter={10} >
            <Col span={8} >
                <Title level={3} style={{color : '#222'}} >Insert Artist</Title>
                <Table
                    rowKey='id'
                    columns = {colProps('Artist')}
                    scroll={{ y : 250 }}
                    dataSource = {props.Data.artist}
                    tableLayout = 'fixed'
                    title = {listArtist}
                    size = 'small'
                    style={{backgroundColor : 'white'}}
                />
            </Col>
            <Col span={8} >
                <Title level={3} style={{color : '#222'}} >Insert Album</Title>
                <Table
                    rowKey='id'
                    columns = {colProps('Album')}
                    dataSource = {props.Data.album}
                    tableLayout = 'fixed'
                    scroll={{ y : 250 }}
                    title = {listAlbum}
                    size = 'small'
                    style={{backgroundColor : 'white'}}
                />
            </Col>
            <Col span={8} >
                <Title level={3} style={{color : '#222'}} >Insert Genre</Title>
                <Table
                    rowKey='id'
                    columns = {colProps('Genre')}
                    dataSource = {props.Data.genre}
                    tableLayout = 'fixed'
                    scroll={{ y : 250 }}
                    title = {listGenre}
                    size = 'small'
                    style={{backgroundColor : 'white'}}
                />
            </Col>
        </Row>)
}

const TableConnector = props => {

    const [connArtist, setconnArtist] = useState({})
    const [connGenre, setconnGenre] = useState({})
    
    const { artist, genre, music, c_artist, c_genre } = props.Data;

    const colProps = data => {
        if ( data === 'conn_music_genre' ) return [
            { title : 'Music', dataIndex : 'title', width : '40%' }, 
            { title : 'Genre', dataIndex : 'name', width : '40%' }, 
            { title : 'Action', dataIndex : ['musicId', 'genreId'], render : (_, list) => (<Button type='danger' ghost onClick={ _ => { task.Delete(data, list).then( _ => props.refresh() )} }>Delete</Button>), width : 80 }
        ]
        else if (data === 'conn_music_artist') return [
            { title : 'Music', dataIndex : 'title', width : '40%' }, 
            { title : 'Artist', dataIndex : 'name', width : '40%' }, 
            { title : 'Action', dataIndex : ['musicId', 'artistId'], render : (_, list) => (<Button type='danger' ghost onClick={ _ => { task.Delete(data, list).then( _ => props.refresh() )} }>Delete</Button>), width : 80 }
        ]
    }

    let artistList = _ => 
    (<Row layout='inline' >
        <Col span={10}>
            <Select 
            showSearch
            placeholder='Music'
            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 }
            value={connArtist.musicId}
            onChange={e => setconnArtist( m => ({...m, musicId : e}) )}
            style={{minWidth : '13rem'}}>
            {music.map(item => <Select.Option key={item.id} value={item.id} >{item.title}</Select.Option>)}
            </Select>
        </Col>
        <Col span={10}>
            <Select 
            showSearch
            placeholder='Artist'
            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 }
            value={connArtist.artistId}
            onChange={e => setconnArtist( m => ({...m, artistId : e}) )}
            style={{minWidth : '13rem'}}>
            {artist.map(item => <Select.Option key={item.id} value={item.id} >{item.name}</Select.Option>)}
            </Select>
        </Col>
        <Col span={4}>
            <Button onClick={_ => {task.AddConnector( 'conn_music_artist', connArtist );setconnArtist({}) ;props.refresh() }} >Add</Button>
        </Col></Row>)

    let genreList = _ => 
    (<Row gutter={10} >
        <Col span={10}>
        <Select 
            showSearch
            placeholder='Music'
            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 }
            value={connGenre.musicId}
            onChange={e => setconnGenre( m => ({...m, musicId : e}) )}
            style={{minWidth : '100%'}}>
            {music.map(item => <Select.Option key={item.id} value={item.id} >{item.title}</Select.Option>)}
        </Select>
        </Col>
        <Col span={10} >
        <Select 
            showSearch
            placeholder='Genre'
            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 }
            style={{minWidth : '100%'}}
            value={connGenre.genreId}
            onChange={e => setconnGenre( m => ({...m, genreId : e}) )}
            >
            {genre.map(item => <Select.Option key={item.id} value={item.id} >{item.name}</Select.Option>)}
        </Select>
        </Col>
        <Col span={4}>
            <Button onClick={_ => {task.AddConnector( 'conn_music_genre', connGenre );setconnGenre({}) ;props.refresh() }} >Add</Button>
        </Col>
    </Row>)

    return (
        <Row gutter={20} >
            <Col span={12} >
                <Title level={3} style={{color : '#222'}} > Table Connector Music - Artist </Title>
                <Table
                    rowKey={rec => rec.musicId.toString() + rec.artistId.toString() }
                    columns = {colProps('conn_music_artist')}
                    scroll={{ y : 250 }}
                    dataSource = {c_artist}
                    tableLayout = 'fixed'
                    title = {artistList}
                    size = 'small'
                    style={{backgroundColor : 'white'}}
                />
            </Col>
            <Col span={12} >
                <Title level={3} style={{color : '#222'}} > Table Connector Music - Genre </Title>
                <Table
                    rowKey={rec => rec.musicId.toString() + rec.genreId.toString()}
                    columns = {colProps('conn_music_genre')}
                    scroll={{ y : 250 }}
                    dataSource = {c_genre}
                    tableLayout = 'fixed'
                    title = {genreList}
                    size = 'small'
                    style={{backgroundColor : 'white'}}
                />
            </Col>
        </Row>
    )
}

const InputMusic = props => {

    const [_title, set_title] = useState('')
    const [_albumId, set_albumId] = useState()

    const [UploadMusic, setUploadMusic] = useState([])
    const [UploadThumbnail, setThumbnail] = useState([])

    let upload = async _ => {
        task.UploadFile(_title, _albumId, UploadThumbnail[0], UploadMusic[0])
        .then( _ => props.refresh() )
        .then( _ => { set_title(''); set_albumId(); setThumbnail([]); setUploadMusic([]) })
    }

    let uploadProps = data => ({
        accept : data==='music' ? '.mp3' : 'image/*'  ,
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
        <Row gutter={20} >
            <Col span={5} offset={1} >
                <Input type='text' placeholder="Song Title" value={_title} onChange={e => set_title(e.target.value) } />
            </Col>
            <Col span={6} >
                <Select 
                    showSearch
                    placeholder='Song album'
                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 }
                    style={{minWidth : '100%'}}
                    value={_albumId}
                    onChange={e => set_albumId(e) }
                >
                    {props.album.map(item => <Select.Option key={item.id} value={item.id} >{item.name}</Select.Option>)}
                </Select>
            </Col>
            <Col span={4} >
                <Upload {...uploadProps('music')} onRemove={_=> setUploadMusic([])} >
                    <Button>
                        <Icon type='upload'/> Upload Music
                    </Button>
                </Upload>
            </Col>
            <Col span={4} >
                <Upload {...uploadProps('thumbnail')} onRemove={_=> setThumbnail([])} >
                    <Button>
                        <Icon type='upload'/> Upload Thumbnail
                    </Button>
                </Upload>
            </Col>
            <Col span={4} >
                <Button type="primary" onClick={upload} >Insert Music</Button>
            </Col>
        </Row>
    )
}

const passInput = createContext()
const TableMusic = props => {

    let init = { title : '', albumId : '', filename : [], thumbnail : [] }

    const [EditThis, setEditThis] = useState('')
    const [UserInput, setUserInput] = useState(init)

    const { Data, refresh } = props
    const Columns = [
        { title : 'Title', dataIndex : 'title', onCell: record => ({ title : 'title', value : record['title'], editing: EditThis === record.id }) },
        { title : 'Album', dataIndex : ['Album', 'albumId'],
            onCell: record => 
                ({ title : 'albumId', 
                  value : record['albumId'], 
                  editing: EditThis === record.id }) ,
            render : (_, list) => ( <>{list.Album}</> )
        },
        { title : 'Filename', dataIndex : 'filename', onCell: record => ({ title : 'filename', value : record['filename'], editing: EditThis === record.id }) },
        { title : 'Thumbnail', dataIndex : 'thumbnail', onCell: record => ({ title : 'thumbnail', value : record['thumbnail'], editing: EditThis === record.id }) },
        { title : 'Action', dataIndex : ['musicId', 'artistId'],
        render : (_, list) => (
            list.id !== EditThis ?
            <>
                <Button type='primary' disabled={ EditThis ? true : false } ghost onClick={ _ => setEditThis(list.id) }>Edit</Button>
                &nbsp;&nbsp;
                <Button type='danger' disabled={ EditThis ? true : false } ghost onClick={ _ => task.Delete('music', list).then(_=> refresh()) }>Delete</Button>
            </> 
            : <>
                <Button type='primary' ghost onClick={doEdit}>Save</Button>
                &nbsp;&nbsp;
                <Button type='link' color='#e03d4d' onClick={ _ => setEditThis('') }>Cancel</Button>
            </> 
        )}
    ]

    let doEdit = async _ => {
        if ( await task.Update({ ...UserInput, id : EditThis }) ) {
            console.log('baru ini')
            refresh();
            setEditThis('');
            setUserInput(init)
        }
    }
    
    return (
        <Row gutter={20} >
            <passInput.Provider value={ {UserInput, setUserInput, albumList : Data.album} } >
                <Col span={24}>
                    <Title level={3} style={{color : '#222'}} > Table Music </Title>
                    <Table
                        rowKey='id'
                        title = { () => <InputMusic refresh={refresh} album={Data.album} /> }
                        style={{ backgroundColor : 'white', paddingRight: '10px' }}
                        columns = {Columns}
                        dataSource = {Data.music}
                        components = {{ body : { cell : CellEdit } }}
                        />
                </Col>
            </passInput.Provider>
        </Row>
    )
}

const CellEdit = props => {
    const { children, editing, value, title } = props;
    const { setUserInput, UserInput, albumList } = useContext(passInput)

    const change = e => {
        let eValue = e.target.value
        setUserInput( all => ({ ...all, [title]: eValue }) )
    }

    let uploadProps = data => ({
        accept : data === 'music' ? '.mp3' : 'image/*'  ,
        multiple : false,
        fileList : data === 'music' ? UserInput['filename'] : UserInput['thumbnail'] ,
        beforeUpload : file => {
            if (data === 'music'){
                if (!UserInput['filename'].length) setUserInput( e => ({ ...e, filename : [file] }))
                else message.error('You already set a file!')
            }
            if (data === 'thumbnail'){
                if (!UserInput['thumbnail'].length) setUserInput(e => ({ ...e, thumbnail : [file] }))
                else message.error('You already set a file!')
            }
            return false
        }
    })

    if (!editing) 
        return ( <td> {children} </td> )
    else if ( title === 'filename' ) 
        return <td><Upload {...uploadProps('music')} onRemove={_=> setUserInput(e => ({...e, filename : []})) } ><Button><Icon type='upload'/> Upload Music</Button></Upload></td>
    else if ( title === 'thumbnail' ) 
        return <td><Upload {...uploadProps('thumbnail')} onRemove={_=> setUserInput(e => ({...e, thumbnail : []})) } ><Button><Icon type='upload'/> Upload Thumbnail</Button></Upload></td>
    else if ( title === 'albumId' )
        return <td>
            <Select 
                showSearch
                placeholder='Song album'
                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 }
                style={{minWidth : '100%'}}
                defaultValue={value}
                onChange={e => setUserInput( init => ({ ...init, albumId : e }) ) }
            >
                {albumList.map(item => <Select.Option key={item.id} value={item.id} >{item.name}</Select.Option>)}
            </Select>
        </td>
    else 
        return <td><Input defaultValue={value} onChange={change} /></td>

}

const task = {  
    get : async _ => {
        let newValue = {}
        await music.Get('music_album').then( res => newValue.music = res )
        await music.Get('artist').then( res => newValue.artist = res )
        await music.Get('album').then( res => newValue.album = res )
        await music.Get('genre').then( res => newValue.genre = res )
        await music.Get('conn_music_genre').then( res => newValue.c_genre = res )
        await music.Get('conn_music_artist').then( res => newValue.c_artist = res )
        return newValue
    },
    Add : (table, value) => {
        let send = { table, value }
        music.Insert(send).then( res => res.status === 200 ? message.success('New data added Succesfully') : message.warning('Data failed to be added!') )
        .catch( err => console.trace(err))
    },
    AddConnector : (table, val) => {
        let send = { table, ...val }
        music.Insert(send).then( res => res.status === 200 ? message.success('New data added Succesfully') : message.warning('Data failed to be added!') )
        .catch( err => console.trace(err) )
    },
    Thumbnail : async file => {
        let formData = new FormData()
        formData.append('thumbnail', file)

        let result = ''
        await files.UploadThumbnail(formData)
            .then( res => result = res )
            .catch( err => console.trace(err) );
        return result
    },
    Music : async file => {
        let formData = new FormData()
        formData.append('music', file)
        
        let result = ''
        await files.UploadMusic(formData)
            .then( res => result = res )
            .catch( err => console.trace(err) );
        return result
    },
    UploadFile : async (title, albumId, thumbnail, filename) => {
        let ThumbFilename = await task.Thumbnail(thumbnail);
        let MusicFilename = await task.Music(filename);
        let data = {
            table : 'music',
            filename : MusicFilename,
            thumbnail : ThumbFilename,
            title,
            albumId
        }
        return new Promise((resolve, reject) => {
            music.Insert(data).then(msg => {
                if (msg.data.ok) {
                    message.success('Add Data Success')
                    resolve()
                }else {
                    task.DeleteFile(data)
                    message.error('Failed to insert data. Check console')
                }
            }).catch(err => console.trace(err))
        })
    },
    Delete : (table, id) => {
        return new Promise(( resolve, reject ) => {
            Modal.confirm({
                title : 'Delete this?',
                content : `You are about to delete from ${table}`,
                onCancel(){},
                onOk(){
                    let data;
                    if (table === 'conn_music_genre' ) data = { table, id : [id.musicId, id.genreId] }
                    else if (table === 'conn_music_artist' ) data = { table, id : [id.musicId, id.artistId] }
                    else if (table === 'music') data = { table, id : id.id , thumbnail : id.thumbnail , music : id.filename }
                    else data = { table, id }
                    music.Delete(data).then( res => {
                        message.success('File deleted successfully');
                        resolve(res)
                    }).catch( res => reject(res) )
                }
            })
        })
    },
    DeleteFile : async (data) => {
        data.table = 'file'
        let m;
        await music.Delete(data).then( res => m = res ).catch( err => console.log(err) )
        return m
    },
    Update : async (data) => {
        let { title, filename, thumbnail, albumId, id } = data;

        if ( filename.length ) 
            await music.Get('music', id).then( async res => {
                await task.DeleteFile({ filename : res[0].filename })
                filename = await task.Music(filename[0]);
            })
        else filename = ''

        if ( thumbnail.length )
            await music.Get('music', id).then( async res => {
                await task.DeleteFile({ thumbnail : res[0].thumbnail })
                thumbnail = await task.Thumbnail(thumbnail[0]);
            })
        else thumbnail = ''

        await music.Update({ id, title, filename, thumbnail, albumId, table : 'music' })
        .then( _ => {message.success('File Updated Succesfully'); console.log('ini dulu')} ).catch( err => console.log(err) )

        return true
    }
}

export default Main