import React, { useContext } from 'react'

import { Icon } from 'antd'
import { GlobalState } from '../../Core'
import { files } from '../../services'

const CCard = (props) => {

    const { title, name, thumbnail, id } = props.data
    const { type = 'music', show } = props
    const { setPlaylist } = useContext(GlobalState)

    let playThis = data => {
        setPlaylist([data])
    }

    let style = {
        font : {color : '#f7f7f7', fontSize : '0.9rem', fontFamily : 'Poppins, sans-serif', textAlign : 'center', fontWeight : '500', overflow : 'hidden', textOverflow : 'ellipsis', whiteSpace : 'nowrap'}
    }

    if (type === 'music') return(
        <div className="image-container">
            <img alt="" src={files.thumbnail(thumbnail)} style={{width : '100%'}} />
            <h1 style={{ ...style.font }} >{title}</h1>
            <div className='overlay' >
                <Icon type="play-circle" className='button-foot' onClick={ _ => playThis(props.data) } style={{fontSize : "3rem"}} />
            </div>
        </div>)
    else if (type === 'album') return(
        <div className="image-container">
            <img alt="" src={files.thumbnail(thumbnail)} style={{width : '100%'}} />
            <h1 style={{ ...style.font }} >{name}</h1>
            <div className='overlay' >
                <Icon type="double-right" className='button-foot' onClick={ _ => show(id, name) } style={{fontSize : "3rem"}} />
            </div>
        </div>)
    else if (type === 'genre') return(
        <div className="image-container">
            <img alt="" src={files.thumbnail(name + '.png')} style={{width : '100%'}} />
            <h1 style={{ ...style.font }} >{name}</h1>
            <div className='overlay' >
                <Icon type="double-right" className='button-foot' onClick={ _ => show(id, name) } style={{fontSize : "3rem"}} />
            </div>
        </div>)
}

export default CCard