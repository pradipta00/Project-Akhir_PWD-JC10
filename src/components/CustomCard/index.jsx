import React, { useContext } from 'react'

import { Icon } from 'antd'
import { GlobalState } from '../../Core'

const CCard = (props) => {

    const { title, thumbnail, width } = props.data
    const { setPlaylist } = useContext(GlobalState)

    let playThis = data => {
        setPlaylist([data])
    }

    return(
    <div className="image-container" style={{width}} >
        <img alt="" src={`http://localhost:8080/thumbnails/${thumbnail}`} style={{width : '100%'}} />
        <h1 style={{ color : '#f7f7f7', fontSize : '0.9rem', fontFamily : 'Poppins, sans-serif', fontWeight : '500' }} >{title}</h1>
        <div className='overlay' >
            <Icon type="play-circle" className='button-foot' onClick={ _ => playThis(props.data) } style={{fontSize : "3rem"}} />
        </div>
    </div>)
}

export default CCard