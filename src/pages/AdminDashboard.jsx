import React, { useEffect, useState, useContext, createContext } from 'react'

import { Input, Button, Row, Col, Icon, Select, Upload, message, Table, Modal } from 'antd'
import { music } from '../services'

const AdminDashboard = () => {

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

    const colProps = data => ([{ title : data, dataIndex : 'name' }, { title : 'Action', dataIndex : 'id', render : id => <Button type='danger' ghost onClick={ _ => { task.Delete(data, id).then( _ => props.refresh() ) }} >Delete</Button>, width : 80 }])

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
                <h2 style={{color : 'white'}} >Insert Artist</h2>
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
                <h2 style={{color : 'white'}} >Insert Album</h2>
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
                <h2 style={{color : 'white'}} >Insert Genre</h2>
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
            { title : 'Music', dataIndex : 'title' }, 
            { title : 'Genre', dataIndex : 'name' }, 
            { title : 'Action', dataIndex : ['musicId', 'genreId'], render : (_, list) => (<Button type='danger' ghost onClick={ _ => { task.Delete(data, list).then( _ => props.refresh() )} }>Delete</Button>), width : 80 }
        ]
        else if (data === 'conn_music_artist') return [
            { title : 'Music', dataIndex : 'title' }, 
            { title : 'Artist', dataIndex : 'name' }, 
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
                <h2 style={{color : 'white'}} > Table Connector Music - Artist </h2>
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
                <h2 style={{color : 'white'}} > Table Connector Music - Genre </h2>
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

    let albumlist = [ { id : -1, name : 'Single - No Album' }, ...props.album ]

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
                    {albumlist.map(item => <Select.Option key={item.id} value={item.id} >{item.name}</Select.Option>)}
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

    const [EditThis, setEditThis] = useState('')
    const [UserInput, setUserInput] = useState({ title : '', Album : '', filename : '', thumbnail : '' })

    useEffect(() => {
        console.log(UserInput)
    }, [UserInput])

    const { Data, refresh } = props
    const Columns = [
        { title : 'Title', dataIndex : 'title', 
        onCell: record => ({  record, dataIndex : 'title', editing: EditThis === record.id }) },
        { title : 'Album', dataIndex : 'Album', 
        onCell: record => ({  record, dataIndex : 'Album', editing: EditThis === record.id }) },
        { title : 'Filename', dataIndex : 'filename', 
        onCell: record => ({  record, dataIndex : 'filename', editing: EditThis === record.id }) },
        { title : 'Thumbnail', dataIndex : 'thumbnail', 
        onCell: record => ({  record, dataIndex : 'thumbnail', editing: EditThis === record.id }) },
        { title : 'Action', dataIndex : ['musicId', 'artistId'],
        render : (_, list) => (
            <>
                <Button type='primary' ghost onClick={ _ => { setEditThis(list.id) } }>Edit</Button>
                <Button type='danger' ghost onClick={ _ => { task.Delete('music', list).then(_=> refresh() ) } }>Delete</Button>
            </>
        )}
    ]
    
    
    return (
        <Row gutter={20} >
            <passInput.Provider value={ {UserInput, setUserInput} } >
                <Col span={24}>
                    <h2 style={{color : 'white'}} > Table Music </h2>
                    <Table
                        rowKey='id'
                        title = { () => <InputMusic refresh={refresh} album={Data.album} /> }
                        style={{backgroundColor : 'white', paddingRight: '10px'}}
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
    const { children, editing, record, ...restProps } = props;
    
    const { setUserInput } = useContext(passInput)

    const change = e => {
        let value = e.target.value
        setUserInput( all => ({ ...all, [restProps.dataIndex]: value }) )
    }

    return (
        <td {...restProps} >
            {editing ? <Input defaultValue={record[restProps.dataIndex]} onChange={change} /> : children}
        </td>
    )
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
        await music.UploadThumbnail(formData)
            .then( res => result = res )
            .catch( err => console.trace(err) );
        return result
    },
    Music : async file => {
        let formData = new FormData()
        formData.append('music', file)
        
        let result = ''
        await music.UploadMusic(formData)
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
                    task.DeleteFile({ ...data, table : 'file' });
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
                    console.log(data)
                    music.Delete(data).then( res => {
                        message.success('File deleted successfully');
                        resolve(res)
                    }).catch( res => reject(res) )
                }
            })
        })
    },
    DeleteFile : async (data) => {
        let m;
        await music.Delete(data).then( res => m = res ).catch( err => console.log(err) )
        return m
    }
}

export default AdminDashboard