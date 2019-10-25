import React from 'react'

import { Carousel, Icon } from 'antd'

const Banner = () => {

    let link = 'http://localhost:8080/banner/'

    return (
        <Carousel autoplay style={{height : "250px"}} >
            <div>
                <div className="image-container">
                    <img src={link + "Untitled-1.png"} alt="" />
                    <div className="overlay">
                        <Icon type="play-circle" className='button-foot' onClick={_ => alert("ASHIAP1")} style={{fontSize : "3rem"}} />
                    </div>
                </div>
            </div>
            <div>
                <div className="image-container">
                    <img src={link + "Banner-2.png"} alt="" />
                    <div className="overlay">
                        <Icon type="play-circle" className='button-foot' onClick={_ => alert("ASHIAP2")} style={{fontSize : "3rem"}} />
                    </div>
                </div>
            </div>
            <div>
                <div className="image-container">
                    <img src={link + "Untitled-1.png"} alt="" />
                    <div className="overlay">
                        <Icon type="play-circle" className='button-foot' onClick={_ => alert("ASHIAP3")} style={{fontSize : "3rem"}} />
                    </div>
                </div>
            </div>
        </Carousel>
    )
}

export default Banner