import React from 'react'

import { Carousel } from 'antd'

const Banner = () => {

    let StyleImg = { minWidth : '100%' }
    let Overlay = { position : 'absolute', fontFamily : "Poppins, sans-serif", color : '#101010' }
    let link = 'http://localhost:8080/banner/'

    return (
        <Carousel autoplay style={{height : "250px", backgroundColor : "#4A5FFF"}} >
            <div>
                <img src={link + "banner1.jpg"} style={{...StyleImg , marginTop : '440px'}} alt=""/>
                <p className='asal' style={{...Overlay , top : '160px', fontSize : "1.5rem"}} >Summer Days</p>
                <p className='asal' style={{...Overlay , top : '190px', fontSize : "1.3rem"}} >Martin Garrix</p>
            </div>
            <div> TITLE3 </div>
            <div> TITLE </div>
        </Carousel>
    )
}

export default Banner