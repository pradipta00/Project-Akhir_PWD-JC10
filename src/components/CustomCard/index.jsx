import React, { useContext } from 'react'

import { Icon } from 'antd'
import { GlobalState } from '../../Core'
import { files } from '../../services'

const CCard = (props) => {

    const { title, name, thumbnail, width } = props.data
    const { setPlaylist } = useContext(GlobalState)

    let playThis = data => {
        setPlaylist([data])
    }

    let showThis = data => {
        alert('mantul')
        console.log(data)
    }   

    return(
    <div className="image-container" style={{width}} >
        <img alt="" src={files.thumbnail(thumbnail)} style={{width : '100%'}} />
        <h1 style={{ color : '#f7f7f7', fontSize : '0.9rem', fontFamily : 'Poppins, sans-serif', textAlign : 'center',
        fontWeight : '500', overflow : 'hidden', textOverflow : 'ellipsis', whiteSpace : 'nowrap'}} >{title || name}</h1>
        <div className='overlay' >
            <Icon type="play-circle" className='button-foot' onClick={ _ => title ? playThis(props.data) : showThis(props.data) } style={{fontSize : "3rem"}} />
        </div>
    </div>)
}

export default CCard